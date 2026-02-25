"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Constants ████████████████████████████████████████████████████████████████
const SOFIA_URL =
    "https://ais-pre-vym5ovkvxxtd436maskprc-77562320371.europe-west1.run.app";

const AUTO_TRIGGER_MS = 45_000;
const SCROLL_TRIGGER_PCT = 0.70;
const TOOLTIP_DURATION_MS = 5_000;

// ─── Types ████████████████████████████████████████████████████████████████████
type WidgetState = "hidden" | "pill" | "expanded" | "minimized";

// ─── Speaking dots animation (3 bars wave) ────────────────────────────────────
const SpeakingDots = () => (
    <span className="sofia-speak-dots" aria-hidden="true">
        {[0, 1, 2].map((i) => (
            <span
                key={i}
                className="sofia-speak-dot"
                style={{ animationDelay: `${i * 0.18}s` }}
            />
        ))}
    </span>
);

// ─── Component ████████████████████████████████████████████████████████████████
export const SofiaVoiceWidget: React.FC = () => {
    const [state, setState] = useState<WidgetState>("hidden");
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [dismissed, setDismissed] = useState(false);   // exit-intent / auto-trigger already showed
    const [speaking, setSpeaking] = useState(false);

    const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ── Responsive check ────────────────────────────────────────────────────────
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // ── Show pill after mount ────────────────────────────────────────────────────
    useEffect(() => {
        const t = setTimeout(() => setState("pill"), 2000);
        return () => clearTimeout(t);
    }, []);

    // ── Simulate speaking pulse (cosmetic only) ──────────────────────────────────
    useEffect(() => {
        if (state !== "expanded") return;
        const t = setTimeout(() => setSpeaking(true), 1200);
        return () => clearTimeout(t);
    }, [state]);

    useEffect(() => {
        if (state !== "expanded") setSpeaking(false);
    }, [state]);

    // ── Smart triggers ───────────────────────────────────────────────────────────
    const showTooltip = useCallback(() => {
        if (dismissed || state === "expanded") return;
        setTooltipVisible(true);
        if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
        tooltipTimerRef.current = setTimeout(() => {
            setTooltipVisible(false);
        }, TOOLTIP_DURATION_MS);
    }, [dismissed, state]);

    // 45-second auto trigger
    useEffect(() => {
        if (state === "expanded" || dismissed) return;
        autoTimerRef.current = setTimeout(() => {
            showTooltip();
        }, AUTO_TRIGGER_MS);
        return () => {
            if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
        };
    }, [state, dismissed, showTooltip]);

    // 70% scroll trigger
    useEffect(() => {
        const onScroll = () => {
            if (dismissed || state === "expanded") return;
            const scrolled =
                window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            if (scrolled >= SCROLL_TRIGGER_PCT) {
                showTooltip();
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [dismissed, state, showTooltip]);

    // Exit-intent (mouse toward top of viewport)
    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (dismissed || state === "expanded") return;
            if (e.clientY < 40) {
                showTooltip();
            }
        };
        document.addEventListener("mousemove", onMouseMove);
        return () => document.removeEventListener("mousemove", onMouseMove);
    }, [dismissed, state, showTooltip]);

    // ── Handlers ─────────────────────────────────────────────────────────────────
    const openWidget = useCallback(() => {
        setTooltipVisible(false);
        setState("expanded");
        if (!iframeLoaded) setIframeLoaded(true);
    }, [iframeLoaded]);

    const minimize = useCallback(() => setState("pill"), []);

    const close = useCallback(() => {
        setState("pill");
        setDismissed(true);
        setTooltipVisible(false);
    }, []);

    const dismissTooltip = useCallback(() => {
        setTooltipVisible(false);
        setDismissed(true);
    }, []);

    const isExpanded = state === "expanded";

    // ── Animation variants ───────────────────────────────────────────────────────
    const panelVariants = {
        hidden: {
            opacity: 0,
            y: 24,
            scale: 0.96,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring" as const, stiffness: 380, damping: 28 },
        },
        exit: {
            opacity: 0,
            y: 20,
            scale: 0.96,
            transition: { duration: 0.2 },
        },
    };

    const mobileSheetVariants = {
        hidden: { y: "100%" },
        visible: {
            y: 0,
            transition: { type: "spring" as const, stiffness: 340, damping: 32 },
        },
        exit: {
            y: "100%",
            transition: { duration: 0.25 },
        },
    };

    if (state === "hidden") return null;

    return (
        <>
            {/* ── Global keyframe styles ── */}
            <style>{`
        .sofia-pulse-ring {
          position: absolute;
          inset: -6px;
          border-radius: 9999px;
          background: rgba(0, 198, 255, 0.35);
          animation: sofia-pulse 2s ease-out infinite;
        }
        @keyframes sofia-pulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .sofia-online-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #00FF87;
          animation: sofia-dot-pulse 2.4s ease infinite;
        }
        @keyframes sofia-dot-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,135,0.5); }
          50%       { box-shadow: 0 0 0 5px rgba(0,255,135,0); }
        }
        .sofia-speak-dots {
          display: inline-flex;
          align-items: flex-end;
          gap: 3px;
          height: 14px;
          margin-left: 6px;
        }
        .sofia-speak-dot {
          width: 3px;
          border-radius: 2px;
          background: #00C6FF;
          animation: sofia-speak 0.9s ease-in-out infinite;
          height: 6px;
        }
        .sofia-speak-dot:nth-child(2) { height: 10px; }
        .sofia-speak-dot:nth-child(3) { height: 7px; }
        @keyframes sofia-speak {
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
          50%       { transform: scaleY(1);   opacity: 1; }
        }
        .sofia-avatar-ring {
          animation: sofia-avatar-pulse 2s ease infinite;
        }
        @keyframes sofia-avatar-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,198,255,0.5); }
          50%       { box-shadow: 0 0 0 6px rgba(0,198,255,0); }
        }
      `}</style>

            {/* ── Mobile backdrop ── */}
            <AnimatePresence>
                {isExpanded && isMobile && (
                    <motion.div
                        key="sofia-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={minimize}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.6)",
                            backdropFilter: "blur(4px)",
                            zIndex: 99996,
                        }}
                    />
                )}
            </AnimatePresence>

            {/* ── Expanded panel (DESKTOP) ── */}
            <AnimatePresence>
                {isExpanded && !isMobile && (
                    <motion.div
                        key="sofia-panel"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            position: "fixed",
                            bottom: "100px",
                            right: "24px",
                            width: "380px",
                            height: "620px",
                            borderRadius: "20px",
                            background: "#0A1628",
                            border: "1px solid rgba(0,198,255,0.2)",
                            boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            zIndex: 99998,
                        }}
                    >
                        <WidgetHeader speaking={speaking} onMinimize={minimize} onClose={close} />
                        <div style={{ flex: 1, position: "relative" }}>
                            {iframeLoaded && (
                                <iframe
                                    src={SOFIA_URL}
                                    allow="microphone; autoplay; clipboard-write"
                                    title="Sofia — Trustiify Growth Engine"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        border: "none",
                                        background: "#09090b",
                                        display: "block",
                                    }}
                                />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Expanded panel (MOBILE — full screen bottom sheet) ── */}
            <AnimatePresence>
                {isExpanded && isMobile && (
                    <motion.div
                        key="sofia-mobile-sheet"
                        variants={mobileSheetVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "#0A1628",
                            display: "flex",
                            flexDirection: "column",
                            zIndex: 99999,
                        }}
                    >
                        <WidgetHeader speaking={speaking} onMinimize={minimize} onClose={close} mobile />
                        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                            {iframeLoaded && (
                                <iframe
                                    src={SOFIA_URL}
                                    allow="microphone; autoplay; clipboard-write"
                                    title="Sofia — Trustiify Growth Engine"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        border: "none",
                                        background: "#09090b",
                                        display: "block",
                                    }}
                                />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Tooltip / auto-trigger message ── */}
            <AnimatePresence>
                {tooltipVisible && !isExpanded && (
                    <motion.div
                        key="sofia-tooltip"
                        initial={{ opacity: 0, y: 8, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.94 }}
                        transition={{ duration: 0.22 }}
                        style={{
                            position: "fixed",
                            bottom: "104px",
                            right: "24px",
                            background: "#0A1628",
                            border: "1px solid rgba(0,198,255,0.25)",
                            borderRadius: "14px",
                            padding: "12px 16px",
                            maxWidth: "240px",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                            zIndex: 99997,
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                        }}
                    >
                        <span style={{ fontSize: "18px", lineHeight: 1.2 }}>👋</span>
                        <div style={{ flex: 1 }}>
                            <p style={{
                                margin: 0,
                                fontSize: "13px",
                                color: "#E2E8F0",
                                lineHeight: 1.5,
                                fontWeight: 500,
                            }}>
                                Hi! I&apos;m Sofia. Let me help you scale your revenue.
                            </p>
                        </div>
                        <button
                            onClick={dismissTooltip}
                            aria-label="Dismiss"
                            style={{
                                background: "none",
                                border: "none",
                                color: "rgba(255,255,255,0.4)",
                                cursor: "pointer",
                                fontSize: "14px",
                                padding: "0 0 0 4px",
                                lineHeight: 1,
                                flexShrink: 0,
                            }}
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Floating Pill Button ── */}
            {!isExpanded && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        position: "fixed",
                        bottom: "32px",
                        right: "24px",
                        zIndex: 99997,
                    }}
                >
                    {/* Pulse ring */}
                    <span className="sofia-pulse-ring" aria-hidden="true" />

                    <motion.button
                        onClick={openWidget}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        aria-label="Talk to Sofia — Free Strategy Call"
                        style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "0 22px",
                            height: "56px",
                            borderRadius: "9999px",
                            background: "linear-gradient(135deg, #00C6FF 0%, #0084FF 100%)",
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 8px 32px rgba(0,198,255,0.45)",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <span style={{ fontSize: "20px", lineHeight: 1 }}>🎙️</span>
                        <span
                            style={{
                                color: "#0A1628",
                                fontWeight: 700,
                                fontSize: isMobile ? "13px" : "15px",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            {isMobile ? "Talk to Sofia" : "Talk to Sofia — Free Strategy Call"}
                        </span>
                    </motion.button>
                </motion.div>
            )}
        </>
    );
};

