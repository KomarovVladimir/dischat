export interface MessageData {
    id: string;
    username: string;
    text: string;
    created?: string;
    lastUpdated?: string;
}

export interface PostMessageRequest {
    roomId: string;
    text: string;
    postingDate: Date;
}
