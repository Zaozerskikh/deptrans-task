import maplibregl, {GeoJSONSource} from "maplibre-gl";
import React from "react";
import {MapPoint} from "../../types/MapPoint";
import {MapLine} from "../../types/MapLine";
import {MapObjectType} from "../../types/MapObjectType";
import {LinesMapState} from "../../redux/map/LinesReducer";
import {PointsMapState} from "../../redux/map/PointsReducer";
import mapPointIcon from './../icons/map/MapPointIcon.svg'

const POINTS_BINDING_ID = 'points'
const LINES_BINDING_ID = 'lines'

export const initMap = async (
  mapRef: React.RefObject<null | maplibregl.Map>,
  mapLinesState: LinesMapState,
  mapPointsState: PointsMapState
) => {
  if (!mapRef.current) {
    return
  }

  // point img
  mapRef.current?.addImage('point-marker', await createImageBitmapFromSource(mapPointIcon));

  // points
  mapRef?.current.addSource(POINTS_BINDING_ID, {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': []
    }
  });

  mapRef.current.addLayer({
    'id': POINTS_BINDING_ID,
    'type': 'symbol',
    'source': POINTS_BINDING_ID,
    'layout': {
      'icon-image': 'point-marker',
      'text-offset': [0, 1.25],
      'text-anchor': 'top'
    }
  });


  // lines
  mapRef.current.addSource(LINES_BINDING_ID, {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': []
    }
  });

  mapRef.current.addLayer({
    'id': LINES_BINDING_ID,
    'type': 'line',
    'source': LINES_BINDING_ID,
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': 'red',
      'line-width': 8
    }
  });


  // info popups
  mapRef.current.on('click', POINTS_BINDING_ID, e => attachPopup(e, mapRef));
  mapRef.current.on('mouseenter', POINTS_BINDING_ID, () => changePopupCursor(mapRef));
  mapRef.current.on('mouseleave', POINTS_BINDING_ID, () => resetPopupCursor(mapRef));

  mapRef.current.on('click', LINES_BINDING_ID, e => attachPopup(e, mapRef));
  mapRef.current.on('mouseenter', LINES_BINDING_ID, () => changePopupCursor(mapRef));
  mapRef.current.on('mouseleave', LINES_BINDING_ID, () => resetPopupCursor(mapRef));

  // init map state
  updateUILines(mapLinesState.lines, mapRef)
  updateUIPoints(mapPointsState.points, mapRef)
  changeLayerVisibility(MapObjectType.POINT, mapPointsState.pointsVisible, mapRef)
  changeLayerVisibility(MapObjectType.LINE, mapLinesState.linesVisible, mapRef)
}

export const updateUIPoints = (points: MapPoint[], mapRef: React.RefObject<null | maplibregl.Map>) => {
  if (mapRef.current !== null && points) {
    (mapRef?.current?.getSource(POINTS_BINDING_ID) as GeoJSONSource)
      .setData({
        type: 'FeatureCollection',
        features: points.map(p => (
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [p.coordinates.lng, p.coordinates.lat]
            },
            properties: {
              date: formatDate(p.creationTimestamp),
              objectType: 'Точка'
            }
          }
        ))
      })
  }
}

export const updateUILines = (lines: MapLine[], mapRef: React.RefObject<null | maplibregl.Map>) => {
  if (mapRef.current !== null && lines) {
    (mapRef?.current?.getSource(LINES_BINDING_ID) as GeoJSONSource)
      .setData({
        type: 'FeatureCollection',
        features: lines.map(l => (
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [l.start.lng, l.start.lat],
                [l.end.lng, l.end.lat]
              ]
            },
            properties: {
              date: formatDate(l.creationTimestamp),
              objectType: 'Линия'
            }
          }
        ))
      })
  }
}

export const changeLayerVisibility = (
  objectType: MapObjectType,
  isVisible: boolean,
  mapRef: React.RefObject<null | maplibregl.Map>
) => {
  if (mapRef.current) {
    mapRef?.current
      ?.getStyle()?.layers
      ?.filter(l => l?.id?.includes(objectType === MapObjectType.POINT ? POINTS_BINDING_ID : LINES_BINDING_ID))
      ?.forEach(l => mapRef?.current?.setLayoutProperty(l.id, 'visibility', isVisible ? 'visible' : 'none'))
  }
}

const createImageBitmapFromSource = async (source: string): Promise<ImageBitmap> => {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = source;
  });

  return createImageBitmap(img);
};

const formatDate = (timestamp: number) => new Date(timestamp)
  .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
  .split('/')
  .join('.')

const attachPopup = (
  e: maplibregl.MapMouseEvent & {features?: maplibregl.MapGeoJSONFeature[] | undefined} & unknown,
  mapRef: React.RefObject<null | maplibregl.Map>
) => {
  if (!mapRef.current) {
    return
  }

  new maplibregl.Popup({offset: 25})
    .setHTML(`
        <div class="popup-internal-content">
          <div class="popup-header">Тип: ${e?.features?.[0]?.properties?.objectType}</div>
          <div class="popup-text">Дата создания: ${e?.features?.[0]?.properties?.date}</div>
        </div>
      `)
    .setLngLat([e.lngLat.lng, e.lngLat.lat])
    .addTo(mapRef.current)
}

const changePopupCursor = (mapRef: React.RefObject<null | maplibregl.Map>) => {
  if (!mapRef.current) {
    return
  }

  mapRef.current.getCanvas().style.cursor = 'pointer';
}

const resetPopupCursor = (mapRef: React.RefObject<null | maplibregl.Map>) => {
  if (!mapRef.current) {
    return
  }

  mapRef.current.getCanvas().style.cursor = '';
}
