import { useEffect, useRef, useState } from "react";

import bracketImage from "../../assets/bracket.png";
import guitarImage from "../../assets/guitar.png";
import meImage from "../../assets/me.png";
import microscopeImage from "../../assets/microscope.png";
import { TransitionAnchor } from "@/components/layout/transition-anchor";
import { Card, CardContent } from "@/components/ui/card";
import { roleLinks } from "@/data/site-content";
import { useDocumentTitle } from "@/hooks/use-document-title";

type Position = {
  x: number;
  y: number;
};

const MAX_OFFSET = 8;
const MAX_DISTANCE = 300;
const HOVER_SCALE = 1.1;
const LERP = 0.12;

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

export function LandingPage() {
  useDocumentTitle("anjie");

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const currentRef = useRef<Position>({ x: 0, y: 0 });
  const targetRef = useRef<Position>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [isExploded, setIsExploded] = useState(false);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [avatarPosition, setAvatarPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const animate = () => {
      currentRef.current = {
        x: lerp(currentRef.current.x, targetRef.current.x, LERP),
        y: lerp(currentRef.current.y, targetRef.current.y, LERP),
      };

      setAvatarPosition(currentRef.current);

      const closeToTarget =
        Math.abs(currentRef.current.x - targetRef.current.x) <= 0.1 &&
        Math.abs(currentRef.current.y - targetRef.current.y) <= 0.1;

      if (!closeToTarget || isHoveringAvatar) {
        animationFrameRef.current = window.requestAnimationFrame(animate);
      } else {
        currentRef.current = { x: 0, y: 0 };
        setAvatarPosition({ x: 0, y: 0 });
        animationFrameRef.current = null;
      }
    };

    const shouldAnimate = isHoveringAvatar || avatarPosition.x !== 0 || avatarPosition.y !== 0;

    if (shouldAnimate && animationFrameRef.current === null) {
      animationFrameRef.current = window.requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [avatarPosition.x, avatarPosition.y, isHoveringAvatar]);

  const handleAvatarMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const factor = Math.min(distance / MAX_DISTANCE, 1);

    targetRef.current = {
      x: (deltaX / (distance || 1)) * MAX_OFFSET * factor,
      y: (deltaY / (distance || 1)) * MAX_OFFSET * factor,
    };
  };

  const handleAvatarLeave = () => {
    setIsHoveringAvatar(false);
    targetRef.current = { x: 0, y: 0 };
  };

  const shadowOpacity = isHoveringAvatar ? 0.22 : 0.18;
  const shadowBlur = isHoveringAvatar ? 6 : 4;
  const shadowTransform = `translate(${-avatarPosition.x * 0.6}px, ${
    -avatarPosition.y * 0.6 + (isHoveringAvatar ? 4 : 2)
  }px) scale(${isHoveringAvatar ? 1.02 : 1})`;

  return (
    <div className="page landing">
      <div className="landing-content">
        <div
          ref={wrapRef}
          className="landing-avatar-wrap"
          onClick={() => setIsExploded(true)}
          onMouseEnter={() => setIsHoveringAvatar(true)}
          onMouseLeave={handleAvatarLeave}
          onMouseMove={handleAvatarMouseMove}
        >
          <img
            src={bracketImage}
            alt=""
            aria-hidden="true"
            className={`hidden-object ${isExploded ? "explode" : ""}`}
            id="obj-bracket"
          />
          <img
            src={guitarImage}
            alt=""
            aria-hidden="true"
            className={`hidden-object ${isExploded ? "explode" : ""}`}
            id="obj-guitar"
          />
          <img
            src={microscopeImage}
            alt=""
            aria-hidden="true"
            className={`hidden-object ${isExploded ? "explode" : ""}`}
            id="obj-microscope"
          />
          <img
            src={meImage}
            alt="Enamel pin of Anjie"
            className="landing-avatar"
            style={{
              transform: `translate(${avatarPosition.x}px, ${avatarPosition.y}px) scale(${
                isHoveringAvatar ? HOVER_SCALE : 1
              })`,
            }}
          />
          <div className="landing-avatar-shadow" style={{ transform: shadowTransform }}>
            <img
              src={meImage}
              alt=""
              aria-hidden="true"
              style={{ filter: `brightness(0) opacity(${shadowOpacity}) blur(${shadowBlur}px)` }}
            />
          </div>
        </div>

        <h1 className="landing-title">hellooo, i&apos;m anjie</h1>
        <p className="landing-subtitle">
          <b className="daniel-hover">daniel</b> also works! and i&apos;m a{" "}
          <span className={`role-ellipsis ${hoveredRole ? "active" : ""}`}>{hoveredRole ?? "..."}</span>
        </p>

        <Card className="overflow-hidden border-border bg-transparent shadow-none">
          <CardContent className="p-0">
            <div className="role-list">
              {roleLinks.map((roleLink) => (
                <TransitionAnchor
                  key={roleLink.href}
                  to={roleLink.href}
                  direction="forward"
                  className="role-link"
                  onMouseEnter={() => setHoveredRole(roleLink.roleLabel)}
                  onMouseLeave={() => setHoveredRole(null)}
                >
                  <span className="role-link-icon">{roleLink.emoji}</span>
                  <span className="role-link-text">{roleLink.label}</span>
                  <span className="role-link-arrow">›</span>
                </TransitionAnchor>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
