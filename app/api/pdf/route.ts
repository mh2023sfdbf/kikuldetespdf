import { NextRequest } from 'next/server'
import { apiPdfBodySchema, computeForeignDerived, computeDomesticDerived } from '@/lib/schemas'
import { foreignDemoData, domesticDemoData } from '@/lib/demo-data'
import { fillKulfoldiPdf, fillBelfoldiPdf } from '@/lib/pdf/fill'

export const runtime = 'nodejs'

/** GET /api/pdf?example=kulfoldi | example=belfoldi – returns a filled example PDF. */
export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('example')
  if (type !== 'kulfoldi' && type !== 'belfoldi') {
    return new Response('Use ?example=kulfoldi or ?example=belfoldi', { status: 400 })
  }
  try {
    if (type === 'kulfoldi') {
      const payload = computeForeignDerived(foreignDemoData)
      const pdfBuffer = await fillKulfoldiPdf(payload)
      return new Response(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="pelda-kulfoldi.pdf"',
        },
      })
    }
    const payload = computeDomesticDerived(domesticDemoData)
    const pdfBuffer = await fillBelfoldiPdf(payload)
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="pelda-belfoldi.pdf"',
      },
    })
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error('Example PDF error:', err.message, err.stack)
    const isDev = process.env.NODE_ENV === 'development'
    const body = isDev ? `PDF generation failed: ${err.message}` : 'PDF generation failed'
    return new Response(body, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = apiPdfBodySchema.parse(json)

    if (parsed.type === 'kulfoldi') {
      const payload = computeForeignDerived(parsed.payload)
      const pdfBuffer = await fillKulfoldiPdf(payload)
      const filename = 'kulfoldi-kikuldetesi-utasitas.pdf'
      return new Response(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    }

    const payload = computeDomesticDerived(parsed.payload)
    const pdfBuffer = await fillBelfoldiPdf(payload)
    const filename = 'belfoldi-kikuldetesi-utasitas.pdf'
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error: unknown) {
    const err = error as Error & { name?: string; flatten?: () => unknown }
    const message = err?.message ?? 'Unknown error'
    const stack = err?.stack
    console.error('PDF generation error:', message, stack ?? '')

    if (err?.name === 'ZodError') {
      return new Response(
        JSON.stringify({ error: err.flatten?.() ?? err, message: 'Validációs hiba.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const isDev = process.env.NODE_ENV === 'development'
    return new Response(
      JSON.stringify({
        error: 'Hiba történt a PDF generálása közben.',
        ...(isDev && { detail: message }),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export const maxDuration = 15
