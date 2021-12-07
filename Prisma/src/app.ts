import { PrismaClient } from "@prisma/client";
import express from "express";
import loginRoute from "./routes/login";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/check", (_, res) => {
  res.sendStatus(200);
});
app.use(loginRoute);

app.listen(4000, async () => {
  try {
    await prisma.$connect();
    console.log(`
    🚀 Server ready at: http://localhost:4000`);
  } catch (e) {
    console.log(e);
  }
});
