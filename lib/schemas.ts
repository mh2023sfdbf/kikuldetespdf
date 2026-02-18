/**
 * Unified schemas for Belföldi and Külföldi kiküldetés PDF generation.
 * NAV-safe: all required fields and validations; no official NAV approval claimed.
 */

import { z } from 'zod'

export const currencyEnum = z.enum(['HUF', 'EUR', 'USD', 'GBP'])

// —— Common fields (both belföldi and külföldi) ——
export const commonFieldsSchema = z.object({
  employerName: z.string().min(1, 'A munkáltató neve kötelező'),
  employerAddress: z.string().optional().default(''),
  employerTaxNumber: z.string().optional().default(''),
  employeeName: z.string().min(1, 'A munkavállaló neve kötelező'),
  employeePosition: z.string().min(1, 'Beosztás kötelező'),
  employeeAddress: z.string().optional().default(''),
  employeeBirthPlaceDate: z.string().optional().default(''),
  employeeMotherName: z.string().optional().default(''),
  employeeTaxId: z.string().optional().default(''),
  purposeText: z.string().min(1, 'Kiküldetés célja kötelező'),
  issuedDate: z.string().min(1, 'Kelt / engedély kelte kötelező'),
  orderNumber: z.string().optional().default(''),
  orderedByName: z.string().default(''),
  signatures: z.object({
    orderedBySignature: z.string().optional(), // base64 PNG
    employeeSignature: z.string().optional(),
  }),
  attachmentsCount: z.number().int().min(0, 'Mellékletek száma nem lehet negatív'),
  notesAuto: z.string().optional(), // auto-generated "Egyéb feljegyzések"
})

// —— Foreign (Külföldi) ——
const flightTicketItem = z.object({
  docNo: z.string(),
  place: z.string(),
  date: z.string(),
  legalTitle: z.string(),
  currency: currencyEnum,
  amount: z.number().nonnegative(),
})

const accommodationItem = z.object({
  docNo: z.string(),
  viszonylat: z.string(),
  from: z.string(),
  to: z.string(),
  currency: currencyEnum,
  amountTotal: z.number().nonnegative(),
})

const otherCostItem = z.object({
  docNo: z.string(),
  place: z.string(),
  date: z.string(),
  legalTitle: z.string(),
  currency: currencyEnum,
  amount: z.number().nonnegative(),
})

export const foreignTripSchema = z
  .object({
    ...commonFieldsSchema.shape,
    country: z.string().min(1, 'Ország kötelező'),
    cityOrViszonylat: z.string().optional().default(''),
    startDate: z.string().min(1, 'Kezdő dátum kötelező'),
    endDate: z.string().min(1, 'Záró dátum kötelező'),
    days: z.number().int().positive().optional(),
    travelModeOut: z.string().min(1, 'Utazás módja oda kötelező'),
    travelModeBack: z.string().min(1, 'Utazás módja vissza kötelező'),
    localTravelEligible: z.boolean().default(false),
    perdiemEligible: z.boolean().default(false),
    perdiemCurrency: currencyEnum.optional(),
    perdiemPerDay: z.number().nonnegative().optional(),
    perdiemTotal: z.number().nonnegative().optional(),
    costs: z.object({
      flightTickets: z.array(flightTicketItem).default([]),
      accommodation: z.array(accommodationItem).default([]),
      otherCosts: z.array(otherCostItem).default([]),
    }),
  })
  .superRefine((val, ctx) => {
    const start = new Date(val.startDate)
    const end = new Date(val.endDate)
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['startDate'], message: 'Érvényes dátumot adjon meg' })
      return
    }
    if (end < start) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['endDate'], message: 'A záró dátum nem lehet korábbi a kezdőnél' })
    }
    const issued = new Date(val.issuedDate)
    if (!isNaN(issued.getTime()) && issued > start) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['issuedDate'], message: 'A kelt nem lehet későbbi a kiküldetés kezdete után' })
    }
    if (val.perdiemEligible && (!val.perdiemPerDay || val.perdiemPerDay <= 0)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['perdiemPerDay'], message: 'Napidíj esetén adja meg a napi összeget' })
    }
  })

export type ForeignTripData = z.infer<typeof foreignTripSchema>

// Belföldi útsor (Excel: Dátuma, Honnan, Hova, Célja, Futásteljesítmény, Üzemanyag, Amort., Napidíj)
const domesticTripRowSchema = z.object({
  date: z.string(),
  from: z.string(),
  to: z.string(),
  purpose: z.string(),
  distanceKm: z.number().nonnegative().optional(),
  fuelCost: z.number().nonnegative().optional(),
  amortCost: z.number().nonnegative().optional(),
  perdiemAmount: z.number().nonnegative().optional(),
})

