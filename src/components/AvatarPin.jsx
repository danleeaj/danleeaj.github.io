import { useState, useCallback } from "react";
import meImg from "../assets/me.png";
import bracketImg from "../assets/bracket.png";
import guitarImg from "../assets/guitar.png";
import microscopeImg from "../assets/microscope.png";

const OBJECTS = [
  {
    id: "bracket",
    src: bracketImg,
    explode: "translate(calc(-50% - 33px), calc(-50% - 33px)) scale(0.8) rotate(-18deg)",
    rock: "peek-rock-1",
  },
  {
    id: "guitar",
    src: guitarImg,
    explode: "translate(calc(-50% + 47px), calc(-50% - 22px)) scale(0.8) rotate(15deg)",
    rock: "peek-rock-2",
  },
  {
    id: "microscope",
    src: microscopeImg,
    explode: "translate(calc(-50% + 28px), calc(-50% + 36px)) scale(0.8) rotate(30deg)",
    rock: "peek-rock-3",
  },
];

const keyframes = `
@keyframes pin-rock {
  from { transform: rotate(-15deg); }
  to   { transform: rotate(-20deg); }
}
@keyframes peek-rock-1 {
  0%   { transform: translate(calc(-50% - 33px), calc(-50% - 33px)) scale(0.8) rotate(-18deg); }
  50%  { transform: translate(calc(-50% - 34px), calc(-50% - 35px)) scale(0.82) rotate(-22deg); }
  100% { transform: translate(calc(-50% - 32px), calc(-50% - 32px)) scale(0.78) rotate(-14deg); }
}
@keyframes peek-rock-2 {
  0%   { transform: translate(calc(-50% + 47px), calc(-50% - 22px)) scale(0.8) rotate(15deg); }
  50%  { transform: translate(calc(-50% + 48px), calc(-50% - 24px)) scale(0.82) rotate(19deg); }
  100% { transform: translate(calc(-50% + 45px), calc(-50% - 20px)) scale(0.78) rotate(11deg); }
}
@keyframes peek-rock-3 {
  0%   { transform: translate(calc(-50% + 28px), calc(-50% + 36px)) scale(0.8) rotate(30deg); }
  50%  { transform: translate(calc(-50% + 30px), calc(-50% + 37px)) scale(0.82) rotate(34deg); }
  100% { transform: translate(calc(-50% + 27px), calc(-50% + 34px)) scale(0.78) rotate(26deg); }
}
`;

const hiddenObjectBase = {
  position: "absolute",
  width: 55,
  height: 55,
  objectFit: "contain",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%) scale(0.5) rotate(0deg)",
  zIndex: 0,
  opacity: 0,
  pointerEvents: "none",
  transition: "none",
  filter: "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.18))",
};

export default function AvatarPin() {
  const [exploded, setExploded] = useState(false);

  const handleClick = useCallback(() => {
    if (!exploded) setExploded(true);
  }, [exploded]);

  return (
    <>
      <style>{keyframes}</style>
      <div
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Explode avatar objects"
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } }}
        style={{
          position: "relative",
          width: 80,
          height: 80,
          cursor: "pointer",
          overflow: "visible",
          animation: "pin-rock 2s ease-in-out infinite alternate",
          flexShrink: 0,
        }}
      >
        {OBJECTS.map(obj => (
          <img
            key={obj.id}
            src={obj.src}
            alt=""
            aria-hidden="true"
            style={
              exploded
                ? {
                    ...hiddenObjectBase,
                    opacity: 1,
                    transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease",
                    transform: obj.explode,
                    animation: `${obj.rock} ${obj.id === "bracket" ? "2.5s" : obj.id === "guitar" ? "2.8s" : "2.3s"} 0.5s ease-in-out infinite alternate`,
                  }
                : hiddenObjectBase
            }
          />
        ))}
        <img
          src={meImg}
          alt="Enamel pin of Anjie"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            zIndex: 1,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -3,
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: 12,
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, transparent 70%)",
            zIndex: 0,
            borderRadius: "50%",
          }}
        >
          <img
            src={meImg}
            alt=""
            aria-hidden="true"
            style={{ display: "none" }}
          />
        </div>
      </div>
    </>
  );
}
