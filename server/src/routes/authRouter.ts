import { Router, Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const data = await db.query(
    "SELECT id, username, password FROM users u WHERE u.username = $1",
    [username, password]
  );
  if (data.rowCount > 0) {
    const isSamePassword = await bcrypt.compare(
      password,
      data.rows[0].password
    );

    if (isSamePassword) {
      // @ts-ignore
      req.session.user = { username: req.body.username, id: "test id" };
      res.json({ loggedIn: true, username: req.body.username });
    } else {
      res.json({ loggedIn: false, status: "Wrong username or password" });
    }
  } else {
    res.json({ loggedIn: false, status: "Wrong username or password" });
  }
});

router.post("/signup", async (req: Request, res: Response) => {
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
    res.json({ loggedIn: true, username: req.body.username });
  } else {
    res.json({ loggedIn: false, status: "Username taken" });
  }
});

export default router;
