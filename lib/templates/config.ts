/**
 * Template configs derived from the official Excel templates:
 * - Külföldi: kulfoldi-kikuldetesi-utalvany-minta (I. Kiküldetési utasítás, II. Felvett előlegek, III. Költségelszámolás)
 * - Belföldi: belfoldi-kikuldetesi-utal (Kiküldetési rendelvény - hivatali, üzleti utazás költségtérités)
 */

export type TemplateId = 'kulfoldi' | 'belfoldi'

export interface TemplateMeta {
  id: TemplateId
  title: string
  subtitle?: string
  /** Download filename for the Excel minta */
  excelFilename: string
  /** Section titles as in the Excel (for UI / PDF) */
  sections: Record<string, string>
  /** Field labels keyed by form field name */
  labels: Record<string, string>
}

/** Külföldi kiküldetési utasítás és költségelszámolás (Excel: KiküldetésiRendelvény) */
export const kulfoldiTemplate: TemplateMeta = {
  id: 'kulfoldi',
  title: 'Külföldi kiküldetés',
  subtitle: 'Külföldi kiküldetési utasítás és költségelszámolás',
  excelFilename: 'kulfoldi-minta.xls',
  sections: {
    main: 'I. Kiküldetési utasítás',
    advances: '2. Felvett előlegek',
    repayments: '3. Visszafizetések',
    summary: 'II. Elszámolások összesítése és érvényesítés',
    costs: 'III. Költségelszámolás',
    travelDetails: '7. Indulási, érkezési, határátlépési adatok',
    perdiem: '8. Napidíj elszámolás',
    accommodation: '9. Szállásköltség elszámolása',
    otherCosts: '10. Dologi kiadások',
  },
  labels: {
    employerName: 'A kiküldő / A kiküldött munkáltatója',
    employeeName: 'A kiküldött neve',
    employeePosition: 'Beosztása',
    purposeText: 'A kiküldetés célja',
    issuedDate: 'Az engedély kelte',
    orderNumber: 'Sorszám',
    orderedByName: 'A kiküldetést engedélyező megnevezése',
    perdiemEligible: 'Milyen módozatú napidíj jár',
    otherCostPercent: 'Dologi kiadás %',
    travelModeOut: 'Az utazás módja oda',
    travelModeBack: 'Az utazás módja vissza',
    country: 'A kiküldetés helye és időtartama – ország',
    cityOrViszonylat: 'Város / viszonylat',
    days: 'Napok száma',
    startDate: 'Kiküldetés kezdő dátuma',
    endDate: 'Kiküldetés záró dátuma',
    localTravelEligible: 'Helyközi utazásra jogosult',
    orderedBySignature: 'A kiküldetést elrendelő aláírása',
    // Felvett előlegek
    advanceDocNo: 'A bizonylat sorszáma',
    advanceDate: 'kelte',
    advancePlace: 'kiállításának helye',
    advanceMethod: 'A felvét módja',
    advanceCurrency: 'A valuta neme',
    advanceAmount: 'összege',
    advanceForintRate: 'árfolyama (devizapótlékkal)',
    // Költségtételek
    costFlight: 'Utazási költségek (repülőjegy)',
    costFlight1: 'Utazási költségek (repülőjegy)',
    costFlight2: 'Utazási költségek (repülőjegy)',
    costAccommodation: 'Szállásköltség',
    costAccommodation1: 'Szállásköltség',
    costAccommodation2: 'Szállásköltség',
    costOther: 'Dologi kiadások',
    costOther1: 'Dologi kiadások',
    costOther2: 'Dologi kiadások',
    attachmentsCount: 'Mellékletek száma',
    notesAuto: 'Egyéb feljegyzések',
  },
}

/** Belföldi kiküldetési rendelvény (Excel: Kiküldetési rendelvény) */
export const belfoldiTemplate: TemplateMeta = {
  id: 'belfoldi',
  title: 'Belföldi kiküldetés',
  subtitle: 'Hivatali, üzleti utazás költségtérités',
  excelFilename: 'belfoldi-minta.xls',
  sections: {
    main: 'A munkáltató és a munkavállaló',
    vehicle: 'Jármű / üzemanyag',
    trips: 'A kiküldetés, külszolgálat',
    totals: 'Összesen',
  },
  labels: {
    employerName: 'A munkáltató neve',
    employerAddress: 'Címe',
    employerTaxNumber: 'Adószáma',
    employeeName: 'A munkavállaló neve',
    employeeAddress: 'Lakcíme',
    employeeBirthPlaceDate: 'Születési helye, ideje',
    employeeMotherName: 'Anyja neve',
    employeeTaxId: 'Adóazonosító jele',
    employeePosition: 'Beosztás',
    days: 'Napok száma',
    year: 'év',
    month: 'hó',
    orderNumber: 'Sorszám',
    purposeText: 'Célja',
    issuedDate: 'Kelt',
    startDate: 'Kiküldetés kezdő dátuma',
    endDate: 'Kiküldetés záró dátuma',
    travelMode: 'Utazás módja',
    orderedByName: 'A kiküldetést elrendelő',
    // Jármű
    plateNumber: 'Forgalmi rendszám, típus',
    fuelType: 'Üzemanyag típusa',
    engineCc: 'Hengerűrtartalom (cm³)',
    fuelPricePerLiter: 'Üzemanyagár (Ft/liter)',
    consumptionNorm: 'Fogyasztási norma (liter/100 km)',
    amortPerKm: 'Amort. (Ft/km)',
    // Útsorok
    tripDate: 'Dátuma',
    tripFrom: 'Honnan',
    tripTo: 'Hova',
    tripPurpose: 'Célja',
    tripDistanceKm: 'Futásteljesítmény (km)',
    tripFuelCost: 'Üzemanyag költség (Ft)',
    tripAmortCost: 'Amortizációs költség (Ft)',
    tripPerdiem: 'Élelmezési költségtérítés – napidíj (Ft)',
    costTotal: 'Költségtérítés mindösszesen',
    costSummary: 'Költségtételek',
    attachmentsCount: 'Mellékletek',
    notesAuto: 'Egyéb megjegyzés',
  },
}

export const templateList: TemplateMeta[] = [kulfoldiTemplate, belfoldiTemplate]

export function getTemplate(id: TemplateId): TemplateMeta {
  return id === 'kulfoldi' ? kulfoldiTemplate : belfoldiTemplate
}
