"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCw, ZoomIn, ZoomOut, Eye, Layers } from "lucide-react";

interface Product3DViewerProps {
  productSlug: string;
  productName: string;
  fallbackImage: string;
  defaultFinish?: string;
}

export default function Product3DViewer({
  productSlug,
  productName,
  fallbackImage,
  defaultFinish = "Natural Bamboo",
}: Product3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [activeFinish, setActiveFinish] = useState<string>(defaultFinish);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const finishes: Record<string, { color: number; roughness: number; metalness: number }> = {
    "Natural Bamboo": { color: 0xc89658, roughness: 0.45, metalness: 0.05 },
    "Carbonized Dark": { color: 0x5c381c, roughness: 0.5, metalness: 0.05 },
    "Matte Black": { color: 0x1e293b, roughness: 0.35, metalness: 0.2 },
    "Brushed Steel": { color: 0x94a3b8, roughness: 0.25, metalness: 0.8 },
  };

  useEffect(() => {
    if (materialRef.current) {
      const config = finishes[activeFinish] || finishes["Natural Bamboo"];
      materialRef.current.color.setHex(config.color);
      materialRef.current.roughness = config.roughness;
      materialRef.current.metalness = config.metalness;
      materialRef.current.wireframe = wireframe;
      materialRef.current.needsUpdate = true;
    }
  }, [activeFinish, wireframe]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(2.8, 2.2, 3.8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 1.6);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x0d9488, 0.8);
    fillLight.position.set(-5, 2, -4);
    scene.add(fillLight);

    // Procedural Product Geometry based on slug
    const meshGroup = new THREE.Group();
    meshGroupRef.current = meshGroup;
    scene.add(meshGroup);

    const config = finishes[activeFinish] || finishes["Natural Bamboo"];
    const mat = new THREE.MeshStandardMaterial({
      color: config.color,
      roughness: config.roughness,
      metalness: config.metalness,
      wireframe: wireframe,
    });
    materialRef.current = mat;

    // Build model shape based on slug keyword
    if (productSlug.includes("stand") || productSlug.includes("riser")) {
      const top = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.12, 1.1), mat);
      top.castShadow = true;
      meshGroup.add(top);

      const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.5, 16);
      const legMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
      [
        [-1.1, -0.28, 0.45],
        [1.1, -0.28, 0.45],
        [-1.1, -0.28, -0.45],
        [1.1, -0.28, -0.45],
      ].forEach(([x, y, z]) => {
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(x, y, z);
        meshGroup.add(leg);
      });
    } else if (productSlug.includes("bowl") || productSlug.includes("diffuser")) {
      const bowlGeo = new THREE.SphereGeometry(1.1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.65);
      const bowl = new THREE.Mesh(bowlGeo, mat);
      bowl.rotation.x = Math.PI;
      bowl.position.y = 0.5;
      meshGroup.add(bowl);
    } else if (productSlug.includes("organizer") || productSlug.includes("dock") || productSlug.includes("tray")) {
      const base = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, 1.4), mat);
      meshGroup.add(base);
      const dividerMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.5 });
      for (let i = -0.6; i <= 0.6; i += 0.4) {
        const slot = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.45, 1.2), dividerMat);
        slot.position.set(i, 0.15, 0);
        meshGroup.add(slot);
      }
    } else {
      // Default sleek geometric e-commerce product
      const main = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 0.9), mat);
      meshGroup.add(main);
    }

    // Shadow plane
    const planeGeo = new THREE.PlaneGeometry(8, 8);
    const planeMat = new THREE.ShadowMaterial({ opacity: 0.25 });
    const shadowPlane = new THREE.Mesh(planeGeo, planeMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.8;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Manual Orbit Drag Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0.003 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !meshGroupRef.current) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      meshGroupRef.current.rotation.y += deltaX * 0.01;
      meshGroupRef.current.rotation.x += deltaY * 0.01;

      rotationVelocity = { x: deltaY * 0.002, y: deltaX * 0.002 };
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const canvas = renderer.domElement;
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Wheel Zoom
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z = Math.max(
        2.5,
        Math.min(6.5, cameraRef.current.position.z + e.deltaY * 0.003)
      );
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging && meshGroupRef.current) {
        meshGroupRef.current.rotation.y += 0.004;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(animId);
      renderer.dispose();
      mat.dispose();
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [productSlug, fallbackImage]);

  const resetView = () => {
    if (meshGroupRef.current) {
      meshGroupRef.current.rotation.set(0, 0, 0);
    }
    if (cameraRef.current) {
      cameraRef.current.position.set(2.8, 2.2, 3.8);
    }
  };

  const handleZoom = (direction: "in" | "out") => {
    if (!cameraRef.current) return;
    const delta = direction === "in" ? -0.5 : 0.5;
    cameraRef.current.position.z = Math.max(
      2.5,
      Math.min(6.5, cameraRef.current.position.z + delta)
    );
  };

  if (!hasWebGL) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl">
        <img
          src={fallbackImage}
          alt={productName}
          className="max-h-72 object-contain"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200/70 dark:from-slate-800/80 dark:to-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner">
      {/* 3D Canvas Mount */}
      <div
        ref={containerRef}
        className="w-full h-[400px] sm:h-[480px] cursor-grab active:cursor-grabbing select-none"
        title="Click and drag to rotate in 3D"
      />

      {/* Control Overlay */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        <div className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur text-white text-xs font-semibold flex items-center gap-1.5 shadow-md">
          <Eye className="w-3.5 h-3.5 text-teal-400" />
          <span>Interactive 3D Preview</span>
        </div>
      </div>

      {/* Floating Action Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md">
        <button
          type="button"
          onClick={() => handleZoom("in")}
          aria-label="Zoom in"
          className="p-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[36px] min-w-[36px] flex items-center justify-center"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleZoom("out")}
          aria-label="Zoom out"
          className="p-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[36px] min-w-[36px] flex items-center justify-center"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={resetView}
          aria-label="Reset 3D view orientation"
          className="p-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[36px] min-w-[36px] flex items-center justify-center"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setWireframe(!wireframe)}
          aria-label="Toggle wireframe topology"
          className={`p-2 rounded-lg min-h-[36px] min-w-[36px] flex items-center justify-center transition ${
            wireframe
              ? "bg-teal-600 text-white"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Material Finish Selector */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Finish / Material:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {Object.keys(finishes).map((finish) => (
            <button
              key={finish}
              type="button"
              onClick={() => setActiveFinish(finish)}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition ${
                activeFinish === finish
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {finish}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
