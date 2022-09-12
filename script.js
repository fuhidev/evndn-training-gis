require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Basemap",
  "esri/layers/WebTileLayer",
], function (Map, MapView, Basemap, WebTileLayer) {
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
});
