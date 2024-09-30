import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { increment } from '../store/slices/counterSlice'

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
