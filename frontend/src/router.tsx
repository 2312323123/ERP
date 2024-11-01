import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import OtherPage from './pages/OtherPage'
import SurveysFirstVisit from './pages/RecruitmentSurveyStagePages/SurveysFirstVisit'
import SurveysNavbar from './components/SurveysNavbar'
import SurveysDashboard from './pages/RecruitmentSurveyStagePages/SurveysDashboard'
import SurveysSurveys from './pages/RecruitmentSurveyStagePages/SurveysSurveys'
import SurveysRanks from './pages/RecruitmentSurveyStagePages/SurveysRanks'
import SurveysHelp from './pages/RecruitmentSurveyStagePages/SurveysHelp'
import SurveysFeedback from './pages/RecruitmentSurveyStagePages/SurveysFeedback'
import SurveysSettings from './pages/RecruitmentSurveyStagePages/SurveysSettings/SurveysSettings'
import PathChangeListener from './utils/PathChangeListener'
import AppRoles from './pages/AppRoles/AppRoles'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PathChangeListener />}>
      <Route path="login" element={<Login />} />
      <Route index element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="other-page" element={<OtherPage />} />
      </Route>
      <Route path="/app-roles" element={<AppRoles />}></Route>
      <Route path="/recrutiment-survey-stage">
        <Route path="/recrutiment-survey-stage/first-visit" element={<SurveysFirstVisit />} />
        <Route path="/recrutiment-survey-stage/app" element={<SurveysNavbar />}>
          <Route index path="/recrutiment-survey-stage/app/dashboard" element={<SurveysDashboard />} />
          <Route path="/recrutiment-survey-stage/app/surveys" element={<SurveysSurveys />} />
          <Route path="/recrutiment-survey-stage/app/ranks" element={<SurveysRanks />} />
          <Route path="/recrutiment-survey-stage/app/help" element={<SurveysHelp />} />
          <Route path="/recrutiment-survey-stage/app/feedback" element={<SurveysFeedback />} />
          <Route path="/recrutiment-survey-stage/app/settings" element={<SurveysSettings />} />
        </Route>
      </Route>
    </Route>,
  ),
)
