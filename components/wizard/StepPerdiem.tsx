'use client'

import { UseFormRegister, FieldErrors, Control, useWatch } from 'react-hook-form'
import { Input } from '@/components/ui/Input'

export function StepPerdiem({
  register,
  errors,
  control,
}: {
  register: UseFormRegister<Record<string, unknown>>
  errors: FieldErrors<Record<string, unknown>>
  control: Control<Record<string, unknown>>
}) {
  const perdiemEligible = useWatch({ control, name: 'perdiemEligible' })

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('perdiemEligible')} className="rounded border-[3px] border-neutral-900 text-pop focus:ring-pop" />
        <span className="text-neutral-900">Napidíj jár</span>
      </label>
      {Boolean(perdiemEligible) && (
        <>
          <Input
            label="Napidíj összege (napi)"
            type="number"
            min={0}
            step={1}
            {...register('perdiemPerDay', { valueAsNumber: true })}
            error={errors.perdiemPerDay?.message as string}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-900">Pénznem</label>
            <select
              {...register('perdiemCurrency')}
              className="w-full rounded-xl border-[3px] border-neutral-900 bg-white px-4 py-2.5 text-neutral-900 focus:border-pop focus:outline-none focus:ring-2 focus:ring-pop focus:ring-offset-2"
            >
              <option value="HUF">HUF</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </>
      )}
    </div>
  )
}
