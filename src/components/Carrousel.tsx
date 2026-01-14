import { useEffect, useRef, useState } from "react";

interface Props {
  images: any[];
}

export default function Carrousel(props: Props) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const images = props.images;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => nextImage(), 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [current, images.length]);

  function nextImage(idx?: number) {
    setFade(false);
    setTimeout(() => {
      if (typeof idx === "number") {
        setCurrent(idx);
      } else {
        setCurrent((prev) => (prev + 1) % images.length);
      }
      setFade(true);
    }, 600);
  }

  function goTo(idx: number) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    nextImage(idx);
    intervalRef.current = setInterval(() => nextImage(), 5000);
  }

  return (
    <div className="relative flex items-center justify-center h-96">
    <div className="w-full flex items-center justify-center py-8">
      <img
        src={images[current].src}
        alt={`Imagen ${current + 1} DSX`}
        className={`object-contain w-full max-h-[70%] rounded-xl border transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
    <div className="flex justify-center gap-2 mt-4 absolute bottom-4 left-1/2 -translate-x-1/2">
      {images.map((_, idx: number) => (
        <button
          type="button"
          onClick={() => goTo(idx)}
          aria-label={`Ver imagen ${idx + 1}`}
          className={`w-3 h-3 rounded-full border border-black transition-colors duration-300 focus:outline-none ${current === idx ? "bg-white" : "bg-black"}`}
        />
      ))}
    </div>
  </div>
  );
}