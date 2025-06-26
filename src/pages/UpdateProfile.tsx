import { Plus } from "lucide-react";
import { useRef, useState, type FC } from "react";

const UpdateProfile: FC = () => {
    const [message, setMessage] = useState('');
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    }

    const handleClick = () => {
        fileRef.current?.click();
    }

    return (
        <>
            <div className="bg-[#1E1E1E] flex flex-col gap-7 p-5 h-screen">
                <div className="flex flex-col gap-5 mt-5">
                    <span className="text-2xl font-semibold text-center text-white">Profile Info</span>
                    <span className="text-gray-400 text-center">Please insert name and upload your profile picture (optional)</span>
                </div>
                <div className="flex justify-center items-center">
                    <div className="relative w-28 h-28">
                        <img
                            src={
                                preview ||
                                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                            }
                            alt="Avatar"
                            className="w-28 h-28 object-cover rounded-full border-2 border-gray-300"
                            />
                            <button
                                type="button"
                                onClick={handleClick}
                                className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 border-2 border-white shadow"
                            >
                                <Plus size={18} />
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileRef}
                                onChange={handleImageChange}
                            />
                    </div>
                </div>
                <div className="flex justify-center gap-3 mx-5">
                    <input 
                        type="text" 
                        placeholder="Type your name here" 
                        className="w-full py-2 border-b-2 border-white text-white outline-none focus:border-blue-500" 
                    />
                </div>
            </div>
            <div className="fixed bottom-0 w-full p-5">
                <button 
                    className="bg-blue-500 text-white font-semibold px-5 py-3 rounded-full w-full"
                >
                    Next
                </button>
            </div>
            {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        </>
    )
}

export default UpdateProfile;