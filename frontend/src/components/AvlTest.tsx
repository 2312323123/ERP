import { useState } from 'react'
import AvailableTimes from 'react-available-times'

const AvlTest = () => {
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

  const [dupa, setDupa] = useState([
    { start: 0, end: 100 },
    { start: 200, end: 300 },
  ])

  return (
    <>
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
          setDupa(selections)
        }}
        // initialSelections={selections}
        // initialSelections={[{ start: 0, end: 100 }]}
        initialSelections={dupa}
        onEventsRequested={({ calendarId, start, end, callback }) => {
          loadMoreEvents(calendarId, start, end) //.then(callback)
        }}
        // initialSelections={[{ start: aDateObject, end: anotherDateObject }]}
        height={700}
        recurring={true}
        // availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday']}
        // availableHourRange={{ start: 9, end: 19 }}
      />
      <div>
        <h4>dupa</h4>
        {dupa.map((el) => (
          <div>{JSON.stringify(el)}</div>
        ))}
      </div>
    </>
  )
}

export default AvlTest
