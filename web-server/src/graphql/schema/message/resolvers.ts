import Message, { MessageInput } from "../../Message";

let fakeDatabase: { [key: string]: { author: string, content: string } } = {};

export const messageResolvers = {
  Query: {
    getMessage: (_: any, { id }: { id: string }) => {
      if (!fakeDatabase[id]) {
        throw new Error("no message exists with id " + id);
      }
      return new Message(id, fakeDatabase[id]);
    },
    getAllMessages: () => {
      return Object.keys(fakeDatabase).map(key => new Message(key, fakeDatabase[key]));
    },
  },
  Mutation: {
    createMessage: ({input}: { input: MessageInput }
      , _:any) => {
      const id = `msg_${Date.now()}`;
      const newMessage = new Message(id, input);
      console.log(newMessage);
      fakeDatabase[id] = input;
      return newMessage;
   
    },
    updateMessage: ( { id, input }: { id: string, input: MessageInput }, _:any) => {
      if (!fakeDatabase[id]) {
        throw new Error("no message exists with id " + id);
      }
      fakeDatabase[id] = input;
      return new Message(id, input);
    },
  },
};