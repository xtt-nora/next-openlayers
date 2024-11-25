import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, TileDebug, Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { Circle as CircleGeom } from "ol/geom";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const FooterPrint = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const camera = new THREE.OrthographicCamera(
    -window.innerWidth / 4,
    window.innerWidth / 4,
    window.innerHeight / 4,
    -window.innerHeight / 4,
    1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const globe = new THREE.Mesh(new THREE.SphereGeometry(90, 64, 64), new THREE.MeshPhongMaterial());
  const controls = new OrbitControls(camera, renderer.domElement);
  const scene = new THREE.Scene();
  const init = () => {
    if (!mapRef.current || !containerRef.current) return;

    const view = new View({
      projection: "EPSG:4326",
      extent: [-180, -90, 180, 90],
      center: [0, 0],
      zoom: 2,
    });

    const osmLayer = new TileLayer({
      source: new OSM(),
    });
    const zoomLayers = new TileLayer({
      extent: [-180, -90, 180, 90],
      source: new OSM({
        maxZoom: 2,
      }),
    });
    const debugLayers = new TileLayer({
      source: new TileDebug(),
    });
    const map = new Map({
      target: mapRef.current,
      layers: [zoomLayers, osmLayer, debugLayers],
      view,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    scene.background = new THREE.Color(0xa0a0a0);
    var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    hemiLight.position.set(0, 100, 0);
    hemiLight.matrixAutoUpdate = false;
    hemiLight.updateMatrix();

    dirLight.position.set(3, 10, 1000);
    dirLight.castShadow = true;

    scene.add(hemiLight);
    scene.add(dirLight);

    camera.position.set(0, 0, 100);
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.enableDamping = false;
    controls.target.set(0, 0, 0);
    controls.update();
    scene.add(globe);
    map.on("rendercomplete", () => {
      const mapCanvas = mapRef.current!.getElementsByTagName("canvas")[0];
      const size = map.getSize();
      if (!size) {
        console.error("Map size is undefined");
        return;
      }

      mapCanvas.width = size[0];
      mapCanvas.height = size[1];
      var mapContext = mapCanvas.getContext("2d");
      Array.prototype.forEach.call(document.querySelectorAll(".ol-layer canvas"), function (canvas) {
        if (canvas.width > 0) {
          var opacity = canvas.parentNode.style.opacity;
          mapContext!.globalAlpha = opacity === "" ? 1 : Number(opacity);
          var transform = canvas.style.transform;

          var matrix = transform
            .match(/^matrix\(([^\(]*)\)$/)[1]
            .split(",")
            .map(Number);

          CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
          mapContext!.drawImage(canvas, 0, 0);
        }
      });
      const texture = new THREE.CanvasTexture(mapCanvas);
      (globe.material as THREE.MeshPhongMaterial).map = texture;
      (globe.material as THREE.MeshPhongMaterial).needsUpdate = true;
    });

    controls.addEventListener("end", () => {
      const zoom = Math.floor(camera.zoom);
      let newWidth = 500;
      let resolution = 0.36;

      if (zoom === 2) {
        newWidth = 800;
        resolution = 0.225;
      } else if (zoom === 3) {
        newWidth = 1000;
        resolution = 0.18;
      }

      mapRef.current!.style.width = `${newWidth}px`;
      mapRef.current!.style.height = `${newWidth / 2}px`;
      map.updateSize();
      view.setResolution(resolution);
    });

    const raycaster = new THREE.Raycaster();
    controls.addEventListener("end", () => {
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera); // 修复类型问题
      const intersects = raycaster.intersectObject(globe);
      if (intersects.length > 0) {
        const intersect = intersects[0];
        const uv = intersect.uv;

        if (!uv) return;

        const [x, y] = map.getCoordinateFromPixel([
          uv.x * renderer.domElement.width,
          uv.y * renderer.domElement.height,
        ]);

        const circleFeature = new Feature({
          geometry: new CircleGeom([x, y], 20),
        });

        const circleSource = new VectorSource({
          features: [circleFeature],
        });

        const circleLayer = new VectorLayer({
          source: circleSource,
        });

        map.addLayer(circleLayer);
      }
    });
  };
  const animate = () => {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
  };
  useEffect(() => {
    init();
    animate();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[calc(100%-130px)] flex flex-col flex-nowrap ">
      <div id="map" ref={mapRef} className="absolute invisible w-[1000px] h-[500px]"></div>
    </div>
  );
};
