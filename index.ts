import express from "express";
import routerMessages from "./routers/masagess";

const app = express();
const port = 8080;

app.use(express.json());
app.use("/messages", routerMessages)

const run = async () => {
  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

void run();
