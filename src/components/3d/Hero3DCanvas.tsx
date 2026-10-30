"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isReducedMotion) return;

    // Check WebGL availability
    let canvas: HTMLCanvasElement;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      canvas = renderer.domElement;
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(canvas);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff7ed, 1.8);
    mainLight.position.set(4, 6, 4);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x0d9488, 1.4); // Teal rim light
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xf59e0b, 1.2, 8); // Warm amber point light
    accentLight.position.set(2, 1, 2);
    scene.add(accentLight);

    // Create 3D Hero Models Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Hero: Minimalist Bamboo Monitor Riser
    const riserGroup = new THREE.Group();
    const riserGeo = new THREE.BoxGeometry(2.4, 0.12, 0.9);
    const bambooMat = new THREE.MeshStandardMaterial({
      color: 0xc89658,
      roughness: 0.45,
      metalness: 0.05,
    });
    const riserTop = new THREE.Mesh(riserGeo, bambooMat);
    riserTop.castShadow = true;
    riserTop.receiveShadow = true;
    riserGroup.add(riserTop);

    // Riser legs
    const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 16);
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.25,
      metalness: 0.85,
    });
    const legPositions = [
      [-1.05, -0.22, 0.35],
      [1.05, -0.22, 0.35],
      [-1.05, -0.22, -0.35],
      [1.05, -0.22, -0.35],
    ];
    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, steelMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      riserGroup.add(leg);
    });
    riserGroup.position.set(0, -0.4, 0);
    group.add(riserGroup);

    // 2. Floating Item: Modern Studio Wireless Headphone
    const headphoneGroup = new THREE.Group();
    const bandCurve = new THREE.TorusGeometry(0.48, 0.035, 16, 48, Math.PI);
    const bandMesh = new THREE.Mesh(bandCurve, steelMat);
    bandMesh.rotation.z = Math.PI;
    headphoneGroup.add(bandMesh);

    const earCupGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32);
    const earCupMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.2,
    });
    const leftCup = new THREE.Mesh(earCupGeo, earCupMat);
    leftCup.rotation.z = Math.PI / 2;
    leftCup.position.set(-0.48, -0.1, 0);
    const rightCup = leftCup.clone();
    rightCup.position.set(0.48, -0.1, 0);
    headphoneGroup.add(leftCup);
    headphoneGroup.add(rightCup);

    headphoneGroup.position.set(-1.4, 0.6, 0.4);
    headphoneGroup.rotation.set(0.3, 0.4, -0.2);
    group.add(headphoneGroup);

    // 3. Floating Item: Geometric Ceramic Planter with Succulent
    const planterGroup = new THREE.Group();
    const potGeo = new THREE.CylinderGeometry(0.32, 0.22, 0.45, 7);
    const potMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.2,
      metalness: 0.1,
    });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.castShadow = true;
    planterGroup.add(pot);

    const plantMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.6,
    });
    for (let i = 0; i < 5; i++) {
      const leafGeo = new THREE.ConeGeometry(0.12, 0.35, 5);
      const leaf = new THREE.Mesh(leafGeo, plantMat);
      const angle = (i / 5) * Math.PI * 2;
      leaf.position.set(Math.cos(angle) * 0.1, 0.25, Math.sin(angle) * 0.1);
      leaf.rotation.set(0.4 * Math.sin(angle), angle, 0.4 * Math.cos(angle));
      planterGroup.add(leaf);
    }
    planterGroup.position.set(1.4, 0.5, 0.2);
    planterGroup.rotation.set(-0.2, 0.5, 0.1);
    group.add(planterGroup);

    // 4. Floating Marketplace Package / Prism
    const packageGroup = new THREE.Group();
    const pkgGeo = new THREE.BoxGeometry(0.48, 0.48, 0.48);
    const pkgMat = new THREE.MeshStandardMaterial({
      color: 0x0d9488,
      roughness: 0.35,
      metalness: 0.1,
    });
    const pkgMesh = new THREE.Mesh(pkgGeo, pkgMat);
    packageGroup.add(pkgMesh);

    // Gold ribbon
    const ribbonGeo = new THREE.BoxGeometry(0.49, 0.49, 0.08);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.2,
      metalness: 0.6,
    });
    packageGroup.add(new THREE.Mesh(ribbonGeo, ribbonMat));
    packageGroup.position.set(0.1, 0.95, -0.4);
    packageGroup.rotation.set(0.5, 0.6, 0.2);
    group.add(packageGroup);

    // Mouse parallax tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.35;
      targetRotationX = -y * 0.25;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Responsive resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // IntersectionObserver to pause rendering when scrolled out of view
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getElapsedTime();

      // Smooth camera / group rotation with mouse interpolation
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.04;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.04;

      // Gentle floating buoyancy
      riserGroup.position.y = -0.4 + Math.sin(delta * 1.2) * 0.04;
      headphoneGroup.position.y = 0.6 + Math.cos(delta * 1.5) * 0.06;
      headphoneGroup.rotation.y += 0.008;

      planterGroup.position.y = 0.5 + Math.sin(delta * 1.4 + 1) * 0.05;
      planterGroup.rotation.y += 0.006;

      packageGroup.position.y = 0.95 + Math.cos(delta * 1.8 + 2) * 0.07;
      packageGroup.rotation.x += 0.01;
      packageGroup.rotation.y += 0.012;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      // Clean up geometries and materials
      renderer.dispose();
      riserGeo.dispose();
      bambooMat.dispose();
      steelMat.dispose();
      earCupGeo.dispose();
      earCupMat.dispose();
      potGeo.dispose();
      potMat.dispose();
      plantMat.dispose();
      pkgGeo.dispose();
      pkgMat.dispose();
      ribbonGeo.dispose();
      ribbonMat.dispose();

      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [isReducedMotion]);

  if (!hasWebGL || isReducedMotion) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-teal-900/10 via-slate-900/10 to-amber-900/10 rounded-3xl border border-teal-500/20 p-8">
        <img
          src="/images/hero/hero-banner.svg"
          alt="Bazario Marketplace 3D Showcase"
          className="max-h-[380px] w-auto object-contain filter drop-shadow-xl"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[420px] lg:min-h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      aria-label="Interactive 3D Marketplace Showcase (Move mouse to interact)"
    >
      <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700/60 text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
        <span>Interactive 3D &bull; Move cursor</span>
      </div>
    </div>
  );
}
