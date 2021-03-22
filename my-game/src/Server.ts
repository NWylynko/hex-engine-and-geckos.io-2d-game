import geckos, { ClientChannel, Data } from "@geckos.io/client";
import { Vector } from "@hex-engine/2d";

export const connection = geckos({ url: "http://192.168.0.109", port: 8000 });

export const messageChannel = "playerLocation";

export const sendMessage = () =>
  connection.emit(messageChannel, `hello from the server`);

export const updateLocation = (offSet: number[]) => {

  connection.emit(messageChannel, JSON.stringify(offSet))

};

// export const onLocationUpdate = (cb) =>
//   connection.on(messageChannel, (data) => {
//     if (typeof data === 'string') {
//       const location: number[] = JSON.parse(data)
//       cb(new Vector(location[0], location[1]));
//     }
    
//   });

connection.onConnect((error) => {
  console.log(`connected`, connection.userData); // { username: 'Yannick', level: 13, points: 8987 }
});

connection.on(messageChannel, (data) => {
  // console.log(`got ${data} from ${messageChannel} in ${connection.id}`);
});

connection.onDisconnect(() => {
  console.log(`${connection.id} disconnected`);
});
