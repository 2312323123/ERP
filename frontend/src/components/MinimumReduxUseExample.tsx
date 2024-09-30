import { useDispatch, useSelector } from 'react-redux'
import { increment, RootState } from '../store/store'

const MinimumReduxUseExample = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </>
  )
}

export default MinimumReduxUseExample
