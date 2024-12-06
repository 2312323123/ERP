import { _Availability } from '../../../../../../services/availability'
import styles from './AvailabilityGrid.module.css'

interface Props {
  start: number
  end: number
}

interface ReturnFuncProps {
  handleMouseMove: (event: React.MouseEvent) => void
  allAvailabilities: _Availability
}

const availabilityToRect = ({ start, end }: Props) => {
  // console.log('========================:')

  // console.log('start:')
  // console.log(start)
  // console.log('end:')
  // console.log(end)

  const x = Math.floor(start / 1440) * (1000 / 7)
  const width = 1000 / 7
  const height = ((end - start) * 800) / 1440
  const y = ((start % 1440) * 800) / 1440
  // console.log('x:')
  // console.log(x)
  // console.log('width:')
  // console.log(width)
  // console.log('height:')
  // console.log(height)
  // console.log('y:')
  // console.log(y)

  return (
    <div
      style={{
        backgroundColor: 'rgba(0, 255, 0, 0.4)',
        position: 'absolute',
        left: x + 'px',
        top: y + 'px',
        width: width + 'px',
        height: height + 'px',
      }}
    ></div>
  )
}

export const AvailabilityGrid = ({ handleMouseMove, allAvailabilities }: ReturnFuncProps) => {
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
        <div className={styles.gridHeader} style={{ zIndex: 1 }}>
          <div className={styles.gridHeaderElement}>Poniedziałek</div>
          <div className={styles.gridHeaderElement}>Wtorek</div>
          <div className={styles.gridHeaderElement}>Środa</div>
          <div className={styles.gridHeaderElement}>Czwartek</div>
          <div className={styles.gridHeaderElement}>Piątek</div>
          <div className={styles.gridHeaderElement}>Sobota</div>
          <div className={styles.gridHeaderElement}>Niedziela</div>
        </div>
        <div className={styles.gridDiv} onMouseMove={handleMouseMove} style={{ position: 'relative' }}>
          {allAvailabilities.map((availability) => availabilityToRect(availability))}
        </div>
      </div>
    </div>
  )
}
