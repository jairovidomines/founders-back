import "./loadEnvironment.js";
import connectDatabase from "./database/connectDatabase.js";
import startServer from "./server/startServer.js";

const mongoUrl = process.env.MONGODB_CONNECTION_URL!;
const port = process.env.PORT ?? 4001;

await connectDatabase(mongoUrl);
await startServer(+port);
