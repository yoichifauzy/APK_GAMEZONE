import { useEffect, useState } from "react";
import "../styles/loading.css";

export default function LoadingScreen({ onLoadComplete }) {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");

  // Generate random particles once
  const [particles] = useState(() =>
    Array.from({ length: 30 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
    }))
  );

  useEffect(() => {
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(dotsInterval);
          setTimeout(() => onLoadComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, [onLoadComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-particles">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="loading-particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="loading-content">
        <div className="loading-logo">
          <div className="logo-hexagon">
            <i className="fa-solid fa-gamepad"></i>
          </div>
          <div className="logo-rings">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
          </div>
        </div>

        <h1 className="loading-title">
          GAMER<span className="text-gradient">ZONE</span>
        </h1>

        <p className="loading-subtitle">
          Preparing Your Gaming Experience{dots}
        </p>

        <div className="loading-bar-container">
          <div className="loading-bar">
            <div
              className="loading-bar-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="loading-bar-glow"></div>
            </div>
          </div>
          <span className="loading-percentage">{Math.floor(progress)}%</span>
        </div>

        <div className="loading-tips">
          <i className="fa-solid fa-lightbulb"></i>
          <span>Tip: Dapatkan free shipping untuk pembelian di atas 500K!</span>
        </div>
      </div>

      <div className="loading-footer">
        <div className="loading-icons">
          <i className="fa-solid fa-keyboard"></i>
          <i className="fa-solid fa-computer-mouse"></i>
          <i className="fa-solid fa-headphones"></i>
          <i className="fa-solid fa-desktop"></i>
        </div>
      </div>
    </div>
  );
}
