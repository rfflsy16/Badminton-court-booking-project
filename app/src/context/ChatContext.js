import { createContext, useState, useContext } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [unreadCount, setUnreadCount] = useState(0);
    const [chatData, setChatData] = useState([
        {
            id: '1',
            name: 'GOR Senayan Admin',
            lastMessage: 'Your booking for Court 1 is confirmed',
            time: '10:30 AM',
            unread: 2,
            avatar: 'https://images.unsplash.com/photo-1624224971170-2f84fed5eb5e?q=80&w=2048&auto=format&fit=crop'
        },
        {
            id: '2',
            name: 'Sport Center 88',
            lastMessage: 'Thank you for your payment',
            time: 'Yesterday',
            unread: 0,
            avatar: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: '3',
            name: 'Gelora Arena Support',
            lastMessage: 'How can we help you today?',
            time: 'Yesterday',
            unread: 1,
            avatar: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop'
        },
    ]);

    const updateUnreadCount = () => {
        const total = chatData.reduce((sum, chat) => sum + chat.unread, 0);
        setUnreadCount(total);
    };

    const markAsRead = (chatId) => {
        setChatData(prevData => 
            prevData.map(chat => 
                chat.id === chatId ? { ...chat, unread: 0 } : chat
            )
        );
        updateUnreadCount();
    };

    return (
        <ChatContext.Provider value={{ 
            chatData, 
            unreadCount, 
            updateUnreadCount,
            markAsRead
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);