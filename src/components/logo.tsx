export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
        <div className="h-3 w-3 rounded-sm border-2 border-black bg-cyan-300" />
      </div>
      <span className="font-bold text-xl text-white">
        nexus<span className="text-cyan-400">tech</span>
      </span>
    </div>
  );
}
