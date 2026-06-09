import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeLogisticsSceneProps {
  scrollPercent: number;
}

export default function ThreeLogisticsScene({ scrollPercent }: ThreeLogisticsSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverText, setHoverText] = useState("Hover to interact with our global logistics network");
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // 1. Initialize Scene, Camera, and Renderer
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.015); // Fog blending with slate-950

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    // 2. Add Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xf97316, 2.5); // Warm orange
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x1e3a8a, 2.0); // Navy Blue
    directionalLight2.position.set(-5, -5, 5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xffffff, 3, 20);
    pointLight.position.set(0, 0, 8);
    scene.add(pointLight);

    // 3. Create a representation of a stylized futuristic Logistics Truck/Container Mesh
    // Rig body (metallic dark navy)
    const truckGroup = new THREE.Group();

    const cabGeo = new THREE.BoxGeometry(2.2, 1.8, 1.8);
    const cabMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.1,
      metalness: 0.8,
    });
    const cab = new THREE.Mesh(cabGeo, cabMat);
    cab.position.set(2.0, 0.3, 0);
    truckGroup.add(cab);

    // Freight container (brushed silver steel with glowing neon orange edge stripes)
    const containerGeo = new THREE.BoxGeometry(4.8, 2.2, 1.9);
    const containerMat = new THREE.MeshStandardMaterial({
      color: 0xf3f4f6,
      roughness: 0.3,
      metalness: 0.9,
    });
    const containerCargo = new THREE.Mesh(containerGeo, containerMat);
    containerCargo.position.set(-1.5, 0.5, 0);
    truckGroup.add(containerCargo);

    // Cargo stripes (Neon Orange trim representing speed/efficiency)
    const stripeGeo = new THREE.BoxGeometry(4.7, 0.15, 1.95);
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const stripeL = new THREE.Mesh(stripeGeo, stripeMat);
    stripeL.position.set(-1.5, 0.4, 0.05);
    truckGroup.add(stripeL);

    // Wheels
    const tireGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 16);
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 });
    
    const wheelPositions = [
      { x: 1.8, y: -0.7, z: 0.9 },
      { x: 1.8, y: -0.7, z: -0.9 },
      { x: -0.8, y: -0.7, z: 0.9 },
      { x: -0.8, y: -0.7, z: -0.9 },
      { x: -2.8, y: -0.7, z: 0.9 },
      { x: -2.8, y: -0.7, z: -0.9 },
    ];

    wheelPositions.forEach((pos) => {
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.rotation.x = Math.PI / 2;
      tire.position.set(pos.x, pos.y, pos.z);
      truckGroup.add(tire);
    });

    scene.add(truckGroup);

    // 4. Create a Global Connections Particle Globe (Logistics routes network)
    const particleCount = 150;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Generate random positions mapped on a grid or path networks
    for (let i = 0; i < particleCount; i++) {
      // Create a web of logistics hub connection wires
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 6 + Math.random() * 8; // Sphere envelope surrounding the truck

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * THREE.MathUtils.clamp(Math.cos(phi), -0.6, 0.6);

      // Gradient color: orange dots & blue dots
      const isOrange = Math.random() > 0.4;
      colors[i * 3] = isOrange ? 0.97 : 0.11; // R
      colors[i * 3 + 1] = isOrange ? 0.45 : 0.22; // G
      colors[i * 3 + 2] = isOrange ? 0.08 : 0.54; // B
    }

    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle sprite / material
    const particlesMat = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // 5. Build dynamic logistics path lines (glowing lines)
    const lineGroup = new THREE.Group();
    for (let j = 0; j < 8; j++) {
      const points = [];
      const startX = -10 + Math.random() * 5;
      const startY = -4 + Math.random() * 8;
      const startZ = -5 + Math.random() * 10;
      
      points.push(new THREE.Vector3(startX, startY, startZ));
      points.push(new THREE.Vector3(startX + 8, startY + (Math.random() * 4 - 2), startZ + (Math.random() * 4 - 2)));
      points.push(new THREE.Vector3(startX + 16, startY + (Math.random() * 6 - 3), startZ + (Math.random() * 6 - 3)));

      const pathCurve = new THREE.CatmullRomCurve3(points);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pathCurve.getPoints(50));
      const lineMat = new THREE.LineBasicMaterial({
        color: j % 2 === 0 ? 0xf97316 : 0x2563eb,
        transparent: true,
        opacity: 0.35,
      });
      const pathLine = new THREE.Line(lineGeo, lineMat);
      lineGroup.add(pathLine);
    }
    scene.add(lineGroup);

    // Mouse coordinates tracker
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      
      // Normalized coordinates
      mouseX = (localX / width) * 2 - 1;
      mouseY = -(localY / height) * 2 + 1;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // 6. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Slow dynamic float rotation of truck model based on scroll & elapsed time
      truckGroup.rotation.y = elapsedTime * 0.15 + (scrollPercent * Math.PI * 0.8);
      truckGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.08 + (scrollPercent * 0.2);
      truckGroup.rotation.z = Math.cos(elapsedTime * 0.3) * 0.04;

      // Make the truck bob gently (simulating road suspension or futuristic cruise)
      truckGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.25;

      // Slow orbital spin of connection particles
      particleSystem.rotation.y = -elapsedTime * 0.04;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      // Flow lines spin subtly
      lineGroup.rotation.z = elapsedTime * 0.02;

      // Smooth mouse follow interaction (Dampened camera drift)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 12;
      camera.position.y = targetY * 12;
      camera.lookAt(0, 0, 0);

      // Perform camera zoom adjustments depending on scroll depth
      camera.position.z = 15 - (scrollPercent * 4);

      renderer.render(scene, camera);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const currentWidth = container.clientWidth;
      const currentHeight = container.clientHeight;

      camera.aspect = currentWidth / currentHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(currentWidth, currentHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanups
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      
      // Clear geometry/materials memory
      cabGeo.dispose();
      cabMat.dispose();
      containerGeo.dispose();
      containerMat.dispose();
      stripeGeo.dispose();
      stripeMat.dispose();
      tireGeo.dispose();
      tireMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
    };
  }, [scrollPercent]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[350px] md:h-[450px] bg-slate-900/40 rounded-2xl border border-slate-800 backdrop-blur-md overflow-hidden group cursor-grab active:cursor-grabbing"
      id="3d-network-container"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      
      {/* HUD overlay simulating state tech mapping (aesthetic architectural touches) */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-400 space-y-1 bg-slate-950/80 p-3 rounded-lg border border-slate-800 backdrop-blur pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
          <span className="text-orange-400 font-semibold uppercase">Live System Orbit</span>
        </div>
        <div>Ankur Logistics CA HQ</div>
        <div>Coordinates: 37.3688° N • 122.0363° W</div>
        <div>Telemetry Zoom: <span className="text-orange-400 font-bold">{(15 - scrollPercent * 4).toFixed(1)}z</span></div>
      </div>

      <div className="absolute bottom-4 right-4 bg-slate-950/80 border border-slate-800 p-2 text-[11px] text-slate-300 font-mono rounded pointer-events-none backdrop-blur max-w-xs transition-opacity duration-300">
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-sky-400 rounded-full"></span>
          Use mouse position & scroll to coordinate routing lines.
        </p>
      </div>

      <div className="absolute bottom-4 left-4 font-mono text-[11px] text-orange-400 pointer-events-none bg-slate-950/70 py-1 px-2.5 rounded-full border border-orange-500/30 backdrop-blur shadow">
        System Node Status: Secure
      </div>
    </div>
  );
}
