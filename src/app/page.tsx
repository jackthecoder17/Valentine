"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

// Floating hearts component
const FloatingHearts = () => {
  const hearts = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 10,
    size: 15 + Math.random() * 25,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400/60"
          style={{
            left: `${heart.x}%`,
            fontSize: heart.size,
          }}
          initial={{ y: "100vh", opacity: 0, rotate: 0 }}
          animate={{
            y: "-100vh",
            opacity: [0, 1, 1, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          💕
        </motion.div>
      ))}
    </div>
  );
};

// Sparkle component
const Sparkles = () => {
  const sparkles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    size: 4 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-gradient-to-r from-pink-300 to-rose-300"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Rose petals falling
const RosePetals = () => {
  const petals = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 12 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute text-3xl"
          style={{ left: `${petal.x}%` }}
          initial={{ y: "-10vh", rotate: 0, opacity: 0 }}
          animate={{
            y: "110vh",
            rotate: [0, 180, 360],
            opacity: [0, 1, 1, 0],
            x: [0, 30, -30, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🌹
        </motion.div>
      ))}
    </div>
  );
};

// Pulsing heart background
const PulsingHeartBg = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-10">
      <motion.div
        className="text-[400px] text-red-500"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ❤️
      </motion.div>
    </div>
  );
};

