import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  // Physics,
  Vector,
} from "@hex-engine/2d";
import Floor from "./Floor";
import Box from "./Box";

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "lightblue" }));
  canvas.fullscreen({ pixelZoom: 1 });

  // useNewComponent(Physics.Engine);

  const canvasCenter = new Vector(
    canvas.element.width / 2,
    canvas.element.height / 2
  );

  useChild(() => Floor(canvasCenter.addY(100), new Vector(500, 50)));
  useChild(() => Floor(canvasCenter.addX(100).addY(-100), new Vector(300, 30)));
  useChild(() => Box(canvasCenter));

}
