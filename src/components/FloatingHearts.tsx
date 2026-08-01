import { Heart } from "lucide-react";

export default function FloatingHearts() {
  const hearts = [...Array(18)];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {hearts.map((_, i) => (
        <Heart
          key={i}
          className="absolute text-pink-300 opacity-20 animate-pulse"
          size={18 + Math.random() * 20}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}