// ─── Widget Header ████████████████████████████████████████████████████████████
interface HeaderProps {
    speaking: boolean;
    onMinimize: () => void;
    onClose: () => void;
    mobile?: boolean;
}

function WidgetHeader({ speaking, onMinimize, onClose, mobile = false }: HeaderProps) {
    const btnSize = mobile ? 44 : 32;

    return (
        <div
            style={{
                height: mobile ? "72px" : "64px",
                flexShrink: 0,
                background: "linear-gradient(135deg, #0A1628 0%, #0D2040 100%)",
                borderBottom: "1px solid rgba(0,198,255,0.12)",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                gap: "12px",
            }}
        >
            {/* Sofia avatar */}
            <div
                className="sofia-avatar-ring"
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #00C6FF 0%, #0084FF 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    flexShrink: 0,
                    position: "relative",
                }}
            >
                🤖
                {/* Online dot */}
                <span
                    className="sofia-online-dot"
                    style={{
                        position: "absolute",
                        bottom: 1,
                        right: 1,
                        border: "2px solid #0A1628",
                    }}
                />
            </div>

            {/* Name / subtitle */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                }}>
                    <span style={{
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "#FFFFFF",
                        letterSpacing: "-0.01em",
                    }}>
                        Sofia
                    </span>
                    {speaking && <SpeakingDots />}
                </div>
                <span style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#00C6FF",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                }}>
                    Growth Engine • Trustiify
                </span>
            </div>

            {/* Control buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {/* Minimize */}
                <button
                    onClick={onMinimize}
                    aria-label="Minimize"
                    style={{
                        width: btnSize,
                        height: btnSize,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.7)",
                        cursor: "pointer",
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 300,
                        lineHeight: 1,
                        transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                >
                    —
                </button>
                {/* Close */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    style={{
                        width: btnSize,
                        height: btnSize,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.7)",
                        cursor: "pointer",
                        fontSize: mobile ? "16px" : "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(239,68,68,0.2)";
                        e.currentTarget.style.color = "#F87171";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                    }}
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
