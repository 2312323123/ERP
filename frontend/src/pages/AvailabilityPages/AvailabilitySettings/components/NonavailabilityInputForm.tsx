import { useState } from 'react'
import { _Availability } from '../../../../services/availability'
import { useDispatch, useSelector } from 'react-redux'
import { getSettingsAvailability, setSettingsAvailability } from '../../../../store/slices/availabilitySlice'
import AvailableTimes from 'react-available-times'
import styles from './NonavailabilityInputForm.module.css'

export const NonavailabilityInputForm = () => {
  const [show, setShow] = useState(true)

  const selected = useSelector(getSettingsAvailability)
  const dispatch = useDispatch()

  const reset = (toSomething: _Availability) => {
    if (toSomething) {
      dispatch(setSettingsAvailability(toSomething))
    } else {
      dispatch(setSettingsAvailability(selected))
    }
    setShow(false)
    setTimeout(() => setShow(true), 0)
  }

  const setSelectedCorrectly = (selections: _Availability) => {
    const correctSelections = selections.filter((el) => el.start < el.end)
    if (correctSelections.length < selections.length) {
      reset(correctSelections)
    }
    dispatch(setSettingsAvailability(correctSelections))
  }

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <div style={{ height: '700px' }} className={styles.ratContainer}>
        {show && (
          <AvailableTimes
            weekStartsOn="monday"
            onChange={(selections: _Availability) => {
              setSelectedCorrectly(selections)
            }}
            initialSelections={selected}
            height={700}
            recurring={true}
          />
        )}
      </div>
    </div>
  )
}
