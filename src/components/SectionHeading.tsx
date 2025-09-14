export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gray">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-2xl text-brand-gray">{subtitle}</p>}
    </div>
  );
}
