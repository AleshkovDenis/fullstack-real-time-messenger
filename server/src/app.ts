import express, { Express, Request, Response } from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import session from "express-session";
import * as dotenv from 'dotenv'

import { authRouter } from "./routes";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    // @ts-ignore
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production",
      httpOnly: true,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);
app.use("/auth", authRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is server");
});

const port = 3000;

server.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
