import {MapBaseObject} from "./MapBaseObject";
import {MapCoordinates} from "./MapCoordinates";

export interface MapLine extends MapBaseObject {
  start: MapCoordinates;
  end: MapCoordinates;
}
