require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Basemap",
  "esri/layers/WebTileLayer",
  "esri/geometry/Point",
  "esri/Graphic",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/geometry/Polyline",
  "esri/symbols/SimpleLineSymbol",
], function (
  Map,
  MapView,
  Basemap,
  WebTileLayer,
  Point,
  Graphic,
  SimpleMarkerSymbol,
  Polyline,
  SimpleLineSymbol
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

  const graphicLine = new Graphic({
    geometry: new Polyline([
      [108.22123, 16.070462],
      [108.22185, 16.07042],
      [108.22186, 16.06979],
      [108.22151, 16.06975],
      [108.22114, 16.06975],
      [108.22123, 16.070462],
    ]),
    symbol: new SimpleLineSymbol({
      color: "green",
      width: 2,
      style: "solid",
    }),
  });
  view.graphics.add(graphicLine);
});
