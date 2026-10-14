/**
 * A statement whose words light up one by one as it scrolls into view.
 * Words start in the tertiary text colour (still ≥ 5:1 contrast) so the text
 * is always readable; with Reduce Motion every word is lit immediately.
 */
export default function ScrollHighlight({
  text,
  as: Tag = "p",
  className = "",
}: {
  text: string;
  as?: "p" | "h2";
  className?: string;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <Tag className={`highlight ${className}`} data-highlight>
      {words.map((w, i) => (
        <span key={i}>
          <span className="hl-word">{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
