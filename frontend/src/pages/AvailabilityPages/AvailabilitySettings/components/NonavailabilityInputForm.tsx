import { forwardRef, useImperativeHandle, useState } from 'react'
import { _Availability } from '../../../../services/availability'
import { useDispatch, useSelector } from 'react-redux'
import { getSettingsAvailability, setSettingsAvailability } from '../../../../store/slices/availabilitySlice'
import AvailableTimes from 'react-available-times'
import styles from './NonavailabilityInputForm.module.css'

export interface FormHandle {
  reset: () => void
}

export const NonavailabilityInputForm = forwardRef<FormHandle>((_, ref) => {
  const initialSelections = useSelector(getSettingsAvailability)
  const [show, setShow] = useState(true)

  const reset = () => {
    setShow(false)
    setTimeout(() => setShow(true), 0)
  }

  const setSelectedCorrectly = (selections: _Availability) => {
    const correctSelections = selections.filter((el) => el.start < el.end)
    if (correctSelections.length < selections.length) {
      // setToSomething(correctSelections)
    }
    // dispatch(setSettingsAvailability(correctSelections))
  }

  useImperativeHandle(ref, () => ({
    reset,
    // setToSomething,
  }))

  return (
    <div>
      <div>{JSON.stringify(initialSelections)}</div>
      <div style={{ height: '700px' }} className={styles.ratContainer}>
        {show && (
          <AvailableTimes
            weekStartsOn="monday"
            onChange={(selections: _Availability) => {
              setSelectedCorrectly(selections)
            }}
            initialSelections={initialSelections}
            height={700}
            recurring={true}
          />
        )}
      </div>
    </div>
  )
})
