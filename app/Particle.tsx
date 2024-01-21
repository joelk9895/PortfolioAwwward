"use client";
import { useEffect, useRef } from "react";

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    class Particle {
      originX: number;
      originY: number;
      effect: Effect;
      x: number;
      y: number;
      ctx: CanvasRenderingContext2D;
      vx: number;
      vy: number;
      ease: number;
      friction: number;
      dx: number;
      dy: number;
      distance: number;
      force: number;
      angle: number;
      size: number;

      constructor(x: number, y: number, effect: Effect) {
        this.originX = x;
        this.originY = y;
        this.effect = effect;
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.ctx = this.effect.ctx;
        this.ctx.fillStyle = "black";
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.3;
        this.friction = 0.95;
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        this.force = 1;
        this.angle = 0;
        this.size = 2.3;
        this.draw();
      }

      draw() {
        this.ctx.beginPath();
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
      }

      update() {
        this.dx = this.effect.mouse.x - this.x;
        this.dy = this.effect.mouse.y - this.y;
        this.distance = this.dx * this.dx + this.dy * this.dy;
        this.force = (-this.effect.mouse.radius / this.distance) * 8;

        if (this.distance < this.effect.mouse.radius) {
          this.angle = Math.atan2(this.dy, this.dx);
          this.vx += this.force * Math.cos(this.angle);
          this.vy += this.force * Math.sin(this.angle);
        }

        this.x +=
          (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
        this.y +=
          (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        this.draw();
      }
    }

    class Effect {
      width: number;
      height: number;
      ctx: CanvasRenderingContext2D;
      particlesArray: Particle[];
      gap: number;
      mouse: { radius: number; x: number; y: number };

      constructor(
        width: number,
        height: number,
        context: CanvasRenderingContext2D
      ) {
        this.width = width;
        this.height = height;
        this.ctx = context;
        this.particlesArray = [];
        this.gap = 20;
        this.mouse = {
          radius: 20000,
          x: 0,
          y: 0,
        };

        window.addEventListener("mousemove", (e) => {
          this.mouse.x = e.clientX * window.devicePixelRatio;
          this.mouse.y = e.pageY * window.devicePixelRatio;
        });

        window.addEventListener("resize", () => {
          const canvas = canvasRef.current;
          if (canvas) {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            this.width = canvas.width;
            this.height = canvas.height;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            this.particlesArray = [];
            this.init();
          }
        });

        this.init();
      }

      init() {
        for (let x = 0; x < this.width; x += this.gap) {
          for (let y = 0; y < this.height; y += this.gap) {
            this.particlesArray.push(new Particle(x, y, this));
          }
        }
      }

      update() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.particlesArray.length; i++) {
          this.particlesArray[i].update();
        }
      }
    }

    let effect = new Effect(canvas.width, canvas.height, ctx);

    const animate = () => {
      effect.update();
      requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(requestAnimationFrame(animate));
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full absolute top-0 left-0 z-10 bg-white"
    />
  );
};

export default ParticleCanvas;
