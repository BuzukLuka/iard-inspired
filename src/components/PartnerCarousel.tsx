"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const logos = [
  "/partners.png",
  "/partners.png",
  "/partners.png",
  "/partners.png",
  "/partners.png",
  "/partners.png",
];

export default function PartnerCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-6">
        {logos.map((src, i) => (
          <div key={i} className="shrink-0" style={{ width: 220 }}>
            <Image
              src={src}
              alt={`Partner ${i + 1}`}
              width={220}
              height={70}
              className="rounded-xl border border-black/10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
