"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv-safe/config");
const server_1 = require("@apollo/server");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const type_graphql_1 = require("type-graphql");
const constants_1 = require("./constants");
const dataSource_1 = require("./dataSource");
const user_1 = require("./resolvers/user");
const body_parser_1 = require("body-parser");
const passport_1 = __importDefault(require("passport"));
const api_1 = __importDefault(require("./api"));
const errorHandlers_1 = require("./errorHandlers");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
require("./auth/passport");
require("./auth/passportGoogleSSO");
require("./auth/passportFacebookSSO");
const main = async () => {
    let retries = 10;
    while (retries) {
        try {
            await dataSource_1.dataSource.initialize();
            break;
        }
        catch (err) {
            console.log(err);
            retries -= 1;
            console.log(`retries left: ${retries}`);
            await new Promise((res) => setTimeout(res, 20000));
        }
    }
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    });
    app.set("trust proxy", 1);
    app.use((0, morgan_1.default)("dev"));
    app.use((0, helmet_1.default)());
    console.log("using cors", process.env.CORS_ORIGIN);
    app.use((0, cors_1.default)({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            secure: constants_1.__prod__,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        },
        saveUninitialized: false,
        secret: "avneoanveoanveanveoanevoa",
        resave: false,
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.get("/", (_, res) => {
        res.send("Hello");
    });
    app.use("/api", api_1.default);
    const httpServer = http_1.default.createServer(app);
    const apolloServer = new server_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [user_1.UserResolver],
            validate: false,
        }),
        plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    await apolloServer.start();
    app.use("/graphql", (0, cors_1.default)({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(apolloServer, {
        context: ({ req, res }) => ({
            req,
            res,
            redis,
        }),
    }));
    app.use(errorHandlers_1.notFound);
    app.use(errorHandlers_1.errorHandler);
    const PORT = process.env.PORT;
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at port ${PORT}`);
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map