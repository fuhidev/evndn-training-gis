require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Directions/DirectionsViewModel",
  "esri/geometry/geometryEngine",
  "esri/geometry/projection",
  "esri/geometry/Circle",
], function (
  esriConfig,
  Map,
  MapView,
  DirectionsViewModel,
  geometryEngine,
  projection,
  Circle
) {
  esriConfig.apiKey =
    "AAPK5c4db632615f4933ac2687a2a1dd9a35_l3JWRK1sTg2IBtjZXii8B6qhiOqvu0mKC7upYQc9QPADG582XiSRvYxD1jjkq4o";
  const map = new Map({
    basemap: "dark-gray-vector",
  });

  const view = new MapView({
    map: map,
    container: "viewDiv",
    center: [108.221472, 16.07031],
    scale: 1000,
  });

  view.when(() => {
    const btnXem = $("#btnXem"),
      btnXoa = $("#btnXoa"),
      iKCHaiTru = $("#iKCHaiTru"),
      iKCTimDuong = $("#kcTimDuong");

    const directionVM = new DirectionsViewModel();
    directionVM.load().then(async () => {
      let toaDoDiems = [];
      view.on("click", (evt) => {
        toaDoDiems.push(evt.mapPoint);
        view.graphics.add({
          geometry: evt.mapPoint,
          symbol: {
            type: "simple-marker",
            color: "yellow",
          },
        });
      });
      btnXoa.click(() => {
        view.graphics.removeAll();
        toaDoDiems = [];
      });
      btnXem.click(async () => {
        if (toaDoDiems.length >= 2) {
          const stops = [];
          for (const mapPoint of toaDoDiems) {
            stops.push({
              geometry: mapPoint,
            });
          }
          directionVM.stops = stops;

          const result = await directionVM.getDirections();
          view.graphics.removeAll();
          const directionLines = [];
          for (const item of result.directionLines) {
            const graphic = item.toGraphic();
            const geometryLine = projection.project(
              graphic.geometry,
              view.spatialReference
            );
            directionLines.push(geometryLine);
          }
          const unionGeom = geometryEngine.union(directionLines);
          const kcBuffer = +iKCTimDuong.val();
          const timDuongTinhTien = geometryEngine.offset(
            unionGeom,
            kcBuffer,
            "meters"
          );
          const graphicBuffer = {
            geometry: timDuongTinhTien,
            symbol: {
              type: "simple-line",
              color: "rgb(232, 67, 147)",
            },
          };
          view.graphics.add(graphicBuffer);
          const kcLonNhatGiuaHaiTru = +iKCHaiTru.val();

          let tamDuongTron = timDuongTinhTien.getPoint(0, 0);
          view.graphics.add({
            geometry: tamDuongTron,
            symbol: {
              type: "simple-marker",
              color: "yellow",
              size: 5,
            },
          });
          const chieuDaiCuaTimDuongTinhTien = geometryEngine.geodesicLength(
            timDuongTinhTien,
            "meters"
          );
          const soTru = Math.ceil(
            chieuDaiCuaTimDuongTinhTien / kcLonNhatGiuaHaiTru
          );
          const kcTamGiuaHaiTru = chieuDaiCuaTimDuongTinhTien / soTru;
          for (let i = 0; i < soTru; i++) {
            const circle = new Circle({
              center: tamDuongTron,
              radius: kcTamGiuaHaiTru,
              unit: "meters",
            });
            const ketQuaGiaoDiem = geometryEngine.intersect(
              circle,
              timDuongTinhTien
            );
            const giaoDiem = ketQuaGiaoDiem.getPoint(
              0,
              ketQuaGiaoDiem.paths[0].length - 1
            );
            view.graphics.add({
              geometry: giaoDiem,
              symbol: {
                type: "simple-marker",
                color: "yellow",
                size: 5,
              },
            });
            tamDuongTron = giaoDiem;
          }
        }
      });
    });
  });
});
