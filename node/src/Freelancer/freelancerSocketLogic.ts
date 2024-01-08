import axios from "axios";

let connectedUsers: any[] = [];

const freelancerNameSpaceLogic = (freelancerNameSpace: any) => {
  freelancerNameSpace.on("connection", (socket: any) => {
    socket.on("newUserConnected", (data: any) => {
      console.log("connected ");
      console.log(data);
      const userExists = connectedUsers.some((user) => user._id === data._id);
      if (!userExists) {
        console.log(data);
        console.log(connectedUsers + "WHY ARE YOU NOT WORKING");
        connectedUsers.push({ Name: data.Name, _id: data._id });
        freelancerNameSpace.emit("userConnected", connectedUsers);
      } else {
        freelancerNameSpace.emit("userConnected", connectedUsers);
      }
    });
    socket.on("userDisconnected", (connectedUserId: any) => {
      console.log("disconnected");
      connectedUsers = connectedUsers.filter(
        (user) => user._id !== connectedUserId
      );
      freelancerNameSpace.emit("userDisconnected", connectedUsers);
    });
    socket.on("sendFreelancerNotification", (freelancerId: any) => {
      console.log(freelancerId);
      freelancerNameSpace.emit("NotificationRefresh", {
        freelancerId: freelancerId,
      });
    });
  });

  freelancerNameSpace.on("disconnect", (socket: any) => {});
};

export default freelancerNameSpaceLogic;
