import type { FC } from "react";
import { dbChatbox } from "../config/db-chatbox";
import type { chatBox } from "../interfaces/chatBox";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { dbChatRoom } from "../config/db-chatroom";

const Chats: FC = () => {
    const navigate = useNavigate();
    
    const chatBox = dbChatbox.map((chat: chatBox) => {
        
        function chatDate(chatDate: string) {
            const date = moment(chatDate);
            const now = moment();

            if(date.isSame(now, "day")) {
                return chat.time;
            } else if (date.isSame(now.clone().subtract(1, "day"), "day")){
                return "Yesterday";
            } else {
                return date.format("D/MM/YY");
            }
        }

        const getRoomId = (currentUserId: number, targetUserId: number) => {
            const room = dbChatRoom.find(
                room => 
                (room.user === currentUserId && room.user2 === targetUserId) || 
                (room.user === targetUserId && room.user2 === currentUserId)
            )

            return room?.id
        }

        const handleClickChat = (targetUserId: number) => {
            const roomId = getRoomId(72646, targetUserId);
            if(roomId){
                navigate(`/chat/${chat.id}`);
            } else {
                alert("Room not found")
            }
        }

        return (
            <div 
                className="px-5 py-4 border border-b-2 border-[#2F2F2F] flex gap-3"
                key={chat.id}
                onClick={() => handleClickChat(chat.id)}
            >
                <div className="flex gap-4 w-full">
                    <img 
                        src={chat.profile}
                        alt={chat.sender}
                        className="w-10 h-10 object-cover rounded-full"
                    />
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center gap-3">
                            <span className="font-semibold flex items-center gap-3">
                                {chat.sender}
                                {chat.online && <div className="w-2 h-2 text-sm bg-green-500 rounded-full flex items-center justify-center"></div>}
                            </span>
                            <span className="text-xs text-gray-400 font-semibold">{chatDate(chat.date)}</span>
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