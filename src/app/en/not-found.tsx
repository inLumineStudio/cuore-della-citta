import type { Metadata } from "next";
import { NotFound } from "@/components/sections/NotFound";
import { getContent } from "@/lib/content";

const { ui } = getContent("en");

export const metadata: Metadata = {
  title: ui.notFoundTitle,
  robots: { index: false, follow: true },
};

export default function EnglishNotFoundPage() {
  return <NotFound locale="en" />;
}
