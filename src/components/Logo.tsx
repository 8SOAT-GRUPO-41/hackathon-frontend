import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  // Definindo constante de cor para garantir consistência
  const primaryColor = "rgb(211, 15, 89)";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        {/* Fundo */}
        <rect width="42" height="42" rx="10" fill={primaryColor} />
        {/* Círculo central para o símbolo de vídeo */}
        <circle
          cx="21"
          cy="21"
          r="13"
          fill="white"
          fillOpacity="0.1"
          stroke="white"
          strokeWidth="1"
        />
        {/* Símbolo de processamento de vídeo - nós e conexões */}
        <circle cx="21" cy="14" r="3" fill="white" />
        <circle cx="14" cy="21" r="3" fill="white" />
        <circle cx="28" cy="21" r="3" fill="white" />
        <circle cx="21" cy="28" r="3" fill="white" />
        {/* Círculo central */}
        <circle cx="21" cy="21" r="3.5" fill="white" />
        {/* Linhas de conexão */}
        <line
          x1="21"
          y1="17"
          x2="21"
          y2="18"
          stroke="white"
          strokeWidth="1.5"
        />
        <line
          x1="17"
          y1="21"
          x2="18"
          y2="21"
          stroke="white"
          strokeWidth="1.5"
        />
        <line
          x1="24"
          y1="21"
          x2="25"
          y2="21"
          stroke="white"
          strokeWidth="1.5"
        />
        <line
          x1="21"
          y1="24"
          x2="21"
          y2="25"
          stroke="white"
          strokeWidth="1.5"
        />
        {/* Símbolos de processamento nos nós */}
        <path d="M21 13L19 15H23L21 13Z" fill={primaryColor} />{" "}
        {/* Símbolo de upload */}
        <path d="M13 21L15 19V23L13 21Z" fill={primaryColor} />{" "}
        {/* Símbolo de retroceder */}
        <path d="M29 21L27 19V23L29 21Z" fill={primaryColor} />{" "}
        {/* Símbolo de avançar */}
        <path d="M21 29L23 27H19L21 29Z" fill={primaryColor} />{" "}
        {/* Símbolo de download */}
        {/* Símbolo de processamento central - ícone de processamento */}
        <path d="M19.5 19.5H22.5V22.5H19.5V19.5Z" fill={primaryColor} />
      </svg>
      <span className="font-bold text-2xl tracking-tight text-[rgb(211,15,89)]">
        FIAP X
      </span>
    </div>
  );
}
