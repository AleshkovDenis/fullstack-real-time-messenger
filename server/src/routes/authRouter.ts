import { Router, Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";

const router = Router();

router.post("/login", (req, res) => {
  console.log("req", req.body);
  res.json(req.body);
});

router.post("/signup", async (req: Request, res: Response) => {
  console.log("req", req.body);

  const existingUser = await db.query(
    "SELECT username from users WHERE username = $1",
    [req.body.username]
  );
  if (existingUser.rowCount === 0) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await db.query(
      "INSERT INTO users(username, password) values($1, $2) RETURNING id, username",
      [req.body.username, hashedPassword]
    );

    // @ts-ignore
    req.session.user = { username: req.body.username, id: "test id" };
    res.json({ loggedIn: true, username: req.body.username, });
  } else {
    res.json({ loggedIn: false, status: "Username taken" });
  }
});

export default router;
