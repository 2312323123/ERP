import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import OtherPage from './pages/OtherPage'
import SurveysNavbar from './components/SurveysNavbar/SurveysNavbar'
import SurveysDashboard from './pages/RecruitmentSurveyStagePages/SurveysDashboard'
import SurveysSurveys from './pages/RecruitmentSurveyStagePages/SurveysSurveys/SurveysSurveys'
import SurveysHelp from './pages/RecruitmentSurveyStagePages/SurveysHelp'
import SurveysFeedback from './pages/RecruitmentSurveyStagePages/SurveysFeedback'
import SurveysSettings from './pages/RecruitmentSurveyStagePages/SurveysSettings/SurveysSettings'
import PathChangeListener from './utils/PathChangeListener'
import AppRoles from './pages/AppRoles/AppRoles'
import Survey from './pages/RecruitmentSurveyStagePages/Survey'
import SurveysSurveyPage from './pages/RecruitmentSurveyStagePages/SurveysSurveyPage/SurveysSurveyPage'
import InterviewsNavbar from './components/InterviewsNavbar/InterviewsNavbar'
import InterviewsSettingsPage from './pages/RecruitmentInterviewStagePages/InterviewsSettingsPage'
import InterviewsFeedback from './pages/RecruitmentInterviewStagePages/InterviewsFeedback'
import InterviewsMainPage from './pages/RecruitmentInterviewStagePages/InterviewsMainPage/InterviewsMainPage'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PathChangeListener />}>
      <Route path="login" element={<Login />} />
      <Route index element={<Navigate to="/login" replace />} /> {/* this line makes you start at /login */}
      <Route path="/home" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="other-page" element={<OtherPage />} />
      </Route>
      <Route path="/app-roles" element={<AppRoles />}></Route>
      <Route path="/recruitment-survey-stage">
        <Route path="/recruitment-survey-stage/app" element={<SurveysNavbar />}>
          <Route path="/recruitment-survey-stage/app/survey" element={<Survey />}>
            <Route path="/recruitment-survey-stage/app/survey/:uuid" element={<SurveysSurveyPage />} />
          </Route>
          <Route index path="/recruitment-survey-stage/app/dashboard" element={<SurveysDashboard />} />
          <Route path="/recruitment-survey-stage/app/surveys" element={<SurveysSurveys />} />
          <Route path="/recruitment-survey-stage/app/help" element={<SurveysHelp />} />
          <Route path="/recruitment-survey-stage/app/feedback" element={<SurveysFeedback />} />
          <Route path="/recruitment-survey-stage/app/settings" element={<SurveysSettings />} />
        </Route>
      </Route>
      <Route path="/recruitment-interview-stage">
        <Route path="/recruitment-interview-stage/app" element={<InterviewsNavbar />}>
          <Route index path="/recruitment-interview-stage/app/main-page" element={<InterviewsMainPage />} />
          <Route path="/recruitment-interview-stage/app/feedback" element={<InterviewsFeedback />} />
          <Route path="/recruitment-interview-stage/app/settings" element={<InterviewsSettingsPage />} />
        </Route>
      </Route>
    </Route>,
  ),
)
