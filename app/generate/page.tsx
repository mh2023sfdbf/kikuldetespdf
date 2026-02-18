'use client'

import { useState } from 'react'
import { useForm, useFieldArray, type UseFormRegister, type Control, type FieldErrors } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { foreignTripSchema, domesticTripSchema, type ForeignTripData, type DomesticTripData } from '@/lib/schemas'
import { StepType } from '@/components/wizard/StepType'
import { StepBasics } from '@/components/wizard/StepBasics'
import { StepTravel } from '@/components/wizard/StepTravel'
import { StepPerdiem } from '@/components/wizard/StepPerdiem'
import { StepCostsForeign, StepCostsDomestic } from '@/components/wizard/StepCosts'
import { StepSignatures } from '@/components/wizard/StepSignatures'
import { Button } from '@/components/ui/Button'

const STEPS = [
  'Típus',
  'Alapadatok',
  'Utazás',
  'Napidíj',
  'Költségek',
  'Mellékletek és aláírások',
  'Összefoglaló',
]

const defaultCosts = {
  flightTickets: [] as Array<{ docNo: string; place: string; date: string; legalTitle: string; currency: string; amount: number }>,
  accommodation: [] as Array<{ docNo: string; viszonylat: string; from: string; to: string; currency: string; amountTotal: number }>,
  otherCosts: [] as Array<{ docNo: string; place: string; date: string; legalTitle: string; currency: string; amount: number }>,
  items: [] as Array<{ docNo: string; description: string; currency: string; amount: number }>,
}

const defaultForeign = {
  tripType: 'kulfoldi' as const,
  employerName: '',
  employerAddress: '',
  employerTaxNumber: '',
  employeeName: '',
  employeePosition: '',
  employeeAddress: '',
  employeeBirthPlaceDate: '',
  employeeMotherName: '',
  employeeTaxId: '',
  purposeText: '',
  issuedDate: '',
  orderNumber: '',
  orderedByName: '',
  signatures: {} as { orderedBySignature?: string; employeeSignature?: string },
  attachmentsCount: 0,
  country: '',
  cityOrViszonylat: '',
  startDate: '',
  endDate: '',
  travelModeOut: '',
  travelModeBack: '',
  localTravelEligible: false,
  perdiemEligible: false,
  perdiemCurrency: 'HUF' as const,
  perdiemPerDay: undefined as number | undefined,
  costFlightToggle: false,
  costAccommodationToggle: false,
  costOtherToggle: false,
  costs: defaultCosts,
}

const defaultDomestic = {
  ...defaultForeign,
  tripType: 'belfoldi' as const,
  cityOrViszonylat: '',
  travelMode: '',
  country: undefined,
  travelModeOut: undefined,
  travelModeBack: undefined,
  plateNumber: '',
  fuelType: '',
  engineCc: undefined as number | undefined,
  fuelPricePerLiter: undefined as number | undefined,
  consumptionNorm: undefined as number | undefined,
  amortPerKm: undefined as number | undefined,
  tripRows: [] as Array<{ date: string; from: string; to: string; purpose: string; distanceKm?: number; fuelCost?: number; amortCost?: number; perdiemAmount?: number }>,
  costFlightToggle: false,
  costAccommodationToggle: false,
  costOtherToggle: false,
  costs: defaultCosts,
}

