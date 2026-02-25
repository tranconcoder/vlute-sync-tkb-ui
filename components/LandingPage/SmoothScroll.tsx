import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import Snap from "lenis/snap";

function SnapIntegration() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const snap = new Snap(lenis, {
      type: 'proximity', // Proximity feels less aggressive but still snaps
      distanceThreshold: '30%', // Snaps when within 30% of viewport
      lerp: 0.1,
      duration: 0.8,
    });

    // Automatically add all sections as snap points
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      snap.addElement(section as HTMLElement);
    });

    return () => snap.destroy();
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: true,
      }}
    >
      <SnapIntegration />
      {children}
    </ReactLenis>
  );
}
