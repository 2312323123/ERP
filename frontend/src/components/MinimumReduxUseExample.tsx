import { useDispatch, useSelector } from 'react-redux'
import { getCounterValue, increment } from '../store/slices/counterSlice'

const MinimumReduxUseExample = () => {
  const count = useSelector(getCounterValue)
  const dispatch = useDispatch()

  return (
    <>
      <div>{count}</div>
      <button onClick={() => dispatch(increment(2))}>Increment</button>
    </>
  )
}

export default MinimumReduxUseExample
