const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const dbConfig = require("./setup/dbConfig");

app.use(express.json());
app.use(cors());

// initializing PORT number
const PORT = process.env.PORT || 9000;

// Database Connection
dbConfig();

io.on("connection", (socket) => {
  console.log("socket is active to be connected");

  socket.on("joinMetrice", (data) => {
    socket.join(data);
    console.log("joined from server");
  });

  socket.on("sendCpuUsage", (data) => {
    socket.to(data.metriceId).emit("receiveCpuUsage", data);
    console.log(data);
  });
});

// routes
const authRoute = require("./src/api/v1/routes/auth");
const userRoute = require("./src/api/v1/routes/user");
const projectRoute = require("./src/api/v1/routes/project");

// Routes
app.use("/api/v1/", authRoute);
app.use("/api/v1/", projectRoute);
app.use("/api/v1/", userRoute);

app.get("/", (req, res) => {
  res.json({ msg: "get is running" });
});

// Listening on PORT
server.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
