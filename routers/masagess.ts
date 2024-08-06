import { Router } from "express";
import { Props } from "./types";
import { promises as fs } from "fs";

const routerMessages = Router();
const path = "./messages";

routerMessages.get("/", async (req, res) => {
  res.send("Полученые сообщения");

  try {
    const files = await fs.readdir(path);

    const promises = files.map(async (file) => {
      const fileMessages = await fs.readFile(`${path}/${file}`);
      const data: string = fileMessages.toString();

      const oneMessage: Props = {
        message: JSON.parse(data),
        datetime: file,
      };

      return oneMessage;
    });

    const messages = await Promise.all(promises);
    const lastMessage = messages.slice(-5);
    res.send(lastMessage);
  } catch (e) {
    console.log(e);
  }
});

routerMessages.post("/add", async (req, res) => {
  res.send("Отправленые сообщения");

  const messageItem: Props = {
    message: req.body.message,
    datetime: new Date().toISOString().replace(/:/g, "_"),
  };
  const fileName = `${path}/${messageItem.datetime}.txt`;

  try {
    await fs.writeFile(fileName, JSON.stringify(messageItem.message));
    res.send(messageItem);
  } catch (e) {
    console.log(e);
  }
});

export default routerMessages;
