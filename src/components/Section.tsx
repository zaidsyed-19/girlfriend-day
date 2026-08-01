import React from "react";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className="min-h-screen flex flex-col justify-center items-center px-6 py-24"
    >
      <div className="w-full max-w-5xl mx-auto text-center">
        {title && (
          <h2 className="text-5xl md:text-7xl font-extrabold text-pink-600 leading-tight mb-4">
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="text-lg md:text-xl text-gray-500 mb-12">{subtitle}</p>
        )}

        {children}
      </div>
    </section>
  );
}
