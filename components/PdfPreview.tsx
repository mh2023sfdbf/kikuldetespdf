'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

export interface SignaturePosition {
  xPct: number
  yPct: number
}

interface Props {
  pdfBytes: Uint8Array | null
  employeeSignature?: string | null
  orderedBySignature?: string | null
  onPositionsChange?: (positions: {
    employee: SignaturePosition | null
    orderedBy: SignaturePosition | null
  }) => void
}

const SIG_WIDTH_PCT = 18
const SIG_HEIGHT_PCT = 5.5

export default function PdfPreview({
  pdfBytes,
  employeeSignature,
  orderedBySignature,
  onPositionsChange,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 })
  const [employeePos, setEmployeePos] = useState<SignaturePosition>({ xPct: 8, yPct: 88 })
  const [orderedByPos, setOrderedByPos] = useState<SignaturePosition>({ xPct: 55, yPct: 88 })
  const [dragging, setDragging] = useState<'employee' | 'orderedBy' | null>(null)
  const dragOffset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!pdfBytes || !canvasRef.current) return
    let cancelled = false

    async function render() {
      if (!pdfBytes) return
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

      const dataCopy = new Uint8Array(pdfBytes)
      const loadingTask = pdfjsLib.getDocument({ data: dataCopy as unknown as ArrayBuffer })
      const pdf = await loadingTask.promise
      const page = await pdf.getPage(1)

      const container = containerRef.current
      if (!container || cancelled) return

      const containerWidth = container.clientWidth
      const viewport = page.getViewport({ scale: 1 })
      const scale = containerWidth / viewport.width
      const scaledViewport = page.getViewport({ scale })

      const canvas = canvasRef.current!
      canvas.width = scaledViewport.width
      canvas.height = scaledViewport.height
      setCanvasSize({ w: scaledViewport.width, h: scaledViewport.height })

      const ctx = canvas.getContext('2d')!
      await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise
    }

    render()
    return () => { cancelled = true }
  }, [pdfBytes])

  useEffect(() => {
    onPositionsChange?.({
      employee: employeeSignature ? employeePos : null,
      orderedBy: orderedBySignature ? orderedByPos : null,
    })
  }, [employeePos, orderedByPos, employeeSignature, orderedBySignature, onPositionsChange])

  const getPointerPct = useCallback((e: React.PointerEvent | PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return { xPct: 0, yPct: 0 }
    const xPct = ((e.clientX - rect.left - dragOffset.current.x) / rect.width) * 100
    const yPct = ((e.clientY - rect.top - dragOffset.current.y) / rect.height) * 100
    return {
      xPct: Math.max(0, Math.min(100 - SIG_WIDTH_PCT, xPct)),
      yPct: Math.max(0, Math.min(100 - SIG_HEIGHT_PCT, yPct)),
    }
  }, [])

  const onPointerDown = useCallback((which: 'employee' | 'orderedBy', e: React.PointerEvent) => {
    e.preventDefault()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    setDragging(which)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return
    const pos = getPointerPct(e)
    if (dragging === 'employee') setEmployeePos(pos)
    else setOrderedByPos(pos)
  }, [dragging, getPointerPct])

  const onPointerUp = useCallback(() => {
    setDragging(null)
  }, [])

  if (!pdfBytes) return null

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative w-full border-[3px] border-neutral-900 rounded-xl overflow-hidden bg-white shadow-soft select-none touch-none"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <canvas ref={canvasRef} className="w-full h-auto block" />

        {employeeSignature && (
          <div
            className={`absolute cursor-grab active:cursor-grabbing rounded border-2 border-dashed transition-shadow ${
              dragging === 'employee' ? 'border-green-500 shadow-lg ring-2 ring-green-300' : 'border-blue-500 hover:shadow-md'
            }`}
            style={{
              left: `${employeePos.xPct}%`,
              top: `${employeePos.yPct}%`,
              width: `${SIG_WIDTH_PCT}%`,
              height: `${SIG_HEIGHT_PCT}%`,
            }}
            onPointerDown={(e) => onPointerDown('employee', e)}
          >
            <img
              src={employeeSignature}
              alt="Munkavállaló aláírása"
              className="w-full h-full object-contain pointer-events-none"
              draggable={false}
            />
            <span className="absolute -top-5 left-0 text-[10px] font-medium text-blue-600 whitespace-nowrap bg-white/80 px-1 rounded">
              Munkavállaló
            </span>
          </div>
        )}

        {orderedBySignature && (
          <div
            className={`absolute cursor-grab active:cursor-grabbing rounded border-2 border-dashed transition-shadow ${
              dragging === 'orderedBy' ? 'border-green-500 shadow-lg ring-2 ring-green-300' : 'border-purple-500 hover:shadow-md'
            }`}
            style={{
              left: `${orderedByPos.xPct}%`,
              top: `${orderedByPos.yPct}%`,
              width: `${SIG_WIDTH_PCT}%`,
              height: `${SIG_HEIGHT_PCT}%`,
            }}
            onPointerDown={(e) => onPointerDown('orderedBy', e)}
          >
            <img
              src={orderedBySignature}
              alt="Elrendelő aláírása"
              className="w-full h-full object-contain pointer-events-none"
              draggable={false}
            />
            <span className="absolute -top-5 left-0 text-[10px] font-medium text-purple-600 whitespace-nowrap bg-white/80 px-1 rounded">
              Elrendelő
            </span>
          </div>
        )}
      </div>

      {(employeeSignature || orderedBySignature) && (
        <p className="text-xs text-neutral-500 text-center">
          Húzza az aláírásokat a kívánt pozícióba, majd kattintson a letöltésre.
        </p>
      )}
    </div>
  )
}
