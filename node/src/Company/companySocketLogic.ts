// Assuming freelancerNameSpace is the instance of Socket.IO namespace for freelancers
import { freelancerNameSpace } from "../server";

import axios from "axios";

let connectedUsers: any[] = [];

const companyNameSpaceLogic = (bidderNameSpace: any) => {
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

    //send a notification to freelancer about private job offer
    socket.on("createPrivateJob", async (privateJobData: any) => {
      try {
        freelancerNameSpace.emit("privateJobOfferNotification", {
          freelancerId: privateJobData.freelancerId,
        });
        console.log("Private job offer notification emitted to freelancer");
      } catch (error) {
        console.error("Error creating private job offer", error);
      }
    });
  });

  bidderNameSpace.on("disconnect", (socket: any) => {});
};

export default companyNameSpaceLogic;
