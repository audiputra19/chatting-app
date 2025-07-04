import type { FC } from "react";
import type { AllContact } from "../interfaces/contact";
import { useNavigate } from "react-router-dom";

interface Props {
    contact: AllContact[];
}

const ContactList: FC<Props> = ({ contact }) => {
    const navigate = useNavigate();
    
    const contactList = contact.map((item) => {

        return (
            <div 
                className="px-5 py-3 flex items-center gap-5"
                key={item.phone}
                onClick={() => navigate("/chat", { state: item.phone })}
            >
                <img 
                    src={item.profile_image}
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
        <div>{contactList}</div>
    )
}

export default ContactList