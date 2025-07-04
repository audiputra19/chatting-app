export interface Chat {
    id: string;
    id_room: string;
    id_sender: string;
    message: string;
    dateTime: string;
    type: string;
    status: string;
    replyTo: string | null;
    created_at: string;
}

export interface chatRoom {
    id: string;
    user: string;
    user2: string;
    created_at: string;
}