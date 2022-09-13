require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/LayerList",
  "esri/Basemap",
  "esri/layers/WebTileLayer",
  "esri/geometry/Point",
  "esri/Graphic",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/geometry/Polyline",
  "esri/symbols/SimpleLineSymbol",
  "esri/geometry/Polygon",
  "esri/symbols/SimpleFillSymbol",
  "esri/layers/FeatureLayer",
  "esri/layers/MapImageLayer",
  "esri/widgets/Locate",
  "esri/widgets/BasemapGallery",
  "esri/widgets/BasemapToggle",
  "esri/widgets/Home",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/widgets/Print",
], function (
  Map,
  MapView,
  LayerList,
  Basemap,
  WebTileLayer,
  Point,
  Graphic,
  SimpleMarkerSymbol,
  Polyline,
  SimpleLineSymbol,
  Polygon,
  SimpleFillSymbol,
  FeatureLayer,
  MapImageLayer,
  Locate,
  BasemapGallery,
  BasemapToggle,
  Home,
  Legend,
  Expand,
  Print
) {
  const map = new Map({
    basemap: new Basemap({
      baseLayers: [
        new WebTileLayer({
          urlTemplate: "http://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}",
        }),
      ],
    }),
  });

  const view = new MapView({
    map: map,
    container: "viewDiv",
    center: [108.221472, 16.07031],
    scale: 100000,
  });

  new LayerList({
    view,
    container: "layerListContainer",
  });

  const btnLayerList = $("#btnLayerList"),
    layerListContainer = $("#layerListContainer");
  btnLayerList.click(() => {
    layerListContainer.toggleClass("hidden");
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
      style: "dash",
    }),
  });
  view.graphics.add(graphicLine);

  const graphicPolygon = new Graphic({
    geometry: new Polygon([
      [108.2213, 16.07009],
      [108.22129, 16.06993],
      [108.2214, 16.06992],
      [108.2214, 16.07008],
      [108.2213, 16.07009],
    ]),
    // symbol: new SimpleFillSymbol({
    //   color: "#9b59b6",
    //   outline: new SimpleLineSymbol({
    //     color: "#e74c3c",
    //     width: 2,
    //   }),
    // }),
    symbol: {
      type: "picture-fill", // autocasts as new PictureFillSymbol()
      url: "./Icon-EVN.png",
      width: "50px",
      height: "50px",
      outline: {
        style: "solid",
      },
    },
  });
  view.graphics.add(graphicPolygon);

  view.watch("scale", (val) => console.log(val));

  const thietBiDongCatLayer = new FeatureLayer({
    url: "https://dnpcgisportal.cpc.vn/portal/rest/services/GISPCDANANG_DEMO/LuoiDien_HaiChau_TT_Demo/FeatureServer/0",
    title: "Thiết bị đóng cắt",
    visible: false,
    minScale: 20000,
  });
  const thietBiDoDemLayer = new FeatureLayer({
    url: "https://dnpcgisportal.cpc.vn/portal/rest/services/GISPCDANANG_DEMO/LuoiDien_HaiChau_TT_Demo/FeatureServer/1",
    title: "Thiết bị đo đếm",
    visible: false,
    minScale: 20000,
  });
  const tuBuLayer = new FeatureLayer({
    url: "https://dnpcgisportal.cpc.vn/portal/rest/services/GISPCDANANG_DEMO/LuoiDien_HaiChau_TT_Demo/FeatureServer/2",
    title: "Tụ bù",
    visible: false,
    minScale: 20000,
  });
  const tramBienApLayer = new FeatureLayer({
    url: "https://dnpcgisportal.cpc.vn/portal/rest/services/GISPCDANANG_DEMO/LuoiDien_HaiChau_TT_Demo/FeatureServer/3",
    title: "Trạm biến áp",
    visible: false,
    minScale: 20000,
  });
  const diemRanhGioiLayer = new FeatureLayer({
    url: "https://dnpcgisportal.cpc.vn/portal/rest/services/GISPCDANANG_DEMO/LuoiDien_HaiChau_TT_Demo/FeatureServer/4",
    title: "Điểm ranh giới",
    visible: false,
    minScale: 20000,
  });
  const dauNoiLayer = new FeatureLayer({
    url: "https://dnpcgisportal.cpc.vn/portal/rest/services/GISPCDANANG_DEMO/LuoiDien_HaiChau_TT_Demo/FeatureServer/5",
    title: "Đấu nối",
    visible: false,
    minScale: 20000,
  });
  const cotDienLayer = new FeatureLayer({
    url: "https://dnpcgisportal.cpc.vn/portal/rest/services/GISPCDANANG_DEMO/LuoiDien_HaiChau_TT_Demo/FeatureServer/6",
    title: "Cột điện",
    visible: false,
    minScale: 20000,
  });
  const duongDayLayer = new FeatureLayer({
    url: "https://dnpcgisportal.cpc.vn/portal/rest/services/GISPCDANANG_DEMO/LuoiDien_HaiChau_TT_Demo/FeatureServer/7",
    title: "Đường dây",
  });
  const nenTramLayer = new FeatureLayer({
    url: "https://dnpcgisportal.cpc.vn/portal/rest/services/GISPCDANANG_DEMO/LuoiDien_HaiChau_TT_Demo/FeatureServer/8",
    title: "Nền trạm",
    visible: false,
    minScale: 20000,
  });
  const muongCapLayer = new FeatureLayer({
    url: "https://dnpcgisportal.cpc.vn/portal/rest/services/GISPCDANANG_DEMO/LuoiDien_HaiChau_TT_Demo/FeatureServer/9",
    title: "Mương cáp",
    visible: false,
    minScale: 20000,
  });

  map.addMany([
    duongDayLayer,
    thietBiDongCatLayer,
    thietBiDoDemLayer,
    tuBuLayer,
    tramBienApLayer,
    diemRanhGioiLayer,
    dauNoiLayer,
    cotDienLayer,
    nenTramLayer,
    muongCapLayer,
  ]);

  const banDoNen = new MapImageLayer({
    url: "https://biwase.info/server/rest/services/GISPCDANANG/BanDoNen_DaNang/MapServer",
  });

  map.add(banDoNen);
  map.reorder(banDoNen, 0);

  banDoNen.when(() => {
    const thuaDatCamLeLayer = banDoNen.findSublayerById(5);
    const thuaDatHoaVangLayer = banDoNen.findSublayerById(7);
    const thuaDatLienChieuLayer = banDoNen.findSublayerById(8);
    const thuaDatNguHanhSonLayer = banDoNen.findSublayerById(9);
    const thuaDatSonTraLayer = banDoNen.findSublayerById(10);
    const thuaDatThanhKheLayer = banDoNen.findSublayerById(11);
    thuaDatCamLeLayer.visible =
      thuaDatHoaVangLayer.visible =
      thuaDatLienChieuLayer.visible =
      thuaDatNguHanhSonLayer.visible =
      thuaDatSonTraLayer.visible =
      thuaDatThanhKheLayer.visible =
        false;
    const hanhChinhHuyenLayer = banDoNen.findSublayerById(16);
    hanhChinhHuyenLayer.definitionExpression = `TenQuanHuyen=N'Quận Hải Châu'`;

    const timDuongLayer = banDoNen.findSublayerById(13);
    timDuongLayer.definitionExpression = `doRong > 2`;
  });
  let handles = [];
  view.on("click", (event) => {
    if (handles.length) {
      handles.forEach((handle) => handle.remove());
      handles = [];
    }
    view.hitTest(event.screenPoint).then((response) => {
      if (response.results.length) {
        for (let i = 0; i < response.results.length; i++) {
          const feature = response.results[i];
          view.whenLayerView(feature.layer).then((layerView) => {
            const handle = layerView.highlight(feature.graphic);
            handles.push(handle);
          });
        }
      }
    });
  });

  var locateBtn = new Locate({ view: view });
  view.ui.add(locateBtn, "top-left");
  view.ui.add(
    new Expand({
      content: new BasemapGallery({ view }),
    }),
    "bottom-left"
  );
  view.ui.add(new BasemapToggle({ view }), "bottom-left");
  view.ui.add(new Home({ view }), "top-left");
  view.ui.add(
    new Expand({
      content: new Legend({ view }),
    }),
    "bottom-right"
  );
  view.ui.add(
    new Expand({
      content: new Print({
        view,
        printServiceUrl:
          "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
      }),
    }),
    "top-right"
  );

  const IGNORE_FIELDS = ["OBJECTID", "NgayKhoiTao"];
  [
    duongDayLayer,
    thietBiDongCatLayer,
    thietBiDoDemLayer,
    tuBuLayer,
    tramBienApLayer,
    diemRanhGioiLayer,
    dauNoiLayer,
    cotDienLayer,
    nenTramLayer,
    muongCapLayer,
  ].forEach((layer) => {
    layer.when(() => {
      const fieldInfos = [];
      for (const field of layer.fields) {
        if (!IGNORE_FIELDS.includes(field.name)) {
          const fieldInfo = {
            label: field.alias,
            fieldName: field.name,
          };
          fieldInfos.push(fieldInfo);
        }
      }
      let title = layer.title;
      if (layer === duongDayLayer) {
        title += " {TenDZ}";
      }

      layer.popupTemplate = {
        title,
        content: [
          {
            type: "fields",
            fieldInfos,
          },
          {
            type: "custom",
            creator: (graphic) => {
              const ID = graphic.attributes.ID;
              return '<img src="https://9mobi.vn/cf/images/2015/03/nkk/hinh-anh-dep-1.jpg"/>';
            },
          },
        ],
      };
    });
  });
});
