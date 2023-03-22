// import 'reflect-metadata';
import 'dotenv-safe/config';
// @ts-ignore
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { ApolloServer } from '@apollo/server';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import session from 'express-session';
import Redis from 'ioredis';
import { buildSchema } from 'type-graphql';
import { COOKIE_NAME, __prod__ } from './constants';
import { dataSource } from './dataSource';
import { UserResolver } from './resolvers/user';
import { json } from 'body-parser';
import { MyContext } from './types';
import { Request, Response } from 'express';

const main = async () => {
  await dataSource.initialize();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis({
    // host: process.env.REDIS_URL,
    // port: 12967,
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  });

  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
        httpOnly: true,
        secure: __prod__, //cookie only works in https
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
      },
      saveUninitialized: false,
      secret: 'avneoanveoanveanveoanevoa',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  // @ts-ignore

  await apolloServer.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: process.env.CORS_ORIGIN,
    }),
    json(),
    //@ts-ignore
    expressMiddleware(apolloServer, {
      context: ({ req, res }): MyContext => ({
        req,
        res,
        redis,
      }),
    })
  );

  app.get('/', (_: Request, res: Response) => {
    res.send('Hello');
  });

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
};

main().catch((err) => {
  console.log(err);
});
