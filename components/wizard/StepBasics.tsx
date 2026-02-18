'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { getTemplate, type TemplateId } from '@/lib/templates/config'

export function StepBasics({
  tripType,
  register,
  errors,
}: {
  tripType: TemplateId
  register: UseFormRegister<Record<string, unknown>>
  errors: FieldErrors<Record<string, unknown>>
}) {
  const labels = getTemplate(tripType).labels
  const isBelfoldi = tripType === 'belfoldi'

  return (
    <div className="space-y-4">
      <Input
        label={labels.employerName ?? 'A munkáltató neve'}
        {...register('employerName', { required: 'Kötelező' })}
        error={errors.employerName?.message as string}
      />
      {isBelfoldi && (
        <>
          <Input
            label={labels.employerAddress ?? 'Címe'}
            {...register('employerAddress')}
          />
          <Input
            label={labels.employerTaxNumber ?? 'Adószáma'}
            {...register('employerTaxNumber')}
          />
        </>
      )}
      <Input
        label={labels.employeeName ?? 'A munkavállaló neve'}
        {...register('employeeName', { required: 'Kötelező' })}
        error={errors.employeeName?.message as string}
      />
      <Input
        label={labels.employeePosition ?? 'Beosztás'}
        {...register('employeePosition', { required: 'Kötelező' })}
        error={errors.employeePosition?.message as string}
      />
      {isBelfoldi && (
        <>
          <Input label={labels.employeeAddress ?? 'Lakcíme'} {...register('employeeAddress')} />
          <Input
            label={labels.employeeBirthPlaceDate ?? 'Születési helye, ideje'}
            {...register('employeeBirthPlaceDate')}
          />
          <Input
            label={labels.employeeMotherName ?? 'Anyja neve'}
            {...register('employeeMotherName')}
          />
          <Input
            label={labels.employeeTaxId ?? 'Adóazonosító jele'}
            {...register('employeeTaxId')}
          />
        </>
      )}
      <Input
        label={labels.purposeText ?? 'Kiküldetés célja'}
        {...register('purposeText', { required: 'Kötelező' })}
        error={errors.purposeText?.message as string}
      />
      <Input
        label={labels.issuedDate ?? 'Kelt / engedély kelte'}
        type="date"
        {...register('issuedDate', { required: 'Kötelező' })}
        error={errors.issuedDate?.message as string}
      />
      {isBelfoldi && (
        <Input
          label={labels.orderNumber ?? 'Sorszám'}
          {...register('orderNumber')}
        />
      )}
      <Input
        label={labels.orderedByName ?? 'Kiküldetést elrendelő megnevezése (opcionális)'}
        {...register('orderedByName')}
      />
    </div>
  )
}
