// Inline <script> that avoids React's dev warning about script tags rendered
// on the client (see "Preventing flash before hydration" in the Next.js docs).
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
