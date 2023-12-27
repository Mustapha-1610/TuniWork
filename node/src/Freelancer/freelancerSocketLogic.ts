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
<<<<<<< Updated upstream
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
=======
    });


    //
    socket.on('joinRoom', (room: string) => {
      socket.join(room);
    });

    socket.on('chatMessage', ({ room, message }: { room: string; message: string }) => {
      freelancerNameSpace.to(room).emit('message', message);
    });
    //
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
>>>>>>> Stashed changes
};

export default freelancerNameSpaceLogic;
