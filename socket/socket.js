const socketio = require('socket.io');

let io;

const initSocket = (app, server) => {
    io = socketio(server, {
        cors: {
          origin: "*",  // Allow connections from any origin (adjust as needed)
          methods: ["GET", "POST"]
        }
      });
    console.log("socket initialized");

    app.io = io;

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('referralUpdate', (data) => {
            io.emit('referralUpdate', data);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = { initSocket };
