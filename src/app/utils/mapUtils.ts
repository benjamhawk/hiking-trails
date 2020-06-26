import Map from 'ol/Map';
import View from 'ol/View';
import { Vector as VectorLayer } from 'ol/layer'
import { Style, Icon } from 'ol/style'
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { defaults } from 'ol/control'
import { Vector as VectorSource } from 'ol/source'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'

const getBaseMap = (center: number[], canZoom: boolean) => new Map({
  target: 'map',
  view: new View({
    center: olProj.fromLonLat(center),
    zoom: 10
  }),
  controls: defaults({
    attribution: false,
    rotate: false,
    zoom: canZoom
  })
})

const baseOSMLayer = new TileLayer({
  source: new OSM()
})


const getMarker = (location: number[]) => new Feature({
  geometry: new Point(
    olProj.fromLonLat(location)
  )
})

const hikerIconStyle = new Style({
    image: new Icon({
      src: '../../../assets/icon/hiker.svg'
    })
  })

const getMarkerVectorLayer = (location: number[]) => new VectorLayer({
  source: new VectorSource({
    features: [getMarker(location)]
  }),
  style: hikerIconStyle
})

export const getListPageMap = (coords: number[]) => {
  const map = getBaseMap(coords, false)
  map.addLayer(baseOSMLayer)
  map.addLayer(getMarkerVectorLayer(coords))
  return map
}

export const updateCenter = (coords: number[], map: Map) => {
  map.getView().setCenter(olProj.fromLonLat(coords))
  const layer = map.getLayers().getArray()[1] as any
  layer.getSource().clear()
  layer.getSource().addFeatures([ getMarker(coords)])
  return map
}