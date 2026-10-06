import { notFound } from "next/navigation";

/* Cualquier ruta desconocida bajo un idioma muestra el 404 localizado. */
export default function CatchAll() {
  notFound();
}
