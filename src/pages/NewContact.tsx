import axios from "axios";
import { ArrowLeft, Phone, User } from "lucide-react";
import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";

const NewContact: FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({firstName: '', lastName: '', phone: ''});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSaveContact = async () => {
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:3001/add-contacts', form);
            setMessage(`Contact successfully added: ${res.data.id}`);
            setForm({firstName: '', lastName: '', phone: ''});
        } catch (error) {
            setLoading(false);
            setMessage('Failed to add contact');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            { /* mobile screen start */}

            <div className="sm:hidden">
                <div className="bg-[#1E1E1E] text-white min-h-screen">
                    <div className="bg-[#161616] px-5 h-[70px] flex items-center gap-5 shadow shadow-[#121212] sticky top-0">
                        <ArrowLeft 
                            size={24}
                            onClick={() => navigate(-1)} 
                        />
                        <span className="text-xl font-semibold">New Contact</span>
                    </div>
                    {loading ? (
                        <div className="text-white text-center mt-10">Loading...</div>
                    ) : (

                        <div className="p-5 flex flex-col gap-6">
                            <div className="flex items-center gap-5">
                                <div className="w-[25px] h-[25px]">
                                    <User />
                                </div>
                                <div className="flex-1">  
                                    <input 
                                        type="text" 
                                        className="bg-[#2F2F2F] p-4 rounded-md w-full focus:outline-blue-500 focus:outline-2" 
                                        placeholder="First Name" 
                                        onChange={(e) => 
                                            setForm(prev => ({
                                                ...prev,
                                                firstName: e.target.value
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-[25px] h-[25px]"></div>
                                <div className="flex-1">  
                                    <input 
                                        type="text" 
                                        className="bg-[#2F2F2F] p-4 rounded-md w-full focus:outline-blue-500 focus:outline-2" 
                                        placeholder="Last Name" 
                                        onChange={(e) => 
                                            setForm(prev => ({
                                                ...prev,
                                                lastName: e.target.value
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-[25px] h-[25px]">
                                    <Phone />
                                </div>
                                <div className="flex-1">  
                                    <input 
                                        type="text" 
                                        className="bg-[#2F2F2F] p-4 rounded-md w-full focus:outline-blue-500 focus:outline-2" 
                                        placeholder="Phone"
                                        onChange={(e) => 
                                            setForm(prev => ({
                                                ...prev,
                                                phone: e.target.value
                                            }))
                                        } 
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="px-7 py-5 fixed bottom-0 w-full">
                        <button 
                            className="bg-blue-500 text-white p-3 rounded-full w-full"
                            onClick={handleSaveContact}
                        >
                            Save
                        </button>
                    </div>
                    {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
                </div>
            </div>

            { /* mobile screen end */}
        </>
    )
}

export default NewContact;