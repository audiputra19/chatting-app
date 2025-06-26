import { ArrowLeft, MessageSquareText, Mic, SendHorizonal, Smile, Sticker } from "lucide-react";
import { useEffect, useRef, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dbChatbox } from "../config/db-chatbox";
import type { chatBox } from "../interfaces/chatBox";
import BubbleChat from "../components/BubbleChat";
import { dbChatMessage, dbChatRoom } from "../config/db-chatroom";
import type { chatRoom } from "../interfaces/chatRoom";
import moment from "moment";

const ChatRoom: FC = () => {
    const { roomid } = useParams();
    const currentUserId = 72646;
    const navigate = useNavigate();
    const ref = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState('');

    const receiverId = getReceiverId(Number(roomid), currentUserId);
    const dataReceiver: chatBox | undefined = dbChatbox.find(data => data.id === receiverId);

    if (!dataReceiver) {
        return (
          <div className="text-center mt-10 text-red-500">
            Chat not found
          </div>
        );
    }

    useEffect(() => {
        ref.current?.focus();
    }, [ref]);

    const handleSendMessage = () => {
        if (message.trim() !== ''){
            setMessage('');
        }
    }

    function getReceiverId(roomId: number, currentUserId: number) {
        const room = dbChatRoom.find(r => r.id === roomId);
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

    const chatFilterbyId = dbChatMessage.filter(chat => chat.id_room === Number(roomid));
    const groupByDate = chatFilterbyId.reduce((acc: Record<string, chatRoom[]>, chat) => {
        if (!acc[chat.date]) acc[chat.date] = [];

        acc[chat.date].push(chat);
        return acc;
    }, {});

    const chatData = Object.entries(groupByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, chats]) => {
        const sortedChats = [...chats].sort((a, b) => a.time.localeCompare(b.time));

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
                            isSender={chat.id_sender === Number(currentUserId)}
                            status={chat.status}
                            time={chat.time}
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
                            src={dataReceiver.profile}
                            alt={dataReceiver.sender}
                            className="w-9 h-9 object-cover rounded-full"
                        />
                        <div className="flex flex-col">
                            <span className="font-semibold">{dataReceiver.sender}</span>
                            {dataReceiver.online && (
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
                                    value={message}
                                    ref={ref}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                            </div>
                            <div 
                                className="bg-blue-500 w-12 h-12 flex justify-center items-center rounded-full"
                                onClick={handleSendMessage}
                            >
                            {
                                message.trim() === ''
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