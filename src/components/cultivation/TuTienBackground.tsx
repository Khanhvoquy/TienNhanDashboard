'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// Component con chạy logic 3D để tránh lỗi SSR
function StarField(props: any) {
  const ref = useRef<any>();
  // Tạo 5000 điểm ngẫu nhiên trong hình cầu bán kính 2
  const sphere = random.inSphere(new Float32Array(5000), { radius: 2 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#4ade80" /* Màu xanh lục bảo */
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

interface TuTienBackgroundProps {
  disabled?: boolean;
}

export const TuTienBackground: React.FC<TuTienBackgroundProps> = ({ disabled = false }) => {
  if (disabled || typeof window === 'undefined') {
    return <div className="fixed inset-0 bg-bg-deep -z-50" />;
  }

  return (
    <div className="fixed inset-0 bg-bg-deep -z-50">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
        <Preload all />
      </Canvas>
      {/* Gradient Overlay để làm dịu nền */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep/50 to-bg-deep pointer-events-none" />
    </div>
  );
};