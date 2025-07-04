import { MessageSquarePlus, MessageSquareText } from "lucide-react"
import type { FC } from "react"
import { useNavigate } from "react-router-dom"
import Chats from "../components/Chats"

const Main: FC = () => {
    const navigate = useNavigate();

    return (
        <>
            { /* mobile screen start */}

            <div className="sm:hidden">
                <div className="bg-[#1E1E1E] text-white min-h-screen">
                    <div className="bg-[#161616] px-5 h-[70px] flex items-center gap-2 shadow shadow-[#121212] sticky top-0">
                        <MessageSquareText size={32} />
                        <span className="text-xl font-semibold">Chatting App</span>
                    </div>
                    <div>
                        <Chats />
                    </div>
                </div>
                <button 
                    className="bg-blue-500 text-white fixed bottom-5 right-5 w-16 h-16 rounded-lg flex items-center justify-center"
                    onClick={() => navigate("/my-contact")}
                >
                    <MessageSquarePlus size={32} />
                </button>
            </div>

            { /* mobile screen end */}
        </>
    )
}

export default Main