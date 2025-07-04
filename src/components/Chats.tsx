import { useEffect, useState, type FC } from "react";
import { dbChatbox } from "../config/db-chatbox";
import type { chatBox } from "../interfaces/chatBox";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { dbChatRoom } from "../config/db-chatroom";
import axios from "axios";
import socket from "../socket/socket";
import type { Users } from "../interfaces/users";

const Chats: FC = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('token');
    const [chatData, setChatData] = useState<chatBox[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    useEffect(() => {
        axios
            .post('http://localhost:3001/chat-box', {user})
            .then(res => {
                setChatData(res.data);
            })
            .catch(err => console.log(err));
    }, [user]);

    useEffect(() => {
        socket.emit("join", user);

        socket.on("onlineUsers", (userId: string) => {
            setOnlineUsers(prev => prev.includes(userId) ? prev : [...prev, userId]);
        });

        socket.on("offlineUsers", (userId: string) => {
            setOnlineUsers(prev => prev.filter(id => id !== userId));
        });

        return () => {
            socket.off("onlineUsers");
            socket.off("offlineUsers");
        };
    }, [user]);
    
    const chatBox = chatData.map((chat) => {
        
        function chatDate(chatDate: string) {
            const date = moment(chatDate);
            const now = moment();

            if(date.isSame(now, "day")) {
                return moment(chat.dateTime).format("HH:mm");
            } else if (date.isSame(now.clone().subtract(1, "day"), "day")){
                return "Yesterday";
            } else {
                return date.format("D/MM/YY");
            }
        }

        const handleClickChat = (targetUserId: string) => {
            navigate('/chat', {state: targetUserId});
        }

        return (
            <div 
                className="px-5 py-4 border border-b-2 border-[#2F2F2F] flex gap-3"
                key={chat.id}
                onClick={() => handleClickChat(chat.sender)}
            >
                <div className="flex gap-4 w-full">
                    <img 
                        src={chat.profile_image}
                        alt={chat.sender}
                        className="w-10 h-10 object-cover rounded-full"
                    />
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center gap-3">
                            <span className="font-semibold flex items-center gap-3">
                                {chat.name}
                                {onlineUsers.includes(chat.sender) && <div className="w-2 h-2 text-sm bg-green-500 rounded-full flex items-center justify-center"></div>}
                            </span>
                            <span className="text-xs text-gray-400 font-semibold">{chatDate(chat.dateTime)}</span>
                        </div>
                        <div className="flex justify-between items-center w-full">  
                            <span className="truncate text-gray-400 text-base overflow-hidden max-w-[230px] w-full">{chat.lastMessage}</span>
                            {chat.unreadMessages !== 0 && (
                                <div className="ml-4 min-w-[24px] h-6 flex justify-center items-center bg-blue-500 text-white text-sm rounded-full px-2">
                                {chat.unreadMessages}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="pb-26">
            {chatBox}
        </div>
    )
}

export default Chats