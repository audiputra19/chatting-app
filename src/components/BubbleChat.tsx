import clsx from "clsx";
import type { FC } from "react"
import { Check, CheckCheck } from "lucide-react";
import moment from "moment";

interface Props {
    message: string;
    isSender: boolean;
    status: string;
    dateTime: string;
}

const BubbleChat: FC<Props> = ({ message, isSender, status, dateTime }) => {
    const time = moment(dateTime).format("HH:mm");

    const renderStatus = () => {
        if(isSender){
            if (status === 'sent') {
                return <Check size={16} />
            } else if (status === 'delivered') {
                return <CheckCheck size={16} />
            } else if (status === 'read') {
                return <CheckCheck size={16} className="text-blue-800" />
            }
        }

        return null
    }

    return (
        <div className={clsx("flex mb-3", isSender ? "justify-end" : "justify-start")}>
            <div className={clsx(
                    "flex gap-3 max-w-[280px] px-4 py-2 rounded-lg text-sm relative",
                    isSender ? "bg-blue-500 text-white" : "bg-[#2F2F2F] text-white"
                )}>
                <div className="flex items-end gap-1">
                    <span className="break-all whitespace-pre-wrap">{message}</span>
                    {time && (
                        <span className={`flex items-center gap-1 text-xs pl-3 ${isSender ? 'text-white/50' : 'text-gray-500'}`}>
                        {time} {renderStatus()}
                        </span>
                    )}
                </div>                    
            </div>
        </div>
    )
}

export default BubbleChat