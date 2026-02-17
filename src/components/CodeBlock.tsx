import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
  className?: string;
};

export default function CodeBlock({
  code,
  language = "ini",
  title = "Código",
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`overflow-hidden rounded-2xl border bg-white border-black/10 dark:bg-[#0b1020] dark:border-white/10 ${className}`}>
      <div className="flex items-center justify-between border-b bg-black/5 border-black/10 dark:bg-black/20 dark:border-white/10 px-4 py-2">
        <span className="text-xs font-medium text-black/70 dark:text-white/80 sm:text-sm">{title}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="h-9 px-4 rounded-2xl border-black/20 text-black hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
        >
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>

     <div className="code-scroll max-h-[360px] overflow-y-auto overflow-x-auto md:max-h-[520px]">
      <SyntaxHighlighter
        language={language}
        useInlineStyles={false}
        wrapLongLines={true}
        className="!m-0 !bg-transparent !break-words !p-4 !font-mono !text-[15px] !leading-7 text-black dark:text-white"
        codeTagProps={{ className: "font-mono" }}
      >
        {code}
      </SyntaxHighlighter>
      </div>
    </div>
  );
}
