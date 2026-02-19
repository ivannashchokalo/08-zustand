import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "404 - Page Not Found | NoteHub",
  description:
    "The page you are looking for does not exist. It may have been moved or deleted.",
  openGraph: {
    type: "website",
    title: "404 - Page Not Found | NoteHub",
    description:
      "This page does not exist. Please check the URL or return to the homepage.",
    url: "",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 Page Not Found - NoteHub",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
