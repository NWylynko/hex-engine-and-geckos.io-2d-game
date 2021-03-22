import {
  useType,
  Geometry,
  Keyboard,
  Vector
} from "@hex-engine/2d";
import { updateLocation, connection, messageChannel } from "./Server"

export default function Controls(geometry: ReturnType<typeof Geometry>) {
  useType(Controls);

  const { vectorFromKeys } = Keyboard({ preventDefault: true })

  setInterval(() => {

    const offSet = vectorFromKeys('w', 's', 'a', 'd').multiply(2)

    updateLocation([offSet.x, offSet.y])

  }, 10)

  // onLocationUpdate((newLocation: Vector) => {

  //   console.log('newLocation', newLocation)

  //   geometry.position = newLocation;

  // })

  connection.on(messageChannel, (data) => {
    if (typeof data === 'string') {
      const location: number[] = JSON.parse(data)
      geometry.position = new Vector(location[0], location[1]);
    }
    
  });

  // setTimeout(() => {
  //   sendMessage()
  // }, 1000)

}