export default function GeneratePage() {
  const [step, setStep] = useState(0)
  const [tripType, setTripType] = useState<'kulfoldi' | 'belfoldi'>('kulfoldi')
  const [downloading, setDownloading] = useState(false)

  const isForeign = tripType === 'kulfoldi'

  const form = useForm({
    defaultValues: { ...defaultForeign },
    mode: 'onChange',
  })

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = form

  const flightTickets = useFieldArray({ control, name: 'costs.flightTickets' })
  const accommodation = useFieldArray({ control, name: 'costs.accommodation' })
  const otherCosts = useFieldArray({ control, name: 'costs.otherCosts' })
  const costItems = useFieldArray({ control, name: 'costs.items' })

  const flightEnabled = watch('costFlightToggle')
  const accommodationEnabled = watch('costAccommodationToggle')
  const otherEnabled = watch('costOtherToggle')

  const onTypeChange = (t: 'kulfoldi' | 'belfoldi') => {
    setTripType(t)
    const defaults = t === 'kulfoldi' ? defaultForeign : defaultDomestic
    Object.keys(defaults).forEach((key) => {
      if (key === 'costs') return
      const v = (defaults as Record<string, unknown>)[key]
      if (v !== undefined) (setValue as (name: string, value: unknown) => void)(key, v)
    })
    setValue('costs', { ...defaultCosts })
  }

  const buildPayload = (): { type: 'kulfoldi' | 'belfoldi'; payload: ForeignTripData | DomesticTripData } => {
    const raw = watch()
    if (isForeign) {
      const { costs, ...rest } = raw as Record<string, unknown>
      const c = costs as Record<string, unknown>
      return {
        type: 'kulfoldi',
        payload: {
          ...rest,
          costs: { flightTickets: c?.flightTickets ?? [], accommodation: c?.accommodation ?? [], otherCosts: c?.otherCosts ?? [] },
        } as ForeignTripData,
      }
    }
    const { costs, country, travelModeOut, travelModeBack, ...rest } = raw as Record<string, unknown>
    const c = costs as Record<string, unknown>
    return {
      type: 'belfoldi',
      payload: { ...rest, costs: { items: c?.items ?? [] } } as DomesticTripData,
    }
  }

  const onDownloadPdf = async () => {
    setDownloading(true)
    try {
      const body = buildPayload()
      const schema = body.type === 'kulfoldi' ? foreignTripSchema : domesticTripSchema
      const result = schema.safeParse(body.payload)
      if (!result.success) {
        const first = result.error.flatten().fieldErrors
        const msg = Object.entries(first).map(([k, v]) => `${k}: ${(v as string[])?.[0] ?? ''}`).join(', ')
        alert(`Kérjük, töltse ki a kötelező mezőket: ${msg}`)
        return
      }
      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        const msg = err?.detail ?? err?.error ?? 'Hiba történt a PDF generálása közben.'
        alert(typeof msg === 'string' ? msg : 'Hiba történt a PDF generálása közben.')
        return
      }
      const blob = await res.blob()
      const filename = body.type === 'kulfoldi' ? 'kulfoldi-kikuldetesi-utasitas.pdf' : 'belfoldi-kikuldetesi-utasitas.pdf'
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = filename
      a.click()
      URL.revokeObjectURL(a.href)
    } finally {
      setDownloading(false)
    }
  }

  const canNext = () => {
    if (step === 0) return true
    if (step === 1) {
      const e = ['employerName', 'employeeName', 'employeePosition', 'purposeText', 'issuedDate'] as const
      return e.every((f) => !!watch(f))
    }
    if (step === 2) {
      if (isForeign) return watch('country') && watch('startDate') && watch('endDate') && watch('travelModeOut') && watch('travelModeBack')
      const w = watch as (name: string) => unknown
      return w('cityOrViszonylat') && w('startDate') && w('endDate') && w('travelMode')
    }
    return true
  }

  return (
    <div className="mx-auto max-w-2xl px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
      <div className="mb-10 sm:mb-12">
        <div className="text-body-sm text-neutral-600 mb-2">
          <span>Lépés {step + 1} / {STEPS.length}</span>
        </div>
        <div className="h-3 rounded-full bg-neutral-200 border-[3px] border-neutral-900 overflow-hidden">
          <motion.div
            className="h-full bg-pop rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <h2 className="mt-2 font-heading text-heading-2 font-medium text-neutral-900">{STEPS[step]}</h2>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="0" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <StepType value={tripType} onChange={onTypeChange} />
          </motion.div>
        )}
        {step === 1 && (
          <motion.div key="1" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <StepBasics tripType={tripType} register={register as unknown as UseFormRegister<Record<string, unknown>>} errors={errors as unknown as FieldErrors<Record<string, unknown>>} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="2" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <StepTravel tripType={tripType} register={register as unknown as UseFormRegister<Record<string, unknown>>} errors={errors as unknown as FieldErrors<Record<string, unknown>>} control={control as unknown as Control<Record<string, unknown>>} />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div key="3" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <StepPerdiem register={register as unknown as UseFormRegister<Record<string, unknown>>} errors={errors as unknown as FieldErrors<Record<string, unknown>>} control={control as unknown as Control<Record<string, unknown>>} />
          </motion.div>
        )}
        {step === 4 && (
          <motion.div key="4" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {isForeign ? (
              <StepCostsForeign
                register={register as unknown as UseFormRegister<Record<string, unknown>>}
                flightIds={flightTickets.fields}
                appendFlight={flightTickets.append as (value: unknown) => void}
                removeFlight={flightTickets.remove as (index: number) => void}
                accommodationIds={accommodation.fields}
                appendAccommodation={accommodation.append as (value: unknown) => void}
                removeAccommodation={accommodation.remove as (index: number) => void}
                otherIds={otherCosts.fields}
                appendOther={otherCosts.append as (value: unknown) => void}
                removeOther={otherCosts.remove as (index: number) => void}
                flightEnabled={flightEnabled}
                accommodationEnabled={accommodationEnabled}
                otherEnabled={otherEnabled}
              />
            ) : (
              <StepCostsDomestic
                register={register as unknown as UseFormRegister<Record<string, unknown>>}
                itemIds={costItems.fields}
                appendItem={costItems.append as (value: unknown) => void}
                removeItem={costItems.remove as (index: number) => void}
              />
            )}
          </motion.div>
        )}
        {step === 5 && (
          <motion.div key="5" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <StepSignatures register={register as unknown as UseFormRegister<Record<string, unknown>>} setValue={setValue as (name: string, value: unknown) => void} errors={errors as unknown as Record<string, unknown>} />
          </motion.div>
        )}
        {step === 6 && (
          <motion.div key="6" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <div className="glass-card p-6">
              <p className="text-neutral-700 mb-4">
                Összefoglaló: {tripType === 'kulfoldi' ? 'Külföldi' : 'Belföldi'} kiküldetés – {watch('employeeName')} – {watch('purposeText')?.slice(0, 50)}…
              </p>
              <Button type="button" onClick={onDownloadPdf} disabled={downloading}>
                {downloading ? 'Generálás…' : 'PDF letöltése'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 sm:mt-12 flex justify-between">
        <Button type="button" variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Vissza
        </Button>
        {step < 6 ? (
          <Button type="button" onClick={() => setStep((s) => Math.min(6, s + 1))} disabled={!canNext()}>
            Tovább
          </Button>
        ) : null}
      </div>
    </div>
  )
}
