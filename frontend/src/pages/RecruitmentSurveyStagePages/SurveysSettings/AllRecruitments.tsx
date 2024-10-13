import { useSelector } from 'react-redux'
import { useGetAllRecruitmentsQuery } from '../../../services/erp'
import { getAllRecruitmentsUuidNameStartDate } from '../../../store/slices/surveyStage/surveySettingsPageSlice'

const AllRecruitments = () => {
  // Use selector to get data from the surveySettingsPage slice
  const allRecruitmentsFromReducer = useSelector(getAllRecruitmentsUuidNameStartDate)

  // Fetch recruitment data using RTK Query
  const { data: recruitments, error, isLoading } = useGetAllRecruitmentsQuery()

  // Conditional rendering based on loading/error states
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Oh no, there was an error</div>

  return (
    <>
      <div className="App">
        {/* Combine reducer and API data, or use API data directly */}
        <h2>Survey Recruitments</h2>
        {recruitments ? (
          <ul>
            {recruitments.map((recruitment) => (
              <li key={recruitment.uuid}>
                <strong>{recruitment.name}</strong> - {new Date(recruitment.startDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recruitments found.</p>
        )}

        {/* Example usage of data from the Redux reducer */}
        <h2>From Redux Reducer</h2>
        {allRecruitmentsFromReducer ? (
          <ul>
            {allRecruitmentsFromReducer.map((recruitment) => (
              <li key={recruitment.uuid}>
                {recruitment.name} - {new Date(recruitment.startDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recruitments in state.</p>
        )}
      </div>
    </>
  )
}

export default AllRecruitments
