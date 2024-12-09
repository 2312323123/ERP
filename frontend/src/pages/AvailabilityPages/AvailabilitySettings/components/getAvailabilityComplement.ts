import { _Availability } from '../../../../services/availability'

export function geAvailabilitytComplement(availability: _Availability, totalDays: number = 7): _Availability {
  const minutesPerDay = 1440
  const totalMinutes = totalDays * minutesPerDay

  // normalize and split intervals that cross midnight
  const normalizeIntervals = (intervals: _Availability): _Availability => {
    const result: _Availability = []
    if (intervals) {
      for (const { start, end } of intervals) {
        const startDay = Math.floor(start / minutesPerDay)
        const endDay = Math.floor(end / minutesPerDay)

        if (startDay === endDay) {
          result.push({ start, end })
        } else {
          // split the interval across days
          result.push({ start, end: (startDay + 1) * minutesPerDay })
          result.push({ start: endDay * minutesPerDay, end })
        }
      }
    }
    return result
  }

  const splitAvailability = normalizeIntervals(availability)

  // sort intervals by start time
  const sortedAvailability = [...splitAvailability].sort((a, b) => a.start - b.start)

  const complement: _Availability = []
  let currentStart = 0

  for (const interval of sortedAvailability) {
    if (interval.start > currentStart) {
      complement.push({ start: currentStart, end: interval.start })
    }
    currentStart = Math.max(currentStart, interval.end)
  }

  // add the final gap if there is one
  if (currentStart < totalMinutes) {
    complement.push({ start: currentStart, end: totalMinutes })
  }

  return complement
}
