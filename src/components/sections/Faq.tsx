"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { CircleMinus, CirclePlus } from "lucide-react";
import { faqImageSrc, faqPanel, faqs } from "@/lib/content";
import { whatsappHref } from "@/lib/contact";

export function Faq() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="grid w-full grid-cols-1 lg:h-full lg:grid-cols-[5fr_7fr]">
      <div className="relative order-1 flex flex-col justify-center bg-ink p-8 md:p-16 lg:order-none lg:p-20">
        {faqImageSrc ? (
          <Image
            src={faqImageSrc}
            alt="La statua di Ovidio a Sulmona"
            fill
            className="object-cover object-center brightness-[0.75] saturate-95"
          />
        ) : null}

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/65 to-ink/40"
        />

        <div className="relative flex flex-col gap-6">
          <span className="text-xs font-semibold tracking-[0.25em] text-terracotta uppercase">
            {faqPanel.eyebrow}
          </span>

          <h2 className="text-balance font-display text-3xl leading-[1.1] text-cream sm:text-4xl">
            {faqPanel.title}
          </h2>

          <p className="max-w-md text-pretty text-base leading-relaxed text-cream/70">
            {faqPanel.description}
          </p>

          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block w-fit border border-cream/40 px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-cream uppercase transition-colors duration-300 hover:bg-cream hover:text-ink"
          >
            {faqPanel.cta}
          </a>
        </div>
      </div>

      <div className="order-2 flex flex-col justify-center bg-cream-soft px-8 py-12 md:px-16 lg:order-none lg:px-20">
        <dl className="flex w-full flex-col divide-y divide-stone-light">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-${index}`;

            return (
              <div
                key={faq.question}
                className={`border-l-2 pl-4 transition-colors duration-300 ${
                  isOpen ? "border-terracotta" : "border-transparent"
                }`}
              >
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 py-3.5 text-left"
                  >
                    <span
                      className={`text-pretty text-base font-medium transition-colors duration-200 ${
                        isOpen ? "text-terracotta" : "text-ink group-hover:text-terracotta"
                      }`}
                    >
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <CircleMinus
                        className="h-5 w-5 shrink-0 text-terracotta"
                        strokeWidth={1.25}
                        aria-hidden
                      />
                    ) : (
                      <CirclePlus
                        className="h-5 w-5 shrink-0 text-stone transition-colors duration-200 group-hover:text-terracotta"
                        strokeWidth={1.25}
                        aria-hidden
                      />
                    )}
                  </button>
                </dt>

                <dd
                  id={panelId}
                  hidden={!isOpen}
                  className="pr-10 pb-5 text-sm leading-relaxed text-ink-soft"
                >
                  {faq.answer ?? (
                    <span className="text-stone italic">Risposta in arrivo.</span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
