import WebSocket from "ws";

export default (server: any) => {
  const socket = new WebSocket.Server({ server });
  let participants = 0
  
  socket.on("connection", (ws, req) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    ws.send(++participants);
    console.log("입장", ip);

    ws.on("message", (res) => {
      const resChat = JSON.parse(res.toString());
      console.log(resChat);
      ws.send(res.toString());
    });

    ws.on("close", () => {
      participants--;
      console.log('퇴장', ip);
    }); 
  });
};
