"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/content";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="FAQ" title="Domande frequenti" align="center" />

        <div className="mx-auto flex w-full max-w-2xl flex-col divide-y divide-stone-light">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-6">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl text-ink">{faq.question}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-terracotta transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-4 text-base text-ink-soft leading-relaxed">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
