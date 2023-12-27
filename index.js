require("dotenv");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const user = Object();

io.on('connection', (socket) => {
    // socket.broadcast.emit("hi");
    console.log('a user connected');
    socket.on("chat message", (msg) => {
        io.emit("chat message",msg);
    });
    socket.on("mouseUpdate", (msg) => {
        // console.log(msg);
        user[msg[0]] = [msg[1],msg[2]];
        io.emit("mouseUpdate",user);
    });
    socket.on("unload",(seed)=>{
        console.log("unloading user "+seed);
        user[seed] = undefined;
    })
    socket.on('disconnect', () => {
        // user[seed] = null;
        console.log('user disconnected');
    });
})

server.listen(process.env.PORT||5000, () => {
    console.log("listening on port 5000");
});
