import { Outlet, useParams } from 'react-router-dom'

const Survey = () => {
  const { uuid } = useParams()

  if (uuid) {
    return (
      <>
        <Outlet />
      </>
    )
  }

  return <>Brawo! Wszystkie ankiety ocenione</>
}

export default Survey
