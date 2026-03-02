'use client'

import { useState, useRef, useEffect } from 'react'

export default function ContactModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setStatus('idle')
      setTimeout(() => nameRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      const data = new FormData(formRef.current)
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      })
      if (res.ok) {
        setStatus('sent')
        formRef.current.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/80 cursor-pointer"
        aria-label="Bezárás"
      />
      <div
        className="relative z-10 w-full max-w-md bg-white rounded-2xl border-[3px] border-neutral-900 shadow-xl p-6 sm:p-8 animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-label="Kapcsolat"
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-heading font-bold text-heading-3 text-neutral-900">Kapcsolat</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Bezárás"
          >
            <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {status === 'sent' ? (
          <div className="text-center py-6">
            <p className="text-body text-neutral-800 font-medium mb-2">Köszönjük az üzenetet!</p>
            <p className="text-body-sm text-neutral-600">Hamarosan válaszolunk.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 btn-primary text-body-sm px-6 py-2.5"
            >
              Bezárás
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Ne töltse ki: <input name="bot-field" />
              </label>
            </p>

            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-neutral-900 mb-1">Név</label>
              <input
                ref={nameRef}
                id="contact-name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border-[3px] border-neutral-900 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-pop"
                placeholder="Az Ön neve"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-900 mb-1">E-mail</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border-[3px] border-neutral-900 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-pop"
                placeholder="pelda@email.com"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-900 mb-1">Üzenet</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                className="w-full rounded-lg border-[3px] border-neutral-900 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-pop resize-none"
                placeholder="Miben segíthetünk?"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-600">Hiba történt. Kérjük, próbálja újra.</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary w-full text-body-sm py-2.5"
            >
              {status === 'sending' ? 'Küldés…' : 'Üzenet küldése'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