// Main Valentine component
export default function Home() {
  const [stage, setStage] = useState<"intro" | "question" | "chase" | "yes">("intro");
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLDivElement>(null);

  const noMessages = [
    "No 😢",
    "Are you sure? 🥺",
    "Really sure? 💔",
    "Think again! 😭",
    "Last chance! 😿",
    "Don't do this to me! 😫",
    "I'm gonna cry! 😭",
    "You're breaking my heart! 💔",
    "PLEASE!!! 🙏",
    "I'll be sad forever 😢",
  ];

  const fireConfetti = useCallback(() => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 100 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff69b4", "#ff1493", "#ff6b6b", "#ee5a5a", "#ffc0cb"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff69b4", "#ff1493", "#ff6b6b", "#ee5a5a", "#ffc0cb"],
      });
    }, 250);
  }, []);

  const fireHeartConfetti = useCallback(() => {
    const scalar = 2;
    const heart = confetti.shapeFromText({ text: "❤️", scalar });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [heart],
      scalar,
    };

    const shoot = () => {
      confetti({ ...defaults, particleCount: 30 });
      confetti({ ...defaults, particleCount: 5 });
      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
        colors: ["#ff69b4", "#ff1493"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }, []);

  useEffect(() => {
    if (stage === "yes") {
      fireConfetti();
      fireHeartConfetti();

      const interval = setInterval(() => {
        fireHeartConfetti();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [stage, fireConfetti, fireHeartConfetti]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const moveNoButton = () => {
    // Button approximate size (accounting for scale)
    const buttonWidth = 150 * noButtonScale;
    const buttonHeight = 60 * noButtonScale;
    
    // Get viewport dimensions
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Safe padding from all edges
    const padding = 40;
    
    // Calculate absolute safe bounds (top-left corner of button)
    const minLeft = padding;
    const maxLeft = vw - buttonWidth - padding;
    const minTop = padding;
    const maxTop = vh - buttonHeight - padding;
    
    // Ensure we have valid ranges
    const safeMaxLeft = Math.max(minLeft, maxLeft);
    const safeMaxTop = Math.max(minTop, maxTop);
    
    // Generate random position within safe bounds
    const newLeft = minLeft + Math.random() * (safeMaxLeft - minLeft);
    const newTop = minTop + Math.random() * (safeMaxTop - minTop);

    setNoButtonPosition({ x: newLeft, y: newTop });
    setNoClickCount((prev) => prev + 1);
    setYesButtonScale((prev) => Math.min(prev + 0.15, 2.5));
    setNoButtonScale((prev) => Math.max(prev - 0.08, 0.5));
  };

  const handleYes = () => {
    setStage("yes");
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 overflow-hidden relative"
    >
      {/* Background audio */}
      <audio ref={audioRef} src="/song.mp3" loop />

      {/* Audio toggle button */}
      <motion.button
        onClick={toggleAudio}
        className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? "🔊" : "🔇"}
      </motion.button>

      {/* Background animations */}
      <FloatingHearts />
      <Sparkles />
      <RosePetals />
      <PulsingHeartBg />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <AnimatePresence mode="wait">
          {/* INTRO STAGE */}
          {stage === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, y: -100 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-center"
            >
              <motion.div
                className="text-8xl mb-8"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                💝
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent mb-6"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Hey You! ✨
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-700 mb-8 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                I have something very special to ask you...
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Button
                  onClick={() => setStage("question")}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xl px-8 py-6 rounded-full shadow-2xl"
                >
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Click to continue 💕
                  </motion.span>
                </Button>
              </motion.div>

              {/* Decorative floating elements */}
              <motion.div
                className="absolute -top-10 -left-10 text-6xl"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 20, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🌸
              </motion.div>
              <motion.div
                className="absolute -top-10 -right-10 text-6xl"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -20, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                🦋
              </motion.div>
            </motion.div>
          )}

          {/* QUESTION STAGE */}
          {stage === "question" && (
            <motion.div
              key="question"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-center relative"
            >
              <motion.div
                className="text-9xl mb-6"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                💗
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                Will You...
              </motion.h1>

              <motion.h2
                className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 bg-clip-text text-transparent mb-12"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", bounce: 0.5 }}
              >
                Be My Valentine? 💘
              </motion.h2>

              {/* Buttons container */}
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center relative min-h-[120px]">
                <motion.div
                  animate={{ scale: yesButtonScale }}
                  transition={{ type: "spring", bounce: 0.6 }}
                >
                  <Button
                    onClick={handleYes}
                    className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-2xl px-12 py-8 rounded-full shadow-2xl"
                  >
                    <motion.span
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      Yes! 😍💖
                    </motion.span>
                  </Button>
                </motion.div>

                {noButtonPosition.x === 0 && noButtonPosition.y === 0 ? (
                  <motion.div
                    ref={noButtonRef}
                    animate={{ scale: noButtonScale }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <Button
                      onMouseEnter={moveNoButton}
                      onClick={moveNoButton}
                      onTouchStart={moveNoButton}
                      variant="outline"
                      className="bg-white/80 hover:bg-white text-gray-700 text-base sm:text-xl px-4 sm:px-8 py-3 sm:py-6 rounded-full border-2 border-gray-300 whitespace-nowrap"
                    >
                      {noMessages[Math.min(noClickCount, noMessages.length - 1)]}
                    </Button>
                  </motion.div>
                ) : null}
              </div>

              {/* No button - fixed position after first interaction */}
              {noButtonPosition.x !== 0 || noButtonPosition.y !== 0 ? (
                <motion.div
                  ref={noButtonRef}
                  className="fixed z-50"
                  animate={{
                    left: noButtonPosition.x,
                    top: noButtonPosition.y,
                    scale: noButtonScale,
                  }}
                  transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
                >
                  <Button
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                    onTouchStart={moveNoButton}
                    variant="outline"
                    className="bg-white/80 hover:bg-white text-gray-700 text-base sm:text-xl px-4 sm:px-8 py-3 sm:py-6 rounded-full border-2 border-gray-300 whitespace-nowrap shadow-lg"
                  >
                    {noMessages[Math.min(noClickCount, noMessages.length - 1)]}
                  </Button>
                </motion.div>
              ) : null}

              {noClickCount > 3 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 text-gray-600 text-lg"
                >
                  The &quot;Yes&quot; button is looking prettier, isn&apos;t it? 😏
                </motion.p>
              )}
            </motion.div>
          )}

          {/* YES STAGE - CELEBRATION! */}
          {stage === "yes" && (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring", bounce: 0.5 }}
              className="text-center"
            >
              <motion.div
                className="text-[150px] mb-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🥰
              </motion.div>

              <motion.h1
                className="text-5xl md:text-8xl font-extrabold mb-6"
                animate={{
                  color: ["#ec4899", "#f43f5e", "#ef4444", "#ec4899"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                YAY!!!
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <p className="text-3xl md:text-4xl text-gray-800 font-bold">
                  I knew you&apos;d say yes! 💕
                </p>
                <p className="text-xl md:text-2xl text-gray-600">
                  You just made me the happiest person ever! 🌹
                </p>

                <motion.div
                  className="flex justify-center gap-4 text-6xl mt-8"
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span>💑</span>
                  <span>💝</span>
                  <span>💐</span>
                </motion.div>

                <motion.p
                  className="text-2xl text-pink-600 font-semibold mt-8"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Can&apos;t wait to spend Valentine&apos;s Day with you! ❤️
                </motion.p>
              </motion.div>

              {/* Extra celebration elements */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-4xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  >
                    {["💖", "💗", "💓", "💕", "💞", "❤️", "🌹", "✨"][i % 8]}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom decorative wave */}
      <div className="fixed bottom-0 left-0 right-0 z-0 overflow-hidden">
        <svg
          className="w-full h-24 text-pink-200/50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
            animate={{
              d: [
                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
                "M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z",
                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      {/* Built by credit */}
      <motion.div
        className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 text-sm text-pink-600/70 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Built by Opedev 💖
      </motion.div>
    </main>
  );
}
