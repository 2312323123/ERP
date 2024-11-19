import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { pl } from 'date-fns/locale'

interface CoolDatePickerProps {
  value: Date | null
  setValue: (value: Date | null) => void
}

export default function CoolDatePicker({ value, setValue }: CoolDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
      </DemoContainer>
    </LocalizationProvider>
  )
}
