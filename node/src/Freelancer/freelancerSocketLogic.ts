import axios from "axios";

let connectedUsers: any[] = [];

const freelancerNameSpaceLogic = (freelancerNameSpace: any) => {
  freelancerNameSpace.on("connection", (socket: any) => {
    socket.on("newUserConnected", (data: any) => {
      const userExists = connectedUsers.some((user) => user._id === data._id);
      if (!userExists) {
        connectedUsers.push({ Name: data.Name, _id: data._id });
        freelancerNameSpace.emit("userConnected", connectedUsers);
        freelancerNameSpace.emit("userConnectedMobile", connectedUsers.length);
      } else {
        freelancerNameSpace.emit("userConnected", connectedUsers);
      }
    });
    socket.on("userDisconnected", (connectedUserId: any) => {
      connectedUsers = connectedUsers.filter(
        (user) => user._id !== connectedUserId
      );
      freelancerNameSpace.emit("userDisconnected", connectedUsers);
      freelancerNameSpace.emit("userDisconnectedMobile", connectedUsers.length);
    });
    socket.on("sendFreelancerNotification", (freelancerId: any) => {
      freelancerNameSpace.emit("NotificationRefresh", {
        freelancerId: freelancerId,
      });
    });
    socket.on("getConnectedFreelancers", () => {
      socket.emit("connectedFreelancersCount", connectedUsers.length);
    });
  });

  freelancerNameSpace.on("disconnect", (socket: any) => {});
};

export default freelancerNameSpaceLogic;
