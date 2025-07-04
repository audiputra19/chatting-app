export interface chatBox {
    id: string;
    sender: string;
    lastMessage: string;
    unreadMessages: number;
    dateTime: string;
    name: string;
    profile_image: string | undefined;
}