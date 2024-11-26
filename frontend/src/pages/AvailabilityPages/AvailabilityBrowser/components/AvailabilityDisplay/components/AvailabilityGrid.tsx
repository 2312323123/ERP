import { useCallback, useEffect, useState } from 'react'
import styles from './AvailabilityGrid.module.css'
import { debounce, throttle } from 'lodash'

const positionToTime = ({ x, y }: { x: number; y: number }) => {
  const day = Math.floor(x / (1000 / 7))
  const time = (y * 1440) / 800
  const totalTime = time + day * 1440
  return totalTime
}

export const AvailabilityGrid = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Debounced and throttled handler
  const updatePosition = useCallback(
    throttle(
      debounce((offsetX: number, offsetY: number) => {
        setPosition({ x: offsetX, y: offsetY })
      }, 100), // Debounce: wait 100ms
      200, // Throttle: at most every 200ms
    ),
    [],
  )

  const handleMouseMove = (event) => {
    const { offsetX, offsetY } = event.nativeEvent
    updatePosition(offsetX, offsetY)
  }

  useEffect(() => {
    console.log('position:', positionToTime(position))
  }, [position])

  return (
    <div className={styles.containerDiv}>
      <div className={styles.gridTimes}>
        <div className={styles.gridTime}>
          <div>00:00 - 01:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>01:00 - 02:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>02:00 - 03:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>03:00 - 04:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>04:00 - 05:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>05:00 - 06:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>06:00 - 07:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>07:00 - 08:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>08:00 - 09:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>09:00 - 10:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>10:00 - 11:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>11:00 - 12:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>12:00 - 13:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>13:00 - 14:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>14:00 - 15:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>15:00 - 16:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>16:00 - 17:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>17:00 - 18:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>18:00 - 19:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>19:00 - 20:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>20:00 - 21:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>21:00 - 22:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>22:00 - 23:00</div>
        </div>
        <div className={styles.gridTime}>
          <div>23:00 - 00:00</div>
        </div>
      </div>
      <div>
        <div className={styles.gridHeader}>
          <div className={styles.gridHeaderElement}>Poniedziałek</div>
          <div className={styles.gridHeaderElement}>Wtorek</div>
          <div className={styles.gridHeaderElement}>Środa</div>
          <div className={styles.gridHeaderElement}>Czwartek</div>
          <div className={styles.gridHeaderElement}>Piątek</div>
          <div className={styles.gridHeaderElement}>Sobota</div>
          <div className={styles.gridHeaderElement}>Niedziela</div>
        </div>
        <div className={styles.gridDiv} onMouseMove={handleMouseMove}></div>
      </div>
    </div>
  )
}
