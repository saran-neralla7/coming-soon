import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  interactiveSpeed?: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ interactiveSpeed = 1 }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.035);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central 3D Core - Wireframe TorusKnot
    const coreGeometry = new THREE.TorusKnotGeometry(2.8, 0.85, 120, 16);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // Inner glowing sphere core
    const innerGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    mainGroup.add(innerMesh);

    // 2. Skill Orbiters (AI, Automation, ERP, FullStack)
    const orbiterGroup = new THREE.Group();
    mainGroup.add(orbiterGroup);

    const orbiters: { mesh: THREE.Mesh; angle: number; radius: number; speed: number }[] = [];

    // Orbiter 1: AI Agent Octahedron
    const aiGeo = new THREE.OctahedronGeometry(0.7, 0);
    const aiMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
    const aiMesh = new THREE.Mesh(aiGeo, aiMat);
    orbiters.push({ mesh: aiMesh, angle: 0, radius: 5.5, speed: 0.015 });
    orbiterGroup.add(aiMesh);

    // Orbiter 2: Automation Torus
    const autoGeo = new THREE.TorusGeometry(0.6, 0.25, 8, 20);
    const autoMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true });
    const autoMesh = new THREE.Mesh(autoGeo, autoMat);
    orbiters.push({ mesh: autoMesh, angle: Math.PI / 2, radius: 6.2, speed: -0.012 });
    orbiterGroup.add(autoMesh);

    // Orbiter 3: ERP Cylinder
    const erpGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.9, 12, 1, true);
    const erpMat = new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true });
    const erpMesh = new THREE.Mesh(erpGeo, erpMat);
    orbiters.push({ mesh: erpMesh, angle: Math.PI, radius: 5.8, speed: 0.018 });
    orbiterGroup.add(erpMesh);

    // Orbiter 4: Web Box
    const webGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const webMat = new THREE.MeshBasicMaterial({ color: 0x34d399, wireframe: true });
    const webMesh = new THREE.Mesh(webGeo, webMat);
    orbiters.push({ mesh: webMesh, angle: (3 * Math.PI) / 2, radius: 6.5, speed: -0.01 });
    orbiterGroup.add(webMesh);

    // 3. Particle Starfield Constellation
    const particleCount = 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x38bdf8);
    const purpleColor = new THREE.Color(0xa855f7);
    const pinkColor = new THREE.Color(0xec4899);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 55;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 55;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 45;

      const rand = Math.random();
      const mixedColor = rand < 0.4 ? cyanColor : rand < 0.8 ? purpleColor : pinkColor;
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 4. Cyber Floor Wireframe Grid
    const gridHelper = new THREE.GridHelper(60, 40, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -8;
    gridHelper.rotation.x = 0.1;
    scene.add(gridHelper);

    // Mouse Interaction Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      targetMouseX = (event.clientX - windowHalfX) * 0.0015;
      targetMouseY = (event.clientY - windowHalfY) * 0.0015;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate Main Core
      coreMesh.rotation.x = elapsedTime * 0.25 * interactiveSpeed + mouseY * 2;
      coreMesh.rotation.y = elapsedTime * 0.35 * interactiveSpeed + mouseX * 2;

      innerMesh.rotation.x = -elapsedTime * 0.4 * interactiveSpeed;
      innerMesh.rotation.y = -elapsedTime * 0.5 * interactiveSpeed;

      // Rotate Orbiters
      orbiters.forEach((orbiter) => {
        orbiter.angle += orbiter.speed * interactiveSpeed;
        orbiter.mesh.position.x = Math.cos(orbiter.angle) * orbiter.radius;
        orbiter.mesh.position.z = Math.sin(orbiter.angle) * orbiter.radius;
        orbiter.mesh.position.y = Math.sin(elapsedTime * 1.5 + orbiter.angle) * 0.8;

        orbiter.mesh.rotation.x += 0.02;
        orbiter.mesh.rotation.y += 0.02;
      });

      // Slowly rotate particle field
      particleSystem.rotation.y = elapsedTime * 0.03 * interactiveSpeed + mouseX * 0.5;
      particleSystem.rotation.x = mouseY * 0.5;

      // Animate grid
      gridHelper.position.z = (elapsedTime * 2) % 1.5 - 8;

      // Parallax camera tilt
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactiveSpeed]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
};
