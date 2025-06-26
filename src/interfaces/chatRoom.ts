export interface chatRoom {
    id: number;
    id_room: number;
    id_sender: number;
    message: string;
    time: string;
    date: string;
    type: string;
    status: string;
    replyTo: number;
}