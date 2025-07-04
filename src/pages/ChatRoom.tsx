import axios from "axios";
import { ArrowLeft, Mic, SendHorizonal, Smile } from "lucide-react";
import moment from "moment";
import { useEffect, useRef, useState, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BubbleChat from "../components/BubbleChat";
import { dbChatbox } from "../config/db-chatbox";
import type { Chat, chatRoom } from "../interfaces/chatRoom";
import type { Users } from "../interfaces/users";
import socket from "../socket/socket";

const ChatRoom: FC = () => {
    const location = useLocation();
    const { state } = location;
    const user = localStorage.getItem('token');
    const user2 = state;
    const [userData, setUserData] = useState<Users>();
    const navigate = useNavigate();
    const ref = useRef<HTMLInputElement>(null);
    const [messages, setMessages] = useState<Chat[]>([]);
    const [roomChat, setRoomChat] = useState<chatRoom[]>([]);
    const [input, setInput] = useState('');
    const [currentRoomId, setCurrentRoomId] = useState<string>('');
    const receiverId = currentRoomId ? getReceiverId(currentRoomId, user) : null;
    const dataReceiver = dbChatbox.find(data => String(data.id) === receiverId);

    //console.log(userData);

    useEffect(() => {
        ref.current?.focus();
    }, [ref]);

    useEffect(() => {
        axios
            .post<chatRoom>('http://localhost:3001/chat-room', { user, user2 })
            .then(res => {
                if (res.data && res.data.id) {
                    setCurrentRoomId(res.data.id);
                }
            })
    },[user, user2]);

    useEffect(() => {
        if (currentRoomId && user) {
            socket.emit("readMessage", { roomId: currentRoomId, user });
        }
    }, [currentRoomId, user]);
    
    useEffect(() => {
        axios
            .post<Chat[]>('http://localhost:3001/chat-message', { roomId: currentRoomId })
            .then(res => {
                setMessages(res.data);
            })
            .catch(err => console.log(err));
    },[currentRoomId]);

    useEffect(() => {
        axios
            .post<Users>('http://localhost:3001/users', { user, user2 })
            .then(res => {
                setUserData(res.data);
            })
            .catch(err => console.log(err));
    }, [user, user2]);

    useEffect(() => {
        socket.on("chatRoomCreated", (data: chatRoom) => {
            setRoomChat((prev) => [...prev, data]);

            if (data.user === user || data.user2 === user) {
                setCurrentRoomId(data.id);
            }
        });

        socket.on("newMessage", (data: Chat) => {
            setMessages((prev) => [...prev, data]);
        });

        socket.on("messageDelivered", (data: Chat) => {
            setMessages((prev) =>
                prev.map(msg =>
                    msg.id === data.id ? { ...msg, status: "delivered" } : msg
                )
            );
        });

        socket.on("messageRead", (data: Chat) => {
            setMessages((prev) => 
                prev.map(msg => 
                    msg.id === data.id ? { ...msg, status: "read" } : msg
                )
            );
        });

        return () => {
            socket.off("chatRoomCreated");
            socket.off("newMessage");
            socket.off("messageDelivered");
            socket.off("messageRead");
        };
    }, [setRoomChat, setMessages]);


    const handleSendMessage = () => {
        if (input.trim() === '') return;
        
        socket.emit("sendMessage", {
            user,
            user2,
            message: input,
        });

        setInput('');
    }

    function getReceiverId(roomId: string, currentUserId: string | null) {
        const room = roomChat.find(r => r.id === roomId);
        if (!room) return null;
      
        return room.user === currentUserId ? room.user2 : room.user;
    }

    function chatDate(chatDate: string) {
        const date = moment(chatDate);
        const now = moment();

        if(date.isSame(now, "day")) {
            return "Today";
        } else if (date.isSame(now.clone().subtract(1, "day"), "day")){
            return "Yesterday";
        } else if (now.diff(date, "day") < 7) {
            return date.format("dddd");
        } else {
            return date.format("D MMMM, YYYY");
        }
    }

    const chatFilterbyId = messages.filter(chat => chat.id_room === currentRoomId);
    const groupByDate = chatFilterbyId.reduce((acc: Record<string, Chat[]>, chat) => {
        const date = moment(chat.dateTime).format("YYYY-MM-DD");
        if (!acc[date]) acc[date] = [];

        acc[date].push(chat);
        return acc;
    }, {});

    const chatData = Object.entries(groupByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, chats]) => {
        const sortedChats = [...chats].sort((a, b) => a.dateTime.localeCompare(b.dateTime));
        return (
            <div key={date}>
                <div className="flex justify-center items-center">
                    <div className="text-xs text-gray-400 bg-[#2B2B2B] py-2 px-3 mb-3 rounded-xl">{chatDate(date)}</div>
                </div>
                {sortedChats.map(chat => {
                    
                    return (
                        <BubbleChat 
                            key={chat.id}
                            message={chat.message}
                            isSender={chat.id_sender === user}
                            status={chat.status}
                            dateTime={chat.dateTime}
                        />
                    )
                })}
            </div>
        )
    });

    return (
        <>
            { /* mobile screen start */}

            <div className="sm:hidden">
                <div className="bg-[#1E1E1E] text-white min-h-screen">
                    <div className="bg-[#161616] px-5 h-[70px] flex items-center gap-2 shadow shadow-[#121212] sticky top-0">
                        <ArrowLeft 
                            size={24}
                            onClick={() => navigate(-1)} 
                        />
                        <img 
                            src={userData?.profile_image}
                            alt={userData?.phone}
                            className="w-9 h-9 object-cover rounded-full"
                        />
                        <div className="flex flex-col">
                            <span className="font-semibold">{userData?.name}</span>
                            {dataReceiver?.online && (
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 text-sm bg-green-500 rounded-full flex items-center justify-center"></div>
                                    <span className="text-xs">Online</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-5">
                        {chatData}
                    </div>
                    <div className="p-3 fixed bottom-0 w-full">
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <Smile 
                                    size={24}
                                    className="absolute top-3 left-3" 
                                />
                                <input 
                                    type="text" 
                                    className="bg-[#2F2F2F] pl-12 pr-3 py-2 h-12 rounded-full w-full outline-none"
                                    placeholder="Message"
                                    value={input}
                                    ref={ref}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if(e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                />
                            </div>
                            <div 
                                className="bg-blue-500 w-12 h-12 flex justify-center items-center rounded-full"
                                onClick={handleSendMessage}
                            >
                            {
                                input.trim() === ''
                                ? <Mic size={22} /> 
                                : <SendHorizonal size={22} />
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            { /* mobile screen end */}
        </>
    )
}

export default ChatRoom