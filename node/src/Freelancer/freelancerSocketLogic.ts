import axios from "axios";
let connectedUsers: any[] = [];
const freelancerNameSpaceLogic = (bidderNameSpace: any) => {
  bidderNameSpace.on("connection", (socket: any) => {
    socket.on("newUserConnected", (data: any) => {
      console.log(data);
      if (!connectedUsers.includes({ _id: data._id })) {
        connectedUsers.push({ Name: data.Name, _id: data._id });
        socket.broadcast.emit("userConnected", connectedUsers);
      }
      socket.on("userDisconnected", (connectedUserId: any) => {
        console.log("disconnected");
        connectedUsers = connectedUsers.filter(
          (user) => user._id !== connectedUserId
        );
        socket.broadcast.emit("userDisconnected", connectedUsers);
      });
    });
  });
  bidderNameSpace.on("disconnect", (connectedUserId: any, socket: any) => {});
};

export default freelancerNameSpaceLogic;
