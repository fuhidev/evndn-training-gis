require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Basemap",
  "esri/layers/WebTileLayer",
  "esri/geometry/Point",
  "esri/Graphic",
  "esri/symbols/SimpleMarkerSymbol",
], function (
  Map,
  MapView,
  Basemap,
  WebTileLayer,
  Point,
  Graphic,
  SimpleMarkerSymbol
) {
  const map = new Map({
    basemap: new Basemap({
      baseLayers: [
        new WebTileLayer({
          urlTemplate: "http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        }),
      ],
    }),
  });

  const view = new MapView({
    map: map,
    container: "viewDiv",
    center: [108.221472, 16.07031],
    scale: 50000,
  });

  const graphicPoint = new Graphic({
    // geometry: view.center,
    geometry: new Point({
      longitude: 108.221472,
      latitude: 16.07031,
    }),
    symbol: new SimpleMarkerSymbol({
      color: "yellow",
    }),
  });

  view.graphics.add(graphicPoint);
});
