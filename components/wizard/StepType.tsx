'use client'

import { motion } from 'framer-motion'
import { getTemplate, type TemplateId } from '@/lib/templates/config'

const TEMPLATE_IDS: TemplateId[] = ['belfoldi', 'kulfoldi']

export function StepType({
  value,
  onChange,
}: {
  value: TemplateId
  onChange: (t: TemplateId) => void
}) {
  return (
    <div className="space-y-4">
      <p className="text-body-sm text-neutral-600">
        Válassza ki a sablont (az Excel mintához igazodik). A kitöltött adatokból a rendszer PDF-et generál.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {TEMPLATE_IDS.map((id) => {
          const t = getTemplate(id)
          const isSelected = value === id
          return (
            <motion.div
              key={id}
              className={`glass-card flex min-h-[140px] flex-col transition-all ${
                isSelected ? 'ring-[3px] ring-pop  bg-pop-muted' : 'hover:shadow-glass-lg hover:bg-white'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <button
                type="button"
                onClick={() => onChange(id)}
                className="flex flex-1 flex-col items-center justify-center p-6 text-center"
              >
                <span className="text-3xl mb-3" aria-hidden>{id === 'belfoldi' ? '🇭🇺' : '✈️'}</span>
                <h3 className="text-lg font-medium text-neutral-900">{t.title}</h3>
                {t.subtitle && (
                  <p className="mt-1.5 text-caption text-neutral-600 leading-snug max-w-[90%]">
                    {t.subtitle}
                  </p>
                )}
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
