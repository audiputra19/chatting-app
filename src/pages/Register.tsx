import axios from "axios";
import { useEffect, useRef, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/Loading";

const Register: FC = () => {
    const navigate = useNavigate();
    const ref = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        ref.current?.focus();
    }, [ref]);

    const handleRegister = async () => {
        const phone = ref.current?.value || '';

        try {
            setIsLoading(true);    

            const res = await axios.post('http://localhost:3001/register', { phone });
            console.log(res.data.exists)
            if(res.data.exists) {
                localStorage.setItem("token", phone);
                return navigate('/main');
            }

            localStorage.setItem("phone", phone);
            setMessage("Phone number successfully registered");
            navigate('/update-profile');
        } catch (error) {
            setMessage("Phone failed to register");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading && <LoadingSpinner />}
            <div className="bg-[#1E1E1E] flex flex-col gap-7 p-5 h-screen">
                <div className="flex flex-col gap-5 mt-5">
                    <span className="text-2xl font-semibold text-center text-white">Add your phone number</span>
                    <span className="text-gray-400 text-center">We need to verify your phone number to help protect your account and ensure a safe chatting experience.</span>
                </div>
                <div className="flex justify-center gap-3">
                    <input 
                        type="text" 
                        placeholder="Country code" 
                        className="w-[50px] py-2 border-b-2 border-blue-300 text-white outline-none"
                        value="+ 62"
                        readOnly
                    />
                    <input 
                        type="text" 
                        placeholder="Phone number"
                        ref={ref} 
                        className="py-2 border-b-2 border-white text-white outline-none focus:border-blue-500" 
                    />
                </div>
            </div>
            <div className="fixed bottom-0 w-full p-5">
                <button 
                    className="bg-blue-500 text-white font-semibold px-5 py-3 rounded-full w-full"
                    onClick={handleRegister}
                >
                    Next
                </button>
            </div>
            {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        </>
    )
}

export default Register;