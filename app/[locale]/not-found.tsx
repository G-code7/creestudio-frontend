import en from "@/src/content/en";
import es from "@/src/content/es";
import NotFoundView from "@/src/components/layout/NotFoundView";

/*
 * not-found no recibe params. El servidor pasa solo los textos del 404 en ambos
 * idiomas y el componente cliente elige según la URL (sin enviar los diccionarios enteros).
 */
export default function NotFound() {
  return <NotFoundView copy={{ es: es.notFound, en: en.notFound }} />;
}
