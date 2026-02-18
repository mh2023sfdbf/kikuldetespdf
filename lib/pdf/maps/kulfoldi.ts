/**
 * Coordinate map for Külföldi PDF. Generous row spacing and padding so label+value and wrapped lines never overlap.
 */
import type { FieldMap } from '../types'
import { fromTop, MARGIN_X, CONTENT_WIDTH } from '../design'

const ROW = 28 // pt per row – fits one line + padding (LINE_HEIGHT_BODY 18 + FIELD_GAP 14)
const SECTION_I_TOP = 118
const SECTION_II_TOP = 390

export const kulfoldiFieldMap: FieldMap = {
  title: { pageIndex: 0, x: MARGIN_X, y: fromTop(52), fontSize: 16, maxWidth: CONTENT_WIDTH, align: 'center', lineHeight: 22 },

  employerName: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_I_TOP + ROW * 0), fontSize: 10, maxWidth: 320 },
  employeeName: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_I_TOP + ROW * 1), fontSize: 10, maxWidth: 320 },
  employeePosition: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_I_TOP + ROW * 2), fontSize: 10, maxWidth: 320 },
  country: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_I_TOP + ROW * 3), fontSize: 10, maxWidth: CONTENT_WIDTH },
  cityOrViszonylat: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_I_TOP + ROW * 4), fontSize: 10, maxWidth: CONTENT_WIDTH },
  startDate: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_I_TOP + ROW * 5), fontSize: 10, maxWidth: 220 },
  endDate: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_I_TOP + ROW * 6), fontSize: 10, maxWidth: 220 },
  days: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_I_TOP + ROW * 7), fontSize: 10, maxWidth: 120 },
  purposeText: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_I_TOP + ROW * 8), fontSize: 10, maxWidth: CONTENT_WIDTH, maxLines: 3 },
  travelModeOut: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_I_TOP + ROW * 12), fontSize: 10, maxWidth: 220 },
  travelModeBack: { pageIndex: 0, x: MARGIN_X + 240, y: fromTop(SECTION_I_TOP + ROW * 12), fontSize: 10, maxWidth: 250 },
  localTravelEligible: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_I_TOP + ROW * 13), fontSize: 10, maxWidth: 80 },

  costFlight1: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_II_TOP + 0), fontSize: 9, maxWidth: CONTENT_WIDTH },
  costFlight2: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_II_TOP + 22), fontSize: 9, maxWidth: CONTENT_WIDTH },
  costAccommodation1: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_II_TOP + 72), fontSize: 9, maxWidth: CONTENT_WIDTH },
  costAccommodation2: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_II_TOP + 92), fontSize: 9, maxWidth: CONTENT_WIDTH },
  perdiemLine: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_II_TOP + 142), fontSize: 9, maxWidth: CONTENT_WIDTH },
  costOther1: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_II_TOP + 192), fontSize: 9, maxWidth: CONTENT_WIDTH },
  costOther2: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_II_TOP + 212), fontSize: 9, maxWidth: CONTENT_WIDTH },

  notesAuto: { pageIndex: 0, x: MARGIN_X, y: fromTop(548), fontSize: 9, maxWidth: CONTENT_WIDTH, maxLines: 3 },
  declaration: { pageIndex: 0, x: MARGIN_X, y: fromTop(602), fontSize: 8, maxWidth: CONTENT_WIDTH },

  issuedDate: { pageIndex: 0, x: MARGIN_X, y: fromTop(678), fontSize: 10, maxWidth: 120 },
  attachmentsCount: { pageIndex: 0, x: MARGIN_X + 150, y: fromTop(678), fontSize: 10, maxWidth: 60 },
  orderedByName: { pageIndex: 0, x: MARGIN_X, y: fromTop(700), fontSize: 9, maxWidth: 250 },

  employeeSignature: { pageIndex: 0, x: MARGIN_X, y: fromTop(788), fontSize: 8, maxWidth: 180 },
  orderedBySignature: { pageIndex: 0, x: MARGIN_X + 270, y: fromTop(788), fontSize: 8, maxWidth: 180 },
}
