import ParticleCanvas from "./Particle";

export default function Home() {
  return (
    <main>
      <div className="absolute top-0 left-0 w-full h-20 bg-white z-10 flex items-center justify-center">
        <h2 className="h-fit text-3xl">welcome</h2>
      </div>
      <ParticleCanvas />
      <div className="relative hero">
        <header>
          <h1>Joel K George</h1>
        </header>
        <p>
          Full Stack Dev
          <br />
          ML Enthusiast
        </p>
      </div>
    </main>
  );
}
