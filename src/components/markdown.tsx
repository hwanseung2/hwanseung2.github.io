import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";
import Link from "next/link";

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-3xl font-bold mt-8 mb-4 text-white" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white" {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className="text-xl font-bold mt-6 mb-3 text-white" {...props} />
        ),
        h4: ({ ...props }) => (
          <h4 className="text-lg font-bold mt-6 mb-3 text-white" {...props} />
        ),
        p: ({ ...props }) => (
          <p className="my-4 text-gray-300 leading-relaxed" {...props} />
        ),
        a: ({ href, ...props }) => (
          <Link
            href={href || "#"}
            className="text-cyan-400 hover:underline"
            {...props}
          />
        ),
        ul: ({ ...props }) => (
          <ul className="my-4 ml-6 list-disc text-gray-300" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="my-4 ml-6 list-decimal text-gray-300" {...props} />
        ),
        li: ({ ...props }) => <li className="my-1" {...props} />,
        blockquote: ({ ...props }) => (
          <blockquote
            className="border-l-4 border-cyan-500 pl-4 my-4 italic text-gray-400"
            {...props}
          />
        ),
        img: ({ src, alt }) => (
          <div className="my-6">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt || ""}
              width={800}
              height={450}
              className="rounded-lg"
            />
            {alt && (
              <p className="text-sm text-gray-500 mt-2 text-center">{alt}</p>
            )}
          </div>
        ),
        code: ({
          inline,
          className,
          children,
          ...props
        }: {
          inline?: boolean;
          className?: string;
          children?: React.ReactNode;
        }) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={atomDark}
              language={match[1]}
              PreTag="div"
              className="rounded-md my-6"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className="bg-gray-800 px-1.5 py-0.5 rounded text-sm text-cyan-300"
              {...props}
            >
              {children}
            </code>
          );
        },
        table: ({ ...props }) => (
          <div className="overflow-x-auto my-6">
            <table
              className="w-full border-collapse text-gray-300"
              {...props}
            />
          </div>
        ),
        thead: ({ ...props }) => <thead className="bg-gray-800" {...props} />,
        th: ({ ...props }) => (
          <th className="px-4 py-2 text-left font-semibold" {...props} />
        ),
        td: ({ ...props }) => (
          <td className="border-t border-gray-700 px-4 py-2" {...props} />
        ),
        hr: ({ ...props }) => (
          <hr className="my-8 border-gray-700" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
