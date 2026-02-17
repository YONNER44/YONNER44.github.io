import { useEffect, useRef, useState } from "react";

interface Props {
  images: any[];
}

export default function Carrousel(props: Props) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const images = props.images;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  if (!images?.length) return null;

  useEffect(() => {
    intervalRef.current = setInterval(() => nextImage(), 6000);
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
    }, 450);
  }

  function goTo(idx: number) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    nextImage(idx);
    intervalRef.current = setInterval(() => nextImage(), 6000);
  }

  return (
    <div className="relative h-[28rem] w-full overflow-hidden rounded-2xl border border-black/10 bg-white/40 shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-black/20">
      <div className="relative flex h-full items-center justify-center overflow-hidden rounded-2xl">
        <img
          src={images[current].src}
          alt={`Imagen ${current + 1}`}
          className={`h-full w-full object-contain p-4 transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
        />

      </div>

      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 dark:border-white/15 dark:bg-black/60">
          {images.map((_, idx: number) => (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Ver imagen ${idx + 1}`}
              className={`h-2.5 w-2.5 rounded-full border border-black/25 transition-all duration-300 dark:border-white/30 ${current === idx ? "scale-110 bg-black dark:bg-white" : "bg-white/60 dark:bg-black/60"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
