import { Server } from "socket.io";

export const SocketServer = {
  name: "webSocketServer",
  configureServer(server) {
    const io = new Server(server.httpServer);

    let rooms = {};

    io.on("connection", (socket) => {
      socket.on("join-room", (room) => {
        socket.join(room);
        rooms[room] = rooms[room] ?? [];
      });
      socket.on("message-from-client", ({ room, name, message }) => {
        rooms[room].push({ sender: socket.id, name, message });
        io.to(room).emit("update-from-server", rooms[room]);
      });
    });
  },
};
