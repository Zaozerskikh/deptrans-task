import {MapBaseObject} from "./MapBaseObject";
import {MapCoordinates} from "./MapCoordinates";

export interface MapPoint extends MapBaseObject {
  coordinates: MapCoordinates
}
