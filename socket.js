const socketIo = require('socket.io');
const userModel = require('./models/UserModels');
const captainModel = require('./models/CaptainModels');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);


        socket.on('join', async (data) => {
            try{
                const {userId,userType} = data;

                if (!userId || !userType) {
                    console.log('Missing userId or userType in join event');
                    return socket.emit('error', { message: 'userId and userType are required.' });
                }

                if(userType === 'user'){
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }else if(userType === 'captcha'){
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });

                }else{
                    console.log(' Invalid userType provided');
                    return socket.emit('error', { message: 'Invalid userType.' });
                }

                console.log(`🟢 User joined: ${userId} as ${userType}`);

            }catch(error){
                console.error('Error in join event:', error.message);
                socket.emit('error', { message: 'Failed to join. Please try again.' });

            }
            // const { userId, userType } = data;

            // if (userType === 'user') {
            //     await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            // } else if (userType === 'captain') {
            //     await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            // }
        });


        socket.on('update-location-captain', async (data) => {

            try{
                const {userId, location} = data;

                if (!userId || !location || !location.ltd || !location.lng) {
                    console.log('Invalid location data received');
                    return socket.emit('error', { message: 'Invalid location data' });
                }

                await captainModel.findByIdAndUpdate(userId,{
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });

                console.log(`🟢 Location updated for userId: ${userId}`);

            }catch(error){
                console.error('Error in update-location-captain event:', error.message);
                socket.emit('error', { message: 'Failed to update location.' });

            }
        //     const { userId, location } = data;

        //     if (!location || !location.ltd || !location.lng) {
        //         return socket.emit('error', { message: 'Invalid location data' });
        //     }

        //     await captainModel.findByIdAndUpdate(userId, {
        //         location: {
        //             ltd: location.ltd,
        //             lng: location.lng
        //         }
        //     });
        });

        socket.on('disconnect', async () => {
            try{
                console.log(`Client disconnected: ${socket.id}`);

                await userModel.updateOne({socketId:socket.id}, { $set: { socketId: null } } );
                await captainModel.updateOne({socketId:socket.id},{ $set: { socketId: null } } );

                console.log(`🟢 SocketId cleared for disconnected user: ${socket.id}`);

            }catch(err){

                console.error(' Error in disconnect event:', error.message);
            }
           
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {

// console.log(messageObject);

//     if (io) {
//         io.to(socketId).emit(messageObject.event, messageObject.data);
//     } else {
//         console.log('Socket.io not initialized.');
//     }

if (!io) {
    console.log(' Socket.io not initialized.');
    return;
}

if (!socketId || !messageObject) {
    console.log(' socketId or messageObject is missing.');
    return;
}

try {
    console.log(`📨 Sending message to socketId: ${socketId}`);
    io.to(socketId).emit(messageObject.event, messageObject.data);
} catch (error) {
    console.error(' Error sending message to socketId:', error.message);
}
}

module.exports = { initializeSocket, sendMessageToSocketId };