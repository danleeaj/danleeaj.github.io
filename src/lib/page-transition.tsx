import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";

type TransitionDirection = "forward" | "back";
type TransitionPhase = "idle" | "entering" | "exiting";

type TransitionState = {
  direction: TransitionDirection;
  phase: TransitionPhase;
  navigateWithTransition: (to: string, direction?: TransitionDirection) => void;
};

const EXIT_DURATION_MS = 250;
const ENTER_DURATION_MS = 350;

const PageTransitionContext = createContext<TransitionState | null>(null);

export function PageTransitionProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();
  const firstRenderRef = useRef(true);
  const exitTimeoutRef = useRef<number | null>(null);
  const enterTimeoutRef = useRef<number | null>(null);
  const [direction, setDirection] = useState<TransitionDirection>("forward");
  const [phase, setPhase] = useState<TransitionPhase>("idle");

  const navigateWithTransition = useCallback(
    (to: string, nextDirection: TransitionDirection = "forward") => {
      if (phase === "exiting" || to === location.pathname) {
        return;
      }

      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current);
      }

      setDirection(nextDirection);
      setPhase("exiting");

      exitTimeoutRef.current = window.setTimeout(() => {
        navigate(to, { state: { transitionDirection: nextDirection } });
      }, EXIT_DURATION_MS);
    },
    [location.pathname, navigate, phase],
  );

  useEffect(() => {
    const state = location.state as { transitionDirection?: TransitionDirection } | null;

    if (state?.transitionDirection) {
      setDirection(state.transitionDirection);
    } else if (!firstRenderRef.current && navigationType === "POP") {
      setDirection("back");
    }

    if (enterTimeoutRef.current) {
      window.clearTimeout(enterTimeoutRef.current);
    }

    const skipInitialAnimation = firstRenderRef.current && location.pathname === "/";

    if (skipInitialAnimation) {
      firstRenderRef.current = false;
      setPhase("idle");
      return;
    }

    setPhase("entering");
    enterTimeoutRef.current = window.setTimeout(() => {
      setPhase("idle");
    }, ENTER_DURATION_MS);

    firstRenderRef.current = false;

    return () => {
      if (enterTimeoutRef.current) {
        window.clearTimeout(enterTimeoutRef.current);
      }
    };
  }, [location.key, location.pathname, location.state, navigationType]);

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current);
      }

      if (enterTimeoutRef.current) {
        window.clearTimeout(enterTimeoutRef.current);
      }
    };
  }, []);

  const value = useMemo<TransitionState>(
    () => ({
      direction,
      phase,
      navigateWithTransition,
    }),
    [direction, navigateWithTransition, phase],
  );

  return <PageTransitionContext.Provider value={value}>{children}</PageTransitionContext.Provider>;
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }

  return context;
}
