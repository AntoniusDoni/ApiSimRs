const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();
const socketIo = require('socket.io')
const http = require('http')
const jwt = require("jsonwebtoken");
var corsOptions = {
  origin: "http://localhost:3030"
};

app.use(cors(corsOptions));
const server = http.createServer(app)
const io = socketIo(server,{ 
  cors: {
    origin: "http://localhost:3030"
  }
})
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('./uploads'));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Sistem Informasi RS application." });
});
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/masterdata.routes')(app);
require('./routes/transaction.router')(app);

// set port, listen for requests
app.set('io', io);
const port = Number(process.env.PORT || 3331);
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}.`);
// });
server.listen(port, err=> {
  if(err) console.log(err)
  console.log('Server running on Port ', port)
})
// io.on('connection',(socket)=>{
//   // console.log('new client connected');
//     socket.emit('connection', null);
// })
io.use((socket, next) => {
  if (socket.handshake?.query?.token) {
    jwt.verify(socket.handshake?.query?.token,  process.env.SECRET_JWT, (err, decoded) => {
      if (err) {
        return next(new Error('Authentication error'));
      }
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
})
.on('connection', (socket) => {
  console.log("conect")
  // socket.on('message', (message) => {
  //   io.emit('message', message);
  // });
  
  socket.on("disconnect", () => {
		console.log("disconnected");
	});
});