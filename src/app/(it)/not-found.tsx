import type { Metadata } from "next";
import { NotFound } from "@/components/sections/NotFound";
import { getContent } from "@/lib/content";

const { ui } = getContent("it");

export const metadata: Metadata = {
  title: ui.notFoundTitle,
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return <NotFound locale="it" />;
}