// —— Domestic (Belföldi) ——
export const domesticTripSchema = z
  .object({
    ...commonFieldsSchema.shape,
    cityOrViszonylat: z.string().min(1, 'Város / viszonylat kötelező'),
    startDate: z.string().min(1, 'Kezdő dátum kötelező'),
    endDate: z.string().min(1, 'Záró dátum kötelező'),
    days: z.number().int().positive().optional(),
    travelMode: z.string().min(1, 'Utazás módja kötelező'),
    // Jármű (Excel: Forgalmi rendszám, Üzemanyag típusa, Hengerűrtart., Fogyasztási norma, stb.)
    plateNumber: z.string().optional().default(''),
    fuelType: z.string().optional().default(''),
    engineCc: z.number().optional(),
    fuelPricePerLiter: z.number().optional(),
    consumptionNorm: z.number().optional(),
    amortPerKm: z.number().optional(),
    kmStart: z.number().optional(),
    kmEnd: z.number().optional(),
    distanceKm: z.number().nonnegative().optional(),
    perdiemEligible: z.boolean().default(false),
    perdiemPerDay: z.number().nonnegative().optional(),
    perdiemTotal: z.number().nonnegative().optional(),
    tripRows: z.array(domesticTripRowSchema).optional().default([]),
    costs: z.object({
      items: z.array(z.object({
        docNo: z.string(),
        description: z.string(),
        currency: currencyEnum,
        amount: z.number().nonnegative(),
      })).default([]),
    }).default({ items: [] }),
  })
  .superRefine((val, ctx) => {
    const start = new Date(val.startDate)
    const end = new Date(val.endDate)
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['startDate'], message: 'Érvényes dátumot adjon meg' })
      return
    }
    if (end < start) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['endDate'], message: 'A záró dátum nem lehet korábbi a kezdőnél' })
    }
    const issued = new Date(val.issuedDate)
    if (!isNaN(issued.getTime()) && issued > start) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['issuedDate'], message: 'A kelt nem lehet későbbi a kiküldetés kezdete után' })
    }
  })

export type DomesticTripData = z.infer<typeof domesticTripSchema>

// —— API payload: type + payload ——
export const apiPdfBodySchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('kulfoldi'), payload: foreignTripSchema }),
  z.object({ type: z.literal('belfoldi'), payload: domesticTripSchema }),
])

export type ApiPdfBody = z.infer<typeof apiPdfBodySchema>

// —— Helpers: compute days and auto notes ——
function computeDays(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const ms = 24 * 60 * 60 * 1000
  return Math.max(1, Math.round((end.getTime() - start.getTime()) / ms) + 1)
}

export function computeForeignDerived(data: ForeignTripData): ForeignTripData {
  const days = computeDays(data.startDate, data.endDate)
  const perdiemTotal = data.perdiemEligible && data.perdiemPerDay
    ? Number((data.perdiemPerDay * days).toFixed(2))
    : undefined

  const { flightTickets, accommodation, otherCosts } = data.costs
  const hasFlight = flightTickets.length > 0
  const hasAccommodation = accommodation.length > 0
  const hasOther = otherCosts.length > 0
  const onlyFlight = hasFlight && !hasAccommodation && !hasOther && !data.perdiemEligible
  const onlyAccommodation = hasAccommodation && !hasFlight && !hasOther && !data.perdiemEligible

  let notesAuto = data.notesAuto
  if (!notesAuto?.trim()) {
    if (!hasFlight && !hasAccommodation && !hasOther) {
      notesAuto = 'A kiküldetéshez kapcsolódóan költségelszámolás nem történt.'
    } else if (onlyFlight) {
      notesAuto = 'A kiküldetés során kizárólag a repülőjegy költsége került elszámolásra, szállás-, napidíj- és egyéb költség nem merült fel.'
    } else if (onlyAccommodation) {
      notesAuto = 'A kiküldetés során kizárólag szállásköltség került elszámolásra, napidíj és egyéb költség nem merült fel.'
    } else {
      notesAuto = 'A kiküldetéshez kapcsolódó költségek a mellékelt bizonylatok alapján kerültek elszámolásra.'
    }
  }

  return {
    ...data,
    days,
    perdiemTotal,
    notesAuto,
  }
}

export function computeDomesticDerived(data: DomesticTripData): DomesticTripData {
  const days = computeDays(data.startDate, data.endDate)
  const perdiemTotal = data.perdiemEligible && data.perdiemPerDay
    ? Number((data.perdiemPerDay * days).toFixed(2))
    : undefined

  let notesAuto = data.notesAuto
  if (!notesAuto?.trim()) {
    const hasCosts = data.costs?.items?.length ? data.costs.items.length > 0 : false
    notesAuto = hasCosts
      ? 'A belföldi kiküldetés költségei a mellékelt bizonylatok alapján kerültek elszámolásra.'
      : 'A belföldi kiküldetéshez kapcsolódóan költségelszámolás nem történt.'
  }

  return {
    ...data,
    days,
    perdiemTotal,
    notesAuto,
  }
}
