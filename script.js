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
    const iTuNgay = $("#iTuNgay"),
      iDenNgay = $("#iDenNgay"),
      btnXem = $("#btnXem");
    const ngayHomNay = new Date();
    const thangNay = ngayHomNay.getMonth() + 1;
    const giaTriThoiGian = `${ngayHomNay.getFullYear()}-${
      (thangNay < 10 ? "0" : "") + thangNay
    }-${ngayHomNay.getDate()}`;
    iTuNgay.val(giaTriThoiGian);
    iDenNgay.val(giaTriThoiGian);
    btnXem.click(() => {
      if (iTuNgay.val() && iDenNgay.val()) {
        locDuLieu();
      } else {
        alert("Chưa chọn thời gian");
      }
    });
    locDuLieu();
    async function locDuLieu() {
      view.graphics.removeAll();
      const tuNgay = new Date(iTuNgay.val()),
        denNgay = new Date(iDenNgay.val());
      denNgay.setDate(denNgay.getDate() + 1);
      let dataLocTheoNgays = datas.filter((data) => {
        const date = new Date(data.thoiDiemMatDien);
        if (date.getTime() >= tuNgay.getTime() && date.getTime() < denNgay) {
          return true;
        }
        return false;
      });
      for (const data of dataLocTheoNgays) {
        const result = await tramBienApLayer.queryFeatures({
          where: `MaCMIS = '${data.maTram}'`,
          outFields: ["TenTramBienAp", "MaCMIS"],
          returnGeometry: true,
          outSpatialReference: view.spatialReference,
        });
        if (result.features.length > 0) {
          const tramBienApGraphic = result.features[0];
          const maCMIS = tramBienApGraphic.attributes.MaCMIS;
          const TenTramBienAp = tramBienApGraphic.attributes.TenTramBienAp;
          const dataMatDien = datas.find((data) => data.maTram === maCMIS);
          let url = `./${dataMatDien.loaiMatDien}.gif`;
          let size = 30;
          if (dataMatDien.soLuongKhachHang <= 100) {
            size = 20;
          } else if (dataMatDien.soLuongKhachHang <= 200) {
            size = 25;
          }
          tramBienApGraphic.symbol = {
            type: "picture-marker",
            url: url,
            width: size,
            height: size,
          };
          tramBienApGraphic.popupTemplate = {
            title: TenTramBienAp,
            content: `
          <div>Thời điểm mất điện: ${dataMatDien.thoiDiemMatDien}</div>
          <div>Thời điểm khôi phục: ${dataMatDien.thoiDiemKhoiPhuc}</div>
          <div>Số lượng khách hàng: ${dataMatDien.soLuongKhachHang}</div>
          `,
          };
          view.graphics.add(tramBienApGraphic);
        }
      }
    }
  }

  view.when(() => taiDuLieu());
});
