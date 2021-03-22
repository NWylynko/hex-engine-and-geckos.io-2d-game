import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  Physics,
  useDraw,
} from "@hex-engine/2d";
import Draggable from "./Draggable";
import Controls from "./Controls"

export default function Box(position: Vector) {
  useType(Box);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(new Vector(75, 75)),
      position: position.clone(),
    })
  );

  // useNewComponent(() => Physics.Body(geometry));
  // useNewComponent(() => Draggable(geometry));
  useNewComponent(() => Controls(geometry));

  useDraw((context) => {
    context.fillStyle = "red";
    geometry.shape.draw(context, "fill");
  });
}
