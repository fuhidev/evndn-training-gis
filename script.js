require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
], function (Map, MapView, FeatureLayer) {
  const map = new Map({
    basemap: "dark-gray-vector",
  });

  const view = new MapView({
    map: map,
    container: "viewDiv",
    center: [108.221472, 16.07031],
    scale: 100000,
  });

  const tramBienApLayer = new FeatureLayer({
    url: "https://biwase.info/server/rest/services/GISPCDANANG/LuoiDien_HaiChau_TT/FeatureServer/3",
    minScale: 0,
  });
  // map.add(tramBienApLayer);
  async function taiDuLieu() {
    const result = await fetch("./data.json");
    const datas = await result.json();
    for (const data of datas) {
      const result = await tramBienApLayer.queryFeatures({
        where: `MaCMIS = '${data.maTram}'`,
        outFields: ["TenTramBienAp", "MaCMIS"],
        returnGeometry: true,
        outSpatialReference: view.spatialReference,
      });
      if (result.features.length > 0) {
        const tramBienApGraphic = result.features[0];
        const maCMIS = tramBienApGraphic.attributes.MaCMIS;
        const dataMatDien = datas.find((data) => data.maTram === maCMIS);
        let color = "red";
        if (dataMatDien.loaiMatDien === "KH") {
          color = "green";
        }
        tramBienApGraphic.symbol = {
          type: "simple-marker",
          color: color,
        };
        view.graphics.add(tramBienApGraphic);
      }
    }
  }

  view.when(() => taiDuLieu());
});
