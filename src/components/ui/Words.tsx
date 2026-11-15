/**
 * Texto partido en palabras para animarlas con GSAP. El texto completo va
 * aparte para lectores de pantalla; la versión partida queda oculta para ellos.
 *   mask: cada palabra sube desde una máscara ([data-word] > span).
 *   fade: cada palabra es un span [data-fade-word] (p. ej. para cambiarle el color).
 */
export default function Words({ text, variant = "mask" }: { text: string; variant?: "mask" | "fade" }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(" ").map((word, i) =>
          variant === "mask" ? (
            <span key={i}>
              <span data-word className="inline-block overflow-hidden pb-[0.15em] align-bottom">
                <span className="inline-block">{word}</span>
              </span>{" "}
            </span>
          ) : (
            <span key={i}>
              <span data-fade-word>{word}</span>{" "}
            </span>
          )
        )}
      </span>
    </>
  );
}
