import axios from "axios";
import { ArrowLeft, Search, UserPlus, Users} from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import type { Contact } from "../interfaces/contact";

const MyContact: FC = () => {
    const navigate = useNavigate();
    const [contact, setContact] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get<Contact[]>('http://localhost:3001/all-contacts')
            .then((res) => {
                setContact(res.data);
                console.log(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const contactList = contact.map((item) => {
        return (
            <div 
                className="px-5 py-3 flex items-center gap-5"
                key={item.id}
                onClick={() => navigate(`/chat/${item.id}`)}
            >
                <img 
                    src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    alt={item.firstName}
                    className="w-12 h-12 object-cover rounded-full"
                />
                <div className="flex flex-col">
                    <span className="text-lg">{item.firstName} {item.lastName}</span>
                    <span className="text-base text-gray-400">Message yourself</span>
                </div>
            </div>
        )
    });

    return (
        <>
            { /* mobile screen start */}

            <div className="sm:hidden">
                <div className="bg-[#1E1E1E] text-white min-h-screen">
                    <div className="bg-[#161616] px-5 h-[70px] flex justify-between items-center shadow shadow-[#121212] sticky top-0">
                        <div className="flex items-center gap-5">
                            <ArrowLeft 
                                size={24}
                                onClick={() => navigate(-1)} 
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
                            {contactList}
                        </div>
                    </div>
                </div>
            </div>

            { /* mobile screen end */}
        </>
    )
}

export default MyContact