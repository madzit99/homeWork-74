import { Router } from "express";
const routerMessages = Router();

routerMessages.get("/messages", async (req, res) => {
  res.send("Полученые сообщения");
});

routerMessages.post("/messgess/:id", async (req, res) => {
  res.send("Отправленые сообщения");
});

routerMessages.post("/");

export default routerMessages;