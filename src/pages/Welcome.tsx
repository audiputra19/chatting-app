import type { FC } from "react";
import { useNavigate } from "react-router-dom";

const Welcome: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#1E1E1E] flex flex-col gap-7 p-5 items-center justify-center h-screen">
            <div>
                <img 
                    src="https://freepngimg.com/save/159741-pic-speech-chat-icon-png-free-photo/715x657"
                    alt="Welcome"
                    className="w-[250px] h-full object-cover"
                />
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
                <span className="text-2xl font-semibold text-center text-white">Welcome to Chatting App</span>
                <span className="text-gray-400 text-center">Connect with friends and loved ones, and start meaningful conversations instantly</span>
            </div>
            <div className="w-full">
                <button 
                    className="bg-blue-500 text-white font-semibold px-5 py-3 rounded-full w-full"
                    onClick={() => navigate("/register")}
                >
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default Welcome;