interface Certificate {
  title: string
  issuer: string
  pdfUrl: string
  category: string
}

interface Props {
  certificates: Certificate[]
}

function PdfIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10 opacity-40"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

export default function CertificateViewer({ certificates }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {certificates.map((cert, i) => (
        <a
          key={i}
          href={cert.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group text-left border border-black/10 dark:border-white/10 rounded-lg p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 no-underline"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-md group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
              <PdfIcon />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-xs text-black dark:text-white leading-snug line-clamp-2">
                  {cert.title}
                </p>
                <ArrowIcon />
              </div>
              <p className="text-xs opacity-50 mt-1">{cert.issuer}</p>
              <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full border border-black/10 dark:border-white/10 opacity-60">
                {cert.category}
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
