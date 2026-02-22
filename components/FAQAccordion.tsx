'use client'

import { useState } from 'react'

export type FAQItem = { question: string; answer: string }

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-10 sm:py-16 md:py-24 bg-[var(--calm-bg)]">
      <div className="mx-auto px-0 sm:px-4 max-w-4xl">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="font-heading font-bold text-[1.375rem] sm:text-heading-1 md:text-display text-neutral-900 mb-2 sm:mb-3">
            Gyakran ismételt kérdések
          </h2>
          <p className="text-body-sm sm:text-body text-neutral-600">
            A kiküldetési PDF generátorral kapcsolatos gyakori kérdések és válaszok.
          </p>
        </div>
        <div className="space-y-0">
          {items.map(({ question, answer }, index) => (
            <div
              key={index}
              className={index < items.length - 1 ? 'border-b-3 border-neutral-900' : ''}
            >
              <div className="py-5 md:py-6">
                <button
                  type="button"
                  onClick={() => setSelected(selected === index ? null : index)}
                  className="flex items-start md:items-center justify-between w-full focus:outline-none rounded-lg text-left group"
                >
                  <span className="font-heading text-body sm:text-body-lg font-medium text-neutral-900 pr-4">
                    {question}
                  </span>
                  <span
                    className="text-neutral-900 text-xl md:text-2xl font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg group-hover:bg-pop-muted transition-colors"
                    aria-hidden
                  >
                    {selected === index ? '−' : '+'}
                  </span>
                </button>
                {selected === index && (
                  <div className="pt-2 pb-1 text-neutral-700 text-body-sm md:text-body leading-relaxed">
                    {answer}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
