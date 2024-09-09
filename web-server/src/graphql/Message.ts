// If Message had any complex fields, we'd put them on this object.

export interface MessageInput {
    content: string;
    author: string;
}

class Message {
    id: string;
    content: string;
    author: string;

    constructor(id: string, { content, author }: { content: string, author: string }) {
        this.id = id
        this.content = content
        this.author = author
    }
}

export default Message;