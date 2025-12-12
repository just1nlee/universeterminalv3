"use client";

import Image from "next/image";
import Logo from "@/app/ui/Logo";
import { useEffect, useState } from "react";

interface HomeScreenProps {
  onNext: () => void;
}

export default function HomeScreen({ onNext }: HomeScreenProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Image
        src="/background.png"
        alt="Background"
        fill
        className="object-cover image-pixelated"
        priority
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <Logo />
      </div>

      <p className="absolute bottom-60 w-full text-center text-[1.83rem]">
        <span className={loaded ? "blink" : ""}>PRESS [ ENTER ] TO BEGIN</span>
      </p>

    </div>
  );
}

