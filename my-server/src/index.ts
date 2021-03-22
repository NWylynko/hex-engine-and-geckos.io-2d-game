import "source-map-support/register";

import geckos, { Data, GeckosServer } from "@geckos.io/server";
import http from "http";
import express from "express";

const port = 8000
const app = express();

const server = http.createServer(app);
const io: GeckosServer = geckos();

const playerLocation = [0, 0]

app.get("/", (req, res) => {
  res.send("hey from game server");
});

io.addServer(server);

io.onConnection((channel) => {
  console.log(`${channel.id} connected ${Date.now()}`);

  const messageChannel = "playerLocation";

  io.emit(messageChannel, playerLocation);

  channel.on(messageChannel, (data: Data) => {

    if (typeof data === 'string') {
      
      const offSet: number[] = JSON.parse(data) || [0, 0];

      console.log(offSet)

      console.log(`got ${offSet} from ${messageChannel} in ${channel.roomId}`);

      playerLocation[0] += offSet[0];
      playerLocation[1] += offSet[1];

      console.log(playerLocation)

      io.emit(messageChannel, JSON.stringify(playerLocation));

    }

    
  });

  channel.onDisconnect(() => {
    console.log(`${channel.id} disconnected`);
  });
});

server.listen(port, async () => {
  console.log(`listening on port ${port}`);
});

const exitHandler = async (event: NodeJS.Signals) => {

  server.close();
  
  process.exit(0);
};

process.on("SIGINT", exitHandler);
process.on("SIGTERM", exitHandler);
process.on("SIGUSR2", exitHandler);