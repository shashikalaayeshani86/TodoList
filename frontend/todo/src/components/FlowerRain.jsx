export const FlowerRain = () => {
  const flowersCount = 30;
  const emojis = ['🌸', '🌺', '🍃', '🍂', '🦋', '🐦', '🌼', '💐', '🌷'];


  const flowers = Array.from({ length: 50 }).map((_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 10 + Math.random() * 5;
    const size = 1 + Math.random() * 1.5; // Smaller size

    return (
      <span
        key={i}
        className="absolute select-none animate-fall"
        style={{
          left: `${left}%`,
          top: '-2rem',
          fontSize: `${size}rem`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      >
        {emojis[Math.floor(Math.random() * emojis.length)]}
      </span>
    );
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {flowers}
    </div>
  );
};
