"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Chunk separado, carregado só no cliente (bundle-dynamic-imports).
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Confetti() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Sem animação para quem prefere movimento reduzido.
    setShow(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Sem width/height, a lib usa o tamanho da janela, então não é
  // preciso estado nem listener de resize.
  return show ? <ReactConfetti numberOfPieces={400} recycle={false} /> : null;
}
