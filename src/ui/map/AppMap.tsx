import maplibregl from "maplibre-gl";
import React, {useEffect, useRef} from "react";
import './AppMap.css'
import {useDispatch, useSelector} from "react-redux";
import {RootStoreState} from "../../redux/ReduxStore";
import {changeLayerVisibility, initMap, updateUILines, updateUIPoints} from "./MapActions";
import {MapObjectType} from "../../types/MapObjectType";
import {addPoint} from "../../redux/map/PointsReducer";

const AppMap: React.FC = () => {
  const mapPointsState = useSelector((state: RootStoreState) => state.points)
  const mapLinesState = useSelector((state: RootStoreState) => state.lines)

  const mapContainer = useRef<null | HTMLDivElement>(null);
  const mapRef = useRef<null | maplibregl.Map>(null);
  const dispatch = useDispatch()

  // points
  useEffect(() => {
    changeLayerVisibility(MapObjectType.POINT, mapPointsState.pointsVisible, mapRef)
  }, [mapPointsState.pointsVisible]);

  useEffect(() => {
    updateUIPoints(mapPointsState.points, mapRef)
  }, [mapPointsState.points]);


  // lines
  useEffect(() => {
    changeLayerVisibility(MapObjectType.LINE, mapLinesState.linesVisible, mapRef)
  }, [mapLinesState.linesVisible]);

  useEffect(() => {
    updateUILines(mapLinesState.lines, mapRef)
  }, [mapLinesState.lines]);


  // init
  useEffect(() => {
    if (mapRef.current || !mapContainer.current) {
      return
    }

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://demotiles.maplibre.org/style.json`,
      center: [0, 0],
      zoom: 4
    });

    mapRef?.current?.on('load', () => {
      initMap(mapRef, mapLinesState, mapPointsState)
        .then(() => console.log('map initialized'))
        .catch(err => console.error((err as Error)?.message))
    })

    mapRef.current.on('dblclick', e => {
      e.preventDefault()
      dispatch(addPoint({
        coordinates: {
          lng: e.lngLat.lng,
          lat: e.lngLat.lat
        },
        creationTimestamp: new Date().getTime()
      }))
    });

  }, [mapPointsState, mapLinesState, dispatch]);

  return (
    <div ref={mapContainer} className="app-map" />
  );
}

export default AppMap
