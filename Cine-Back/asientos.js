import express from "express";
import { db } from "./db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [asientos] = await db.execute("select * from asientos");
  res.send({ asientos
  });
});

export default router;
