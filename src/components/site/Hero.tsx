import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import hero from "@/assets/hero-dumbbell.png";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });
  const ry = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });

  const rotateY = useTransform(ry, [-1, 1], [-16, 16]);
  const rotateX = useTransform(rx, [-1, 1], [10, -10]);

  const productY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const productScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label="Presentación de marca"
    >
      {/* capa 1 · fondo */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_10%,oklch(0.24_0.01_260),oklch(0.13_0.005_260)_70%)]" />
        <div className="accent-glow absolute inset-0 opacity-70" />
      </motion.div>

      {/* capa 2 · palabra gigante */}
      <motion.span
        aria-hidden
        style={{ x: wordX }}
        className="pointer-events-none absolute left-0 top-[18%] -z-10 whitespace-nowrap font-display text-[22vw] leading-none text-outline opacity-60 select-none"
      >
        STRENGTH · PERFORMANCE ·
      </motion.span>

      {/* capa 3 · partículas */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {[
          { left: 12, top: 30, dur: 6 },
          { left: 78, top: 22, dur: 8 },
          { left: 64, top: 70, dur: 7 },
          { left: 30, top: 78, dur: 9 },
          { left: 88, top: 55, dur: 6 },
          { left: 45, top: 14, dur: 10 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/50"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 pt-28 md:px-8 lg:grid-cols-2 lg:pt-20">
        {/* capa 5 · texto */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] tracking-[0.22em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            ENTRENA · EVOLUCIONA · SUPERA
          </motion.p>

          <h1 className="font-display text-[13vw] leading-[0.86] sm:text-6xl lg:text-7xl xl:text-8xl">
            {["TU MEJOR VERSIÓN", "SE CONSTRUYE."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {i === 1 ? (
                    <>
                      SE <span className="text-primary">CONSTRUYE.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 max-w-md text-sm text-muted-foreground sm:text-base"
          >
            Equipamiento, accesorios y productos fitness para llevar tu entrenamiento al siguiente
            nivel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              to="/productos"
              search={{ q: "", cat: "todos" }}
              className="magnetic rounded-sm bg-primary px-7 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground shadow-[var(--shadow-accent)]"
            >
              EXPLORAR PRODUCTOS
            </Link>
            <Link
              to="/promociones"
              className="magnetic rounded-sm border border-border px-7 py-4 text-xs font-semibold tracking-[0.18em] hover:border-primary"
            >
              VER PROMOCIONES
            </Link>
          </motion.div>
        </motion.div>

        {/* capa 4 · producto flotante */}
        <motion.div
          style={{ y: productY, scale: productScale }}
          className="relative z-0 mx-auto w-full max-w-lg [perspective:1200px]"
        >
          <motion.div
            style={{ rotateX, rotateY }}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="[transform-style:preserve-3d]"
          >
            <img
              src={hero}
              alt="Mancuerna hexagonal premium GijuSport"
              width={1200}
              height={1200}
              className="w-full drop-shadow-[0_60px_60px_rgba(0,0,0,0.75)]"
            />
          </motion.div>
          <div
            aria-hidden
            className="mx-auto mt-[-6%] h-8 w-2/3 rounded-[100%] bg-black/60 blur-2xl"
          />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-muted-foreground md:bottom-8"
        aria-hidden
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
