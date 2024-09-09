import { buildSchema } from 'graphql';

export const messageTypeDefs = `
  type Message {
    id: String!
    content: String
    author: String
  }

  input MessageInput {
    content: String
    author: String
  }

  extend type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }

  extend type Query {
    getMessage(id: ID!): Message
    getAllMessages: [Message]
  }
`;