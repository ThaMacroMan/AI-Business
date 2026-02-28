type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const HeadingTag = as;

  return (
    <header className={`max-w-2xl ${alignment}`}>
      <p className="eyebrow">{eyebrow}</p>
      <HeadingTag className="section-title text-balance">{title}</HeadingTag>
      <p className="mt-4 text-base leading-7 text-[color:var(--muted)] sm:text-lg">
        {description}
      </p>
    </header>
  );
}
