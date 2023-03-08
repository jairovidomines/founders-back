import "../loadEnvironment.js";
import createDebug from "debug";
import { app } from "./app.js";

const debug = createDebug("founders:server:startServer");

const startServer = async (port: number) =>
  new Promise((resolve) => {
    const server = app.listen(port, () => {
      resolve(server);
      debug(`Server listening on port http://localhost:${port}`);
    });
  });

export default startServer;
