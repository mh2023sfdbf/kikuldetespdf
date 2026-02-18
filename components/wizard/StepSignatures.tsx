'use client'

import { UseFormRegister } from 'react-hook-form'
import { useRef } from 'react'
import { Input } from '@/components/ui/Input'

export function StepSignatures({
  register,
  setValue,
  errors,
}: {
  register: UseFormRegister<Record<string, unknown>>
  setValue: (name: string, value: unknown) => void
  errors: Record<string, unknown>
}) {
  const employeeRef = useRef<HTMLInputElement>(null)
  const orderedByRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, field: 'employeeSignature' | 'orderedBySignature') => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setValue(`signatures.${field}`, reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      <Input
        label="Mellékletek száma (db)"
        type="number"
        min={0}
        {...register('attachmentsCount', { valueAsNumber: true, min: 0 })}
        error={(errors.attachmentsCount as { message?: string } | undefined)?.message}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-900">
            Munkavállaló aláírása (képes fájl)
          </label>
          <input
            ref={employeeRef}
            type="file"
            accept="image/png,image/jpeg"
            className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-lg file:border-[3px] file:border-neutral-900 file:bg-pop file:text-neutral-900 file:px-4 file:py-2 file:font-medium"
            onChange={(e) => handleFile(e, 'employeeSignature')}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-900">
            Kiküldetést elrendelő aláírása (képes fájl)
          </label>
          <input
            ref={orderedByRef}
            type="file"
            accept="image/png,image/jpeg"
            className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-lg file:border-[3px] file:border-neutral-900 file:bg-pop file:text-neutral-900 file:px-4 file:py-2 file:font-medium"
            onChange={(e) => handleFile(e, 'orderedBySignature')}
          />
        </div>
      </div>
      <p className="text-sm text-neutral-600">
        Töltsön fel PNG vagy JPEG képet az aláírásról (pl. szkennelt aláírás). Opcionális; a PDF-ben üres aláírási mező is megjelenik.
      </p>
    </div>
  )
}
