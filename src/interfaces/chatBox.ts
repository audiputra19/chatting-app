export interface chatBox {
    id: number;
    sender: string;
    lastMessage: string;
    unreadMessages: number;
    time: string;
    date: string;
    online: boolean;
    profile: string;
}