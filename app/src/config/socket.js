import { io } from "socket.io-client";
// console.log(process.env.EXPO_PUBLIC_BASE_URL, "<<<< ENV")
const socket = io(process.env.EXPO_PUBLIC_BASE_URL);

export default socket