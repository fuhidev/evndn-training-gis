require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/LayerList",
  "esri/layers/WebTileLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/MapImageLayer",
  "esri/Basemap",
  "esri/widgets/FeatureForm",
  "esri/widgets/Sketch/SketchViewModel",
  "esri/layers/GraphicsLayer",
  "esri/rest/query",
  "esri/geometry/geometryEngine",
], function (
  esriConfig,
  Map,
  MapView,
  LayerList,
  WebTileLayer,
  FeatureLayer,
  MapImageLayer,
  Basemap,
  FeatureForm,
  SketchViewModel,
  GraphicsLayer,
  query,
  geometryEngine
) {
  const map = new Map({
    basemap: new Basemap({
      baseLayers: [
        new WebTileLayer({
          urlTemplate:
            "http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        }),
      ],
    }),
  });

  const view = new MapView({
    map: map,
    center: [108.2214, 16.0702], // Longitude, latitude
    zoom: 15, // Zoom level
    container: "viewDiv", // Div element
  });

  new LayerList({
    container: "layerListContainer",
    view,
  });

  const layerListContainer = $("#layerListContainer");

  const btnLayerList = $("#btnLayerList");
  btnLayerList.click(() => {
    layerListContainer.toggleClass("hidden");
  });

  const graphicPoint = {
    geometry: view.center,
    symbol: {
      type: "simple-marker",
      color: "yellow",
    },
  };
  view.graphics.add(graphicPoint);

  const graphicLine = {
    geometry: {
      type: "polyline",
      paths: [
        [108.22123, 16.070462],
        [108.22185, 16.07042],
        [108.22186, 16.06979],
        [108.22151, 16.06975],
        [108.22114, 16.06975],
        [108.22123, 16.070462],
      ],
    },
    symbol: {
      type: "simple-line",
      color: "green",
      style: "dash",
      width: 2,
    },
  };
  view.graphics.add(graphicLine);
  const graphicPolygon = {
    geometry: {
      type: "polygon",
      rings: [
        [
          [108.2213, 16.07009],
          [108.22129, 16.06993],
          [108.2214, 16.06992],
          [108.2214, 16.07008],
          [108.2213, 16.07009],
        ],
      ],
    },
    symbol: {
      type: "picture-fill",
      url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
      width: 24,
      height: 24,
      outline: {
        color: "#e74c3c",
        width: 2,
      },
    },
  };
  view.graphics.add(graphicPolygon);
  const thietBiDongCatLayer = new FeatureLayer({
    url: "https://biwase.info/server/rest/services/GISPCDANANG/LuoiDien_HaiChau_TT/FeatureServer/0",
    title: "Thiết bị đóng cắt",
    visible: false,
  });
  const thietBiDoDemLayer = new FeatureLayer({
    url: "https://biwase.info/server/rest/services/GISPCDANANG/LuoiDien_HaiChau_TT/FeatureServer/1",
    title: "Thiết bị đo đếm",
    visible: false,
  });
  const tuBuLayer = new FeatureLayer({
    url: "https://biwase.info/server/rest/services/GISPCDANANG/LuoiDien_HaiChau_TT/FeatureServer/2",
    title: "Tụ bù",
    visible: false,
  });
  const tramBienApLayer = new FeatureLayer({
    url: "https://biwase.info/server/rest/services/GISPCDANANG/LuoiDien_HaiChau_TT/FeatureServer/3",
    title: "Trạm biến áp",
    visible: false,
  });
  const diemRanhGioiLayer = new FeatureLayer({
    url: "https://biwase.info/server/rest/services/GISPCDANANG/LuoiDien_HaiChau_TT/FeatureServer/4",
    title: "Điểm ranh giới",
    visible: false,
  });
  const dauNoiLayer = new FeatureLayer({
    url: "https://biwase.info/server/rest/services/GISPCDANANG/LuoiDien_HaiChau_TT/FeatureServer/5",
    title: "Đấu nối",
    visible: false,
  });
  const cotDienLayer = new FeatureLayer({
    url: "https://biwase.info/server/rest/services/GISPCDANANG/LuoiDien_HaiChau_TT/FeatureServer/6",
    title: "Cột điện",
    visible: false,
  });
  const duongDayLayer = new FeatureLayer({
    url: "https://biwase.info/server/rest/services/GISPCDANANG/LuoiDien_HaiChau_TT/FeatureServer/7",
    title: "Đường dây",
    visible: false,
  });
  const nenTramLayer = new FeatureLayer({
    url: "https://biwase.info/server/rest/services/GISPCDANANG/LuoiDien_HaiChau_TT/FeatureServer/8",
    title: "Nền trạm",
    visible: false,
  });
  const muongCapLayer = new FeatureLayer({
    url: "https://biwase.info/server/rest/services/GISPCDANANG/LuoiDien_HaiChau_TT/FeatureServer/9",
    title: "Mương cáp",
    visible: false,
  });

  map.addMany([
    thietBiDongCatLayer,
    thietBiDoDemLayer,
    tuBuLayer,
    tramBienApLayer,
    diemRanhGioiLayer,
    dauNoiLayer,
    cotDienLayer,
    duongDayLayer,
    nenTramLayer,
    muongCapLayer,
  ]);

  const banDoNenLayer = new MapImageLayer({
    url: "https://biwase.info/server/rest/services/GISPCDANANG/BanDoNen_DaNang/MapServer",
    title: "Bản đồ nền",
  });
  map.add(banDoNenLayer);
  map.reorder(banDoNenLayer, 0);
  banDoNenLayer.when(() => {
    const hanhChinhHuyen = banDoNenLayer.findSublayerById(16);
    hanhChinhHuyen.definitionExpression = `TenQuanHuyen=N'Quận Hải Châu'`;

    const hanhChinhXa = banDoNenLayer.findSublayerById(1);
    hanhChinhXa.definitionExpression = `IDQuanHuyen='492'`;

    const thuaDatCamle = banDoNenLayer.findSublayerById(5);
    thuaDatCamle.visible = false;
    const thuaDatHoaVang = banDoNenLayer.findSublayerById(7);
    thuaDatHoaVang.visible = false;
    const thuaDatLienChieu = banDoNenLayer.findSublayerById(8);
    thuaDatLienChieu.visible = false;
    const thuaDatNguHanhSon = banDoNenLayer.findSublayerById(9);
    thuaDatNguHanhSon.visible = false;
    const thuaDatSonTra = banDoNenLayer.findSublayerById(10);
    thuaDatSonTra.visible = false;
    const thuaDatThanhKhe = banDoNenLayer.findSublayerById(11);
    thuaDatThanhKhe.visible = false;
  });

  // let highlightHandles = [];
  // view.on("click", (evt) => {
  //   for (const handle of highlightHandles) {
  //     handle.remove();
  //   }
  //   highlightHandles = [];
  //   view.hitTest(evt).then((response) => {
  //     if (response.results.length) {
  //       for (const item of response.results) {
  //         const { layer, graphic } = item;
  //         if (layer.type === "feature") {
  //           view.whenLayerView(layer).then((layerView) => {
  //             const handle = layerView.highlight(graphic);
  //             highlightHandles.push(handle);
  //           });
  //         }
  //       }
  //     }
  //   });
  // });

  [
    thietBiDongCatLayer,
    thietBiDoDemLayer,
    tuBuLayer,
    tramBienApLayer,
    diemRanhGioiLayer,
    dauNoiLayer,
    cotDienLayer,
    duongDayLayer,
    nenTramLayer,
    muongCapLayer,
  ].forEach((layer) => {
    layer.when(() => {
      const fieldInfos = layer.fields.map((field) => ({
        fieldName: field.name,
        label: field.alias,
      }));
      layer.popupTemplate = {
        title: layer.title,
        content: [
          {
            type: "fields",
            fieldInfos,
          },
        ],
        actions: [
          {
            title: "Chỉnh sửa",
            id: "edit",
            className: "esri-icon-edit",
          },
        ],
      };
    });
  });
  view.popup.on("trigger-action", (evt) => {
    if (evt.action.id === "edit") {
      const graphic = view.popup.selectedFeature;
      const container = view.popup.container.querySelector(
        ".esri-popup__content"
      );
      container.innerHTML = "";
      const featureForm = new FeatureForm({
        container,
        feature: graphic,
      });
      featureForm.when(() => {
        const btnSubmit = $("<button/>");
        btnSubmit.text("Cập nhật");
        btnSubmit.addClass(
          "bg-violet-600 text-white text-bold hover:bg-violet-800 px-4 py-2"
        );
        btnSubmit.click(() => featureForm.submit());
        container.appendChild(btnSubmit[0]);
      });

      featureForm.on("submit", () => {
        const editFeature = graphic.clone();
        const updated = featureForm.getValues();
        Object.keys(updated).forEach((name) => {
          editFeature.attributes[name] = updated[name];
        });
        const edits = {
          updateFeatures: [editFeature],
        };
        graphic.layer.applyEdits(edits).then((editsResult) => {});
      });
    }
  });

  duongDayLayer.labelingInfo = [
    {
      symbol: {
        type: "text",
        color: "#34495e",
        haloColor: "white",
        haloSize: 1,
        font: {
          size: 12,
        },
      },
      labelExpressionInfo: {
        expression: "$feature.TenDZ ",
      },
      maxScale: 0,
    },
  ];

  const tuyenDayContainer = $("#tuyenDayContainer"),
    btnTuyenDayContainer = $("#btnTuyenDayContainer"),
    ulDanhSachTuyenDay = $("#ulDanhSachTuyenDay");
  btnTuyenDayContainer.click(() => {
    tuyenDayContainer.toggleClass("hidden");
  });

  duongDayLayer
    .queryFeatures({
      outFields: ["TenDZ", "ID", "OBJECTID", "MaXuatTuyen"],
      returnGeometry: false,
      where: "1=1",
    })
    .then(({ features }) => {
      features.forEach((feature) => {
        const li = $("<li/>");
        li.addClass(
          "py-1 px-2 hover:bg-blue-600 hover:text-white hover:shadow rounded"
        );
        const { TenDZ, ID, OBJECTID } = feature.attributes;
        li.text(`${ID}, ${TenDZ}`);

        li.click(() => {
          duongDayLayer
            .queryFeatures({
              outFields: ["MaXuatTuyen"],
              objectIds: [OBJECTID], // hoặc where:`OBJECTID = ${OBJECTID}`,
              returnGeometry: true,
              outSpatialReference: view.spatialReference,
            })
            .then((response) => {
              if (response.features.length) {
                const feature = response.features[0];
                view.goTo(feature);
                const { MaXuatTuyen } = feature.attributes;
                // tramBienApLayer.definitionExpression = `MaXuatTuyen='${MaXuatTuyen}'`;
                view.whenLayerView(tramBienApLayer).then((layerView) => {
                  layerView.featureEffect = {
                    filter: {
                      where: `MaXuatTuyen='${MaXuatTuyen}'`,
                    },
                    excludedEffect: "grayscale(100%) opacity(30%)",
                  };
                });
              }
            });
        });

        ulDanhSachTuyenDay.append(li);
      });
    });

  const btnBaiToan2 = $("#btnBaiToan2"),
    baiToan2Container = $("#baiToan2Container"),
    btnBaiToan2VeKhuVuc = $("#btnBaiToan2VeKhuVuc"),
    iptBaiToan2KcTD = $("#iptBaiToan2KcTD"),
    iptBaiToan2KcCot = $("#iptBaiToan2KcCot");
  btnBaiToan2.click(() => {
    baiToan2Container.toggleClass("hidden");
  });
  const svm = new SketchViewModel({
    view,
    layer: new GraphicsLayer({ listMode: "hidden" }),
  });
  const timDuong = btnBaiToan2VeKhuVuc.click(() => {
    if (iptBaiToan2KcCot.val() && iptBaiToan2KcTD.val()) {
      svm.create("polygon");
    }
  });
  svm.on("create", (e) => {
    if (e.state === "complete") {
      const graphic = e.graphic;
      view.graphics.add(graphic);
      query
        .executeQueryJSON(
          "https://biwase.info/server/rest/services/GISPCDANANG/BanDoNen_DaNang/MapServer/13",
          {
            geometry: graphic.geometry,
            returnGeometry: true,
            outSpatialReference: view.spatialReference,
            num: 1,
          }
        )
        .then((response) => {
          if (response.features.length) {
            const geometry1 = response.features[0].geometry,
              geometry2 = graphic.geometry;
            const outIntersect = geometryEngine.intersect(
              geometry1,
              geometry2
            );
            view.graphics.add({
              geometry: outIntersect,
              symbol: {
                type: "simple-line",
                color: "green",
              },
            });
            const kcTimDuong = +iptBaiToan2KcTD.val();
            const offsetGeom = geometryEngine.offset(
              outIntersect,
              kcTimDuong,
              "meters"
            );
            view.graphics.add({
              geometry: offsetGeom,
              symbol: {
                type: "simple-line",
                color: "red",
              },
            });

            const viTriDiemDauTien = offsetGeom.getPoint(0, 0);
            const doDaiTimDuong = geometryEngine.geodesicLength(
              offsetGeom,
              "meters"
            );

            const banKinhGoc = +iptBaiToan2KcCot.val();
            let banKinh = banKinhGoc;
            let i = 1;
            const viTriCotDiens = [];
            do {
              const vongTronKhoangCach = geometryEngine.buffer(
                viTriDiemDauTien,
                banKinh,
                "meters"
              );
              const giaoDiem = geometryEngine.intersect(
                vongTronKhoangCach,
                offsetGeom
              );
              const viTriCotDien = giaoDiem.getPoint(
                0,
                giaoDiem.paths[0].length - 1
              );
              viTriCotDiens.push(viTriCotDien);
              view.graphics.add({
                geometry: viTriCotDien,
                symbol: {
                  type: "simple-marker",
                },
              });
              i++;
            } while ((banKinh = banKinhGoc * i) < doDaiTimDuong);
          }
        });
    }
  });
});