import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GoogleLogin } from '@react-oauth/google';

function App() {
  const [count, setCount] = useState(0)

  const handleLoginSuccess = async (response: any) => {
    const { credential } = response;
    console.log('Google response:')
    console.log(response)

    try {
      // Send the Google JWT to the backend using fetch
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${credential}`, // Set the JWT as a Bearer token
        },
      });

      const result = await res.json();

      console.log('Backend response:', result);
    } catch (error) {
      console.error('Error sending token to backend:', error);
    }
  };

  const handleLoginError = (error: any) => {
    console.error('Login failed:', error);
  };

  const dupa = async () => {
    const credential = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE0OTM5MWJmNTJiNThjMWQ1NjAyNTVjMmYyYTA0ZTU5ZTIyYTdiNjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MzA2NjkyMDU2ODctMGVocGY1bTVtYXYzMXNoaGU0a3V2aWxlcjNuOWxyOTguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MzA2NjkyMDU2ODctMGVocGY1bTVtYXYzMXNoaGU0a3V2aWxlcjNuOWxyOTguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDAyOTg1NjExNTgyMzY4MTIzOTUiLCJoZCI6ImJlc3Qua3Jha293LnBsIiwiZW1haWwiOiJzdHJvbmEuYmgyMDIzQGJlc3Qua3Jha293LnBsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcyNTA0ODg2MiwibmFtZSI6IlN0cm9uYSBCSDIwMjMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSUhqdTBoWlBXZERJdEdYSTdhYk5ZTmZvSVI0MjRNa2NDbU10NGpzX1hiQnpra0FBPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlN0cm9uYSIsImZhbWlseV9uYW1lIjoiQkgyMDIzIiwiaWF0IjoxNzI1MDQ5MTYyLCJleHAiOjE3MjUwNTI3NjIsImp0aSI6ImU0MWQzZDJiMzAzMWUwYWJkNDBiOWI4ZGM4ZjgzMWRlMTNmMThkOTcifQ.Vjc7oyvBttEsFRI7GIqWkMJrR7HpeH6xbYqWcn5nCv1lHPM12rKoXBunF1lxH9VYZWiAMO8wwwMeW4SI376eaTuMaSOx1RxuSU2l3ig_RHTVi4tpNrvkDE86F6q7vSAHUGGGzFcn215IKbCN0zim1Y4h-CHbTlG6sAdei3FXCrC6gfoMKhwUbdmXHeKguT-em5gB2Ow14v3F0WsfntQqMfncO8GFijKNgbu93KtsaZ4zZsPewD9dcqJCyzC0tvE_rZ0VfRLu0A08HrRa5GQ6rLAmZqueQ--hb7FZ2PmH5yq2usT4dayA7m4k8v5I4v9p8GyJOGnvcQvvzpCSH7-qsw';

    try {
      // Send the Google JWT to the backend using fetch
      const res = await fetch('http://localhost:3000/login/dupa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${credential}`, // Set the JWT as a Bearer token
        },
      });

      const result = await res.json();

      console.log('Backend response:', result);
    } catch (error) {
      console.error('Error sending token to backend:', error);
    }
  }

  return (
    <>
    <GoogleLogin
      // onSuccess={credentialResponse => {
      //   console.log(credentialResponse);
      // }}
      onSuccess={credentialResponse => {
        handleLoginSuccess(credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
      
    />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={dupa}>Some button sending token</button>
    </>
  )
}

export default App
