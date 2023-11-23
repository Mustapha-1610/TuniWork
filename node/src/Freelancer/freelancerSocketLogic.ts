import axios from "axios";

let connectedUsers: any[] = [];

const freelancerNameSpaceLogic = (bidderNameSpace: any) => {
  bidderNameSpace.on("connection", (socket: any) => {
    socket.on("newUserConnected", (data: any) => {
      const userExists = connectedUsers.some((user) => user._id === data._id);
      if (!userExists) {
        console.log(data);
        console.log(connectedUsers);
        connectedUsers.push({ Name: data.Name, _id: data._id });
        bidderNameSpace.emit("userConnected", connectedUsers);
      }
    });
    socket.on("userDisconnected", (connectedUserId: any) => {
      console.log("disconnected");
      connectedUsers = connectedUsers.filter(
        (user) => user._id !== connectedUserId
      );
      bidderNameSpace.emit("userDisconnected", connectedUsers);
    });
  });

  bidderNameSpace.on("disconnect", (socket: any) => {});
};

export default freelancerNameSpaceLogic;
