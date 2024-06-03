import expressLoader from "../src/loaders/express";
import webSocketLoader from "../src/loaders/webSocket";

async function server() {
  const http = expressLoader();
  webSocketLoader(http);
}

server();
