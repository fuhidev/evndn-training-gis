require(["esri/Map", "esri/views/MapView"], function (Map, MapView) {
  const map = new Map({
    basemap: "satellite",
  });

  const view = new MapView({
    map: map,
    container: "viewDiv",
    center: [108.221472, 16.07031],
    scale: 50000,
  });
});
