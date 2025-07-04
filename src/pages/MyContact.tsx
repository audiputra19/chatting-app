import axios from "axios";
import { ArrowLeft, Search, UserPlus, Users } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import type { AllContact } from "../interfaces/contact";
import ContactList from "../components/ContactList";

const MyContact: FC = () => {
    const navigate = useNavigate();
    const [contact, setContact] = useState<AllContact[]>([]);
    //const [loading, setLoading] = useState(true);
    const userPhone = localStorage.getItem('token');

    useEffect(() => {
        axios
            .post<AllContact[]>('http://localhost:3001/all-contacts', {userPhone})
            .then((res) => {
                setContact(res.data);
                //console.log(res.data);
                //setLoading(false);
            })
            .catch(() => {
                //setLoading(false);
            });
    }, []);

    return (
        <>
            { /* mobile screen start */}

            <div className="sm:hidden">
                <div className="bg-[#1E1E1E] text-white min-h-screen">
                    <div className="bg-[#161616] px-5 h-[70px] flex justify-between items-center shadow shadow-[#121212] sticky top-0">
                        <div className="flex items-center gap-5">
                            <ArrowLeft 
                                size={24}
                                onClick={() => navigate("/main")} 
                            />
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">Select Contact</span>
                                <span className="text-sm">{contact.length} Contacts</span>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Search size={24} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <div 
                                className="px-5 py-3 flex items-center gap-5"
                                onClick={() => navigate("/new-contact")}
                            >
                                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <span className="text-lg">New Group</span>
                                </div>
                            </div>
                            <div 
                                className="px-5 py-3 flex items-center gap-5"
                                onClick={() => navigate("/new-contact")}
                            >
                                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
                                    <UserPlus size={20} />
                                </div>
                                <div>
                                    <span className="text-lg">New Contact</span>
                                </div>
                            </div>
                        </div>
                        <div className="my-3">
                            <span className="text-sm px-5 text-gray-400 font-semibold">Contacts on Chatting App</span>
                        </div>
                        <div>
                            <ContactList contact={contact} />
                        </div>
                    </div>
                </div>
            </div>

            { /* mobile screen end */}
        </>
    )
}

export default MyContact