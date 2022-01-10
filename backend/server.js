const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3001;

const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000"], //essential for cookie
    methods: ["GET", "POST"], //essential for cookie
    credentials: true,
  },
});

var users = {
  yash: "yash@123",
  suraj: "suraj@123",
  kiran: "kiran@123",
};

var sockets = {
  yash: "",
  suraj: "",
  kiran: "",
};

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"], //essential for cookie
    methods: ["GET", "POST"], //essential for cookie
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); //optional

app.use(
  session({
    key: "loginCookie", //give name to cookie in terms of key value pair where value holds data to be sent with cookie
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

io.on("connection", (socket) => {
  socket.on("updateSocket", (sender) => {
    console.log(sender);
    sockets[sender] = socket.id;
    console.log(sockets);
  });

  socket.on("sendMsg", (data) => {
    console.log(data);
    io.to(sockets[data.userName]).emit("getMsg", data);
  });
});

app.get("/updateUser", (req, res) => {
  res.send(req.session.email);
});

app.post("/login", (req, res) => {
  if (users[req.body.email] == req.body.password)
    req.session.email = req.body.email;
  //console.log(req.session);
  res.send("Done");
});

app.get("/isLogin", (req, res) => {
  var loggedData = {
    loggedStatus: false,
    loggedUser: "",
  };
  if (req.session.email) {
    loggedData = {
      loggedStatus: true,
      loggedUser: req.session.email,
    };
  }
  console.log(loggedData);
  res.send(loggedData);
});

app.get("/logout", (req, res) => {
  res.clearCookie("loginCookie");
  res.send("logout");
});

http.listen(3001);
// app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
