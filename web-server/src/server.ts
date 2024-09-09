import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import serve_config from './config/serve_config';
import rootRouter from './routers/rootRouter';
import logger from './config/logger';
import { join, dirname } from 'path';
import addLogger from './utils/addLogger';
import { createHandler } from 'graphql-http/lib/use/express';
import { randomDieDef } from './graphql/schema/dice/typeDef';
import { messageTypeDefs } from './graphql/schema/message/typeDef';
import dieResolvers from './graphql/schema/dice/resolvers';
import { messageResolvers } from './graphql/schema/message/resolvers';
import testResolvers from './graphql/schema/test/resolvers';
import testDef from './graphql/schema/test/typeDef';
var { graphql, buildSchema } = require("graphql")

const app = express();
app.use(cookieParser())

app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: false
    }));
//app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { port, host } = serve_config;
const filePath = __filename;
const dirPath = __dirname;

app.use(addLogger());

// Construct a schema, using GraphQL schema language
const rootTypeDef = `
    type Query 
    type Mutation     
    `

// The root provides a resolver function for each API endpoint


const typeDefs = `
    ${rootTypeDef}
    ${randomDieDef}
    ${messageTypeDefs}
    ${testDef}
    `
const resolvers = {
    ...messageResolvers.Query,
    ...dieResolvers.Query,
    ...testResolvers.Query,
    ...messageResolvers.Mutation,
};

const schema = buildSchema(typeDefs);

try {app.all('/graphql', createHandler({ 
        schema, 
        rootValue: resolvers, 
        context: req => ({ ip: req.raw.ip }) 
    }))
    //app.use('/', rootRouter(join(dirname(filePath), '../public')));
} catch (err) {
    logger.error(err);
    process.exit(1);
}

app.listen(port, host, () => {
    const message = `Server running at http://${host}:${port}/`.toString();
    return logger.info(message);
});


