// import 'reflect-metadata';
import "dotenv-safe/config";
// @ts-ignore
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
import { ApolloServer } from "@apollo/server";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import session from "express-session";
import Redis from "ioredis";
import morgan from "morgan";
import helmet from "helmet";
import http from "http";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, __prod__ } from "./constants";
import { dataSource } from "./dataSource";
import { UserResolver } from "./resolvers/user";
import { json } from "body-parser";
import { MyContext } from "./types";
import { Request, Response } from "express";
import passport from "passport";
import api from "./api";
import { errorHandler, notFound } from "./errorHandlers";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
require("./auth/passport");
require("./auth/passportGoogleSSO");
require("./auth/passportFacebookSSO");
// import passport from "passport";
// import { GraphQLLocalStrategy } from "graphql-passport";

const main = async () => {
  let retries = 10;
  while (retries) {
    try {
      await dataSource.initialize();
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise((res) => setTimeout(res, 20000));
    }
  }

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

  app.set("trust proxy", 1);
  app.use(morgan("dev"));
  app.use(helmet());
  console.log("using cors", process.env.CORS_ORIGIN);
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
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // must be 'none' to enable cross-site delivery
      },
      saveUninitialized: false,
      secret: "avneoanveoanveanveoanevoa",
      resave: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/", (_: Request, res: Response) => {
    res.send("Hello");
  });

  app.use("/api", api);

  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    // plugins: [
    //   ApolloServerPluginLandingPageGraphQLPlayground({
    //     settings: {
    //       "request.credentials": "include",
    //     },
    //   }),
    // ],
  });

  await apolloServer.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
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
  app.use(notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT;
  // app.listen(PORT, () => {
  //   console.log(`Server started at port ${PORT}`);
  // });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server ready at port ${PORT}`);
};

main().catch((err) => {
  console.log(err);
});
