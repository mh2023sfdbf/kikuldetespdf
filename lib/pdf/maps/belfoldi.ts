/**
 * Coordinate map for Belföldi PDF. Generous row spacing so label+value and wrapped lines never overlap.
 */
import type { FieldMap } from '../types'
import { fromTop, MARGIN_X, CONTENT_WIDTH } from '../design'

const ROW = 28
const SECTION_TOP = 118

export const belfoldiFieldMap: FieldMap = {
  title: { pageIndex: 0, x: MARGIN_X, y: fromTop(52), fontSize: 16, maxWidth: CONTENT_WIDTH, align: 'center', lineHeight: 22 },

  employerName: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_TOP + ROW * 0), fontSize: 10, maxWidth: 320 },
  employeeName: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_TOP + ROW * 1), fontSize: 10, maxWidth: 320 },
  employeePosition: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_TOP + ROW * 2), fontSize: 10, maxWidth: 320 },
  cityOrViszonylat: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_TOP + ROW * 3), fontSize: 10, maxWidth: 320 },
  startDate: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_TOP + ROW * 4), fontSize: 10, maxWidth: 220 },
  endDate: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_TOP + ROW * 5), fontSize: 10, maxWidth: 220 },
  days: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_TOP + ROW * 6), fontSize: 10, maxWidth: 120 },
  purposeText: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_TOP + ROW * 7), fontSize: 10, maxWidth: CONTENT_WIDTH, maxLines: 3 },
  travelMode: { pageIndex: 0, x: MARGIN_X, y: fromTop(SECTION_TOP + ROW * 11), fontSize: 10, maxWidth: 320 },

  costSummary: { pageIndex: 0, x: MARGIN_X, y: fromTop(358), fontSize: 9, maxWidth: CONTENT_WIDTH, maxLines: 4 },

  notesAuto: { pageIndex: 0, x: MARGIN_X, y: fromTop(478), fontSize: 9, maxWidth: CONTENT_WIDTH, maxLines: 3 },

  issuedDate: { pageIndex: 0, x: MARGIN_X, y: fromTop(558), fontSize: 10, maxWidth: 120 },
  attachmentsCount: { pageIndex: 0, x: MARGIN_X + 150, y: fromTop(558), fontSize: 10, maxWidth: 60 },
  orderedByName: { pageIndex: 0, x: MARGIN_X, y: fromTop(580), fontSize: 9, maxWidth: 250 },

  employeeSignature: { pageIndex: 0, x: MARGIN_X, y: fromTop(692), fontSize: 8, maxWidth: 180 },
  orderedBySignature: { pageIndex: 0, x: MARGIN_X + 270, y: fromTop(692), fontSize: 8, maxWidth: 180 },
}
