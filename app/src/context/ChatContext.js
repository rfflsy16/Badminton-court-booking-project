import { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState({});
    const [currentRoom, setCurrentRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState("");
    const base_url = "https://ed9b-27-50-29-117.ngrok-free.app";

    useEffect(() => {
        async function getToken() {
            const token = await SecureStore.getItemAsync('userToken');
            console.log('Retrieved token exists?:', !!token);
            setUserToken(token);
        }
        getToken();
    }, []);

    useEffect(() => {
        if (userToken) {
            console.log('Connecting socket with token...');
            const newSocket = io(base_url, {
                auth: {
                    token: userToken
                }
            });

            newSocket.on('connect', () => {
                console.log('Socket connected!');
            });

            newSocket.on('error', (error) => {
                console.error('Socket error:', error);
            });

            setSocket(newSocket);

            return () => newSocket.close();
        }
    }, [userToken]);

    const loadRooms = async () => {
        try {
            if (!userToken) {
                console.log('No user token available for loading rooms');
                return;
            }

            console.log('Fetching rooms with token:', userToken.substring(0, 10) + '...');
            const response = await axios.get(`${base_url}/room`, {
                headers: { Authorization: `Bearer ${userToken}` }
            });

            console.log('Server response:', JSON.stringify(response.data, null, 2));

            if (!Array.isArray(response.data)) {
                console.error('Expected array of rooms but got:', typeof response.data);
                setChats([]);
                return;
            }

            // Fetch last message for each room
            const roomsWithMessages = await Promise.all(response.data.map(async room => {
                try {
                    if (!room._id) {
                        console.error('Room missing _id:', room);
                        return null;
                    }

                    console.log(`Fetching messages for room ${room._id}`);
                    const messagesResponse = await axios.get(
                        `${base_url}/message/${room._id}?page=1&limit=1`,
                        { headers: { Authorization: `Bearer ${userToken}` } }
                    );

                    const lastMessage = messagesResponse.data.messages[0];
                    console.log(`Last message for room ${room._id}:`, lastMessage);

                    return {
                        _id: room._id,
                        name: `Court ${room.courtDetails.buildingDetails[0].name}`,
                        lastMessage: lastMessage ? lastMessage.text : 'No messages yet',
                        lastMessageTime: lastMessage ? lastMessage.createdAt : room.updatedAt,
                        unreadCount: 0,
                        courtId: room.courtId,
                        courtDetails: room.courtDetails,
                        participants: room.participants
                    };
                } catch (error) {
                    console.error(`Error fetching messages for room ${room._id}:`, error);
                    return {
                        _id: room._id,
                        name: room.name || `Court ${room.courtId}`,
                        lastMessage: 'No messages yet',
                        lastMessageTime: room.updatedAt,
                        unreadCount: 0,
                        courtId: room.courtId,
                        courtDetails: room.courtDetails,
                        participants: room.participants
                    };
                }
            }));

            const validRooms = roomsWithMessages.filter(Boolean);
            console.log('Final formatted rooms with messages:', JSON.stringify(validRooms, null, 2));
            setChats(validRooms);
        } catch (error) {
            console.error('Error loading rooms:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
            setChats([]);
        } finally {
            setLoading(false);
        }
    };

    const loadMessages = async (roomId) => {
        try {
            console.log('Loading messages for room:', roomId);
            const response = await axios.get(`${base_url}/message/${roomId}`, {
                headers: { Authorization: `Bearer ${userToken}` }
            });

            console.log('Messages response:', response.data);

            if (response.data && response.data.messages) {
                setMessages(prev => ({
                    ...prev,
                    [roomId]: response.data.messages
                }));
            }
        } catch (error) {
            console.error('Error loading messages:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
        }
    };

    const sendMessage = async (roomId, text) => {
        try {
            console.log('Sending message to room:', roomId);
            const response = await axios.post(
                `${base_url}/message/${roomId}`,
                { text },
                { headers: { Authorization: `Bearer ${userToken}` } }
            );

            console.log('Send message response:', response.data);

            if (response.data) {
                // Update messages immediately
                setMessages(prev => ({
                    ...prev,
                    [roomId]: [...(prev[roomId] || []), response.data]
                }));

                // Emit socket event
                if (socket) {
                    socket.emit('new_message', {
                        roomId,
                        message: response.data
                    });
                }
            }

            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
            throw error;
        }
    };

    const joinRoom = (roomId) => {
        if (socket) {
            console.log('Joining room:', roomId);
            socket.emit('join_room', roomId);
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on('message', (newMessage) => {
                console.log('Received new message:', newMessage);
                setMessages(prev => ({
                    ...prev,
                    [newMessage.roomId]: [...(prev[newMessage.roomId] || []), newMessage]
                }));
            });

            return () => {
                socket.off('message');
            };
        }
    }, [socket]);

    const value = {
        chats,
        messages,
        loading,
        loadRooms,
        loadMessages,
        sendMessage,
        joinRoom,
        currentRoom
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
