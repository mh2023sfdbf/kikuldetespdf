'use client'

import { UseFormRegister, FieldErrors, Control, useWatch } from 'react-hook-form'
import { Input } from '@/components/ui/Input'

type TripType = 'kulfoldi' | 'belfoldi'

export function StepTravel({
  tripType,
  register,
  errors,
  control,
}: {
  tripType: TripType
  register: UseFormRegister<Record<string, unknown>>
  errors: FieldErrors<Record<string, unknown>>
  control: Control<Record<string, unknown>>
}) {
  const startDate = useWatch({ control, name: 'startDate' })
  const issuedDate = useWatch({ control, name: 'issuedDate' })

  const navHint =
    issuedDate &&
    startDate &&
    new Date(issuedDate as string) > new Date(startDate as string) ? (
      <p className="text-amber-600 text-sm mt-2">NAV tipp: A kelt nem lehet későbbi a kiküldetés kezdete után.</p>
    ) : null

  if (tripType === 'belfoldi') {
    return (
      <div className="space-y-4">
        <Input
          label="Város / viszonylat"
          {...register('cityOrViszonylat', { required: 'Kötelező' })}
          error={errors.cityOrViszonylat?.message as string}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Kezdő dátum" type="date" {...register('startDate', { required: 'Kötelező' })} error={errors.startDate?.message as string} />
          <Input label="Záró dátum" type="date" {...register('endDate', { required: 'Kötelező' })} error={errors.endDate?.message as string} />
        </div>
        <Input
          label="Utazás módja (pl. vonat, autó, repülő)"
          {...register('travelMode', { required: 'Kötelező' })}
          error={errors.travelMode?.message as string}
        />
        {navHint}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Input
        label="Ország"
        {...register('country', { required: 'Kötelező' })}
        error={errors.country?.message as string}
      />
      <Input label="Város / viszonylat (opcionális)" {...register('cityOrViszonylat')} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Kezdő dátum" type="date" {...register('startDate', { required: 'Kötelező' })} error={errors.startDate?.message as string} />
        <Input label="Záró dátum" type="date" {...register('endDate', { required: 'Kötelező' })} error={errors.endDate?.message as string} />
      </div>
      <Input
        label="Utazás módja oda"
        {...register('travelModeOut', { required: 'Kötelező' })}
        error={errors.travelModeOut?.message as string}
      />
      <Input
        label="Utazás módja vissza"
        {...register('travelModeBack', { required: 'Kötelező' })}
        error={errors.travelModeBack?.message as string}
      />
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('localTravelEligible')} className="rounded border-[3px] border-neutral-900 text-pop focus:ring-pop" />
        <span className="text-sm text-neutral-900">Helyközi utazásra jogosult</span>
      </label>
      {navHint}
    </div>
  )
}
