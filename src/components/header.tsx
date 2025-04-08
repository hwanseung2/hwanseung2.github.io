import Link from "next/link";
import { Search } from "lucide-react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="https://github.com/nexus-tech"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              target="_blank"
            >
              GITHUB
            </Link>
            <Link
              href="/about"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              ABOUT
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex border-cyan-700 text-cyan-400 hover:bg-cyan-950"
          >
            구독하기
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex border-gray-700 text-gray-400 hover:bg-gray-900"
          >
            채용 바로가기
          </Button>
          <button className="rounded-md p-2 text-gray-400 hover:bg-gray-800">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
