import type { chatRoom } from "../interfaces/chatRoom";

export const dbChatRoom = [
    {
        id: 1,
        user: 72646,
        user2: 1,
        create_at: "2025-06-01"
    }
]

export const dbChatMessage : chatRoom[] = [
    {
        id: 1,
        id_room: 1,
        id_sender: 1,
        message: "Hi?",
        time: "03:42",
        date: "2025-06-20",
        type: "text",
        status: "seen",
        replyTo: 0
    },
    {
        id: 2,
        id_room: 1,
        id_sender: 72646,
        message: "Hello",
        time: "04:10",
        date: "2025-06-20",
        type: "text",
        status: "seen",
        replyTo: 0
    },
    {
        id: 3,
        id_room: 1,
        id_sender: 1,
        message: "How are you?",
        time: "04:12",
        date: "2025-06-20",
        type: "text",
        status: "seen",
        replyTo: 0
    },
    {
        id: 4,
        id_room: 1,
        id_sender: 72646,
        message: "I'm fine",
        time: "04:30",
        date: "2025-06-20",
        type: "text",
        status: "delivered",
        replyTo: 0
    },
    {
        id: 5,
        id_room: 1,
        id_sender: 72646,
        message: "What about alisa?",
        time: "05:30",
        date: "2025-06-20",
        type: "text",
        status: "sent",
        replyTo: 0
    },
    {
        id: 6,
        id_room: 1,
        id_sender: 72646,
        message: "What about you? asdjhjaklsjdnkajsbdkajsbdkasdmn asmnd asd nkahdkjasdj",
        time: "06:10",
        date: "2025-06-01",
        type: "text",
        status: "seen",
        replyTo: 0
    },
    {
        id: 7,
        id_room: 1,
        id_sender: 1,
        message: "I'm also fine",
        time: "06:50",
        date: "2025-06-01",
        type: "text",
        status: "seen",
        replyTo: 0
    },
]