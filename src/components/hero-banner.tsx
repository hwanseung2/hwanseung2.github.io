export default function HeroBanner() {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] bg-gradient-to-r from-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-cyan-500/20 animate-pulse"></div>
      <div
        className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-cyan-400/10 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-blue-500/15 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="text-cyan-400">Nexus</span>Tech Blog
          </h1>
          <p className="text-xl text-gray-300">
            Exploring the frontiers of technology with insights from our
            engineering team
          </p>
        </div>
      </div>
    </div>
  );
}
