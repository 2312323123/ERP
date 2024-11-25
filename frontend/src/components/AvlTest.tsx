import { Button } from '@mui/material'
import { useState } from 'react'
import AvailableTimes from 'react-available-times'

interface UserAvailibilityInfo {
  id: string
  availability: { start: number; end: number }[]
}
// for many users: UserAvailibilityInfo[] (and in putput attached and sorted by name by some internal method)

const AvlTest = ({
  databaseAvailability = [
    { start: 0, end: 100 },
    { start: 200, end: 300 },
  ],
}) => {
  const loadMoreEvents = (calendarId, start, end) => {
    console.log('calendarId:')
    console.log(calendarId)
    console.log('start:')
    console.log(start)
    console.log('end:')
    console.log(end)
  }

  const [selections, setSelections] = useState([
    [
      {
        start: new Date(1970, 1, 1, 9, 30),
        end: new Date(1970, 1, 1, 10, 30),
      },
    ],
  ])

  const [state, setState] = useState(databaseAvailability ?? [])

  const setDupaWithFiltering = (selections) => {
    const dupa2 = selections.filter((el) => el.start < el.end)

    if (dupa2.length < selections.length) {
      reset(dupa2)
    }

    setState(dupa2)
  }

  const [show, setShow] = useState(true)

  const reset = (toSomething) => {
    if (toSomething) {
      setState(toSomething)
    } else {
      setState([{ start: 0, end: 100 }])
    }
    setShow(false)
    setTimeout(() => setShow(true), 0)
  }

  return (
    <>
      <div style={{ height: '700px' }}>
        {show && (
          <AvailableTimes
            weekStartsOn="monday"
            calendars={[
              {
                id: 'work',
                title: 'Work',
                foregroundColor: '#ff00ff',
                backgroundColor: '#f0f0f0',
                selected: true,
              },
              {
                id: 'private',
                title: 'My private cal',
                foregroundColor: '#666',
                backgroundColor: '#f3f3f3',
              },
            ]}
            onChange={(selections) => {
              console.log('=======================')
              // selections.forEach(({ start, end }) => {
              //   console.log('Start:', start, 'End:', end)
              // })
              console.log(selections)
              // setSelections(selections)
              setDupaWithFiltering(selections)
            }}
            // initialSelections={selections}
            // initialSelections={[{ start: 0, end: 100 }]}
            initialSelections={state}
            onEventsRequested={({ calendarId, start, end, callback }) => {
              loadMoreEvents(calendarId, start, end) //.then(callback)
            }}
            // initialSelections={[{ start: aDateObject, end: anotherDateObject }]}
            height={700}
            recurring={true}
            // availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday']}
            // availableHourRange={{ start: 9, end: 19 }}
          />
        )}
      </div>
      <div>
        <h4>state</h4>
        {state.map((el) => (
          <div>{JSON.stringify(el)}</div>
        ))}
      </div>
      <Button onClick={reset}>Reset</Button>
    </>
  )
}

export default AvlTest
