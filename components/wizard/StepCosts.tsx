'use client'

import { UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

type TripType = 'kulfoldi' | 'belfoldi'

type FieldArrayId = { id: string } & Record<string, unknown>

export function StepCostsForeign({
  register,
  flightIds,
  appendFlight,
  removeFlight,
  accommodationIds,
  appendAccommodation,
  removeAccommodation,
  otherIds,
  appendOther,
  removeOther,
  flightEnabled,
  accommodationEnabled,
  otherEnabled,
}: {
  register: UseFormRegister<Record<string, unknown>>
  flightIds: FieldArrayId[]
  appendFlight: (value: unknown) => void
  removeFlight: (index: number) => void
  accommodationIds: FieldArrayId[]
  appendAccommodation: (value: unknown) => void
  removeAccommodation: (index: number) => void
  otherIds: FieldArrayId[]
  appendOther: (value: unknown) => void
  removeOther: (index: number) => void
  flightEnabled: boolean
  accommodationEnabled: boolean
  otherEnabled: boolean
}) {
  return (
    <div className="space-y-6">
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('costFlightToggle')} className="rounded border-[3px] border-neutral-900 text-pop focus:ring-pop" />
        <span className="text-neutral-900">Repülőjegyeket számolok el</span>
      </label>
      {flightEnabled && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-neutral-900">Repülőjegyek</h4>
            <Button type="button" variant="ghost" onClick={() => appendFlight({ docNo: '', place: '', date: '', legalTitle: '', currency: 'EUR', amount: 0 })}>
              + Hozzáad
            </Button>
          </div>
          {flightIds.map((_, i) => (
            <div key={_.id} className="glass-card p-4 mb-2 flex flex-wrap gap-2 items-end">
              <Input label="Bizonylatszám" {...register(`costs.flightTickets.${i}.docNo`)} className="flex-1 min-w-[100px]" />
              <Input label="Hely" {...register(`costs.flightTickets.${i}.place`)} className="flex-1 min-w-[100px]" />
              <Input label="Dátum" type="date" {...register(`costs.flightTickets.${i}.date`)} className="w-36" />
              <Input label="Jogcím" {...register(`costs.flightTickets.${i}.legalTitle`)} className="flex-1 min-w-[120px]" />
              <select {...register(`costs.flightTickets.${i}.currency`)} className="w-20 rounded-lg border px-2 py-2">
                <option value="HUF">HUF</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
              <Input label="Összeg" type="number" min={0} {...register(`costs.flightTickets.${i}.amount`, { valueAsNumber: true })} className="w-28" />
              <Button type="button" variant="ghost" onClick={() => removeFlight(i)}>Eltávolít</Button>
            </div>
          ))}
        </section>
      )}
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('costAccommodationToggle')} className="rounded border-[3px] border-neutral-900 text-pop focus:ring-pop" />
        <span className="text-neutral-900">Szállásköltséget számolok el</span>
      </label>
      {accommodationEnabled && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-neutral-900">Szállásköltségek</h4>
            <Button type="button" variant="ghost" onClick={() => appendAccommodation({ docNo: '', viszonylat: '', from: '', to: '', currency: 'EUR', amountTotal: 0 })}>
              + Hozzáad
            </Button>
          </div>
          {accommodationIds.map((_, i) => (
            <div key={_.id} className="glass-card p-4 mb-2 flex flex-wrap gap-2 items-end">
              <Input label="Bizonylatszám" {...register(`costs.accommodation.${i}.docNo`)} className="w-28" />
              <Input label="Viszonylat" {...register(`costs.accommodation.${i}.viszonylat`)} className="flex-1 min-w-[100px]" />
              <Input label="Honnan" {...register(`costs.accommodation.${i}.from`)} className="w-28" />
              <Input label="Meddig" {...register(`costs.accommodation.${i}.to`)} className="w-28" />
              <select {...register(`costs.accommodation.${i}.currency`)} className="w-20 rounded-lg border px-2 py-2">
                <option value="HUF">HUF</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
              <Input label="Összeg" type="number" min={0} {...register(`costs.accommodation.${i}.amountTotal`, { valueAsNumber: true })} className="w-28" />
              <Button type="button" variant="ghost" onClick={() => removeAccommodation(i)}>Eltávolít</Button>
            </div>
          ))}
        </section>
      )}
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('costOtherToggle')} className="rounded border-[3px] border-neutral-900 text-pop focus:ring-pop" />
        <span className="text-neutral-900">Egyéb (dologi) kiadást számolok el</span>
      </label>
      {otherEnabled && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-neutral-900">Egyéb (dologi) kiadások</h4>
            <Button type="button" variant="ghost" onClick={() => appendOther({ docNo: '', place: '', date: '', legalTitle: '', currency: 'HUF', amount: 0 })}>
              + Hozzáad
            </Button>
          </div>
          {otherIds.map((_, i) => (
            <div key={_.id} className="glass-card p-4 mb-2 flex flex-wrap gap-2 items-end">
              <Input label="Bizonylatszám" {...register(`costs.otherCosts.${i}.docNo`)} className="w-28" />
              <Input label="Hely" {...register(`costs.otherCosts.${i}.place`)} className="w-28" />
              <Input label="Dátum" type="date" {...register(`costs.otherCosts.${i}.date`)} className="w-36" />
              <Input label="Jogcím" {...register(`costs.otherCosts.${i}.legalTitle`)} className="flex-1 min-w-[100px]" />
              <select {...register(`costs.otherCosts.${i}.currency`)} className="w-20 rounded-lg border px-2 py-2">
                <option value="HUF">HUF</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
              <Input label="Összeg" type="number" min={0} {...register(`costs.otherCosts.${i}.amount`, { valueAsNumber: true })} className="w-28" />
              <Button type="button" variant="ghost" onClick={() => removeOther(i)}>Eltávolít</Button>
            </div>
          ))}
        </section>
      )}
      {!flightEnabled && !accommodationEnabled && !otherEnabled && (
        <p className="text-neutral-600 text-sm">Nincs költség kategória kiválasztva. A következő lépésben jelölje be a mellékletek számát; a PDF-ben az „Egyéb feljegyzések” ennek megfelelően jelenik meg.</p>
      )}
    </div>
  )
}

export function StepCostsDomestic({
  register,
  itemIds,
  appendItem,
  removeItem,
}: {
  register: UseFormRegister<Record<string, unknown>>
  itemIds: FieldArrayId[]
  appendItem: (value: unknown) => void
  removeItem: (index: number) => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-neutral-900">Költségtételek</h4>
        <Button type="button" variant="ghost" onClick={() => appendItem({ docNo: '', description: '', currency: 'HUF', amount: 0 })}>
          + Hozzáad
        </Button>
      </div>
      {itemIds.map((_, i) => (
        <div key={_.id} className="glass-card p-4 flex flex-wrap gap-2 items-end">
          <Input label="Bizonylatszám" {...register(`costs.items.${i}.docNo`)} className="w-28" />
          <Input label="Megnevezés" {...register(`costs.items.${i}.description`)} className="flex-1 min-w-[150px]" />
          <select {...register(`costs.items.${i}.currency`)} className="w-20 rounded-lg border px-2 py-2">
            <option value="HUF">HUF</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
          <Input label="Összeg" type="number" min={0} {...register(`costs.items.${i}.amount`, { valueAsNumber: true })} className="w-28" />
          <Button type="button" variant="ghost" onClick={() => removeItem(i)}>Eltávolít</Button>
        </div>
      ))}
    </div>
  )
}
