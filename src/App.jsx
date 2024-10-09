import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { useSelector } from 'react-redux'
import Spinner from './components/Spinner'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Logout from './pages/Logout'
import ApplyDoctor from './pages/ApplyDoctor'
import NotificationPage from './pages/NotificationPage'
import Doctors from './pages/Admin/Doctors'
import Users from './pages/Admin/Users'
import Profile from './pages/Doctor/Profile'
import BookingPage from './pages/BookingPage'
import Appointment from './pages/Appointment'
import DoctorAppointment from './pages/Doctor/DoctorApppointment'

function App() {

  const {loading}=useSelector(state => state.alerts)

  return (
    <>
      <BrowserRouter>
      {loading ?(<Spinner/>):(
        <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        <Route path='/apply-doctor' element={<ProtectedRoute><ApplyDoctor/></ProtectedRoute>}/>
        <Route path='/admin/doctors' element={<ProtectedRoute><Doctors/></ProtectedRoute>}/>
        <Route path='/admin/users' element={<ProtectedRoute><Users/></ProtectedRoute>}/>
        <Route path='/doctor/profile/:id' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='/doctor/book-appointment/:doctorId' element={<ProtectedRoute><BookingPage/></ProtectedRoute>}/>
        <Route path='/notification' element={<ProtectedRoute><NotificationPage/></ProtectedRoute>}/>
        <Route path='/logout' element={<ProtectedRoute><Logout/></ProtectedRoute>}/>
        <Route path='/login' element={<PublicRoute><LoginPage/></PublicRoute>}/>
        <Route path='/register' element={<PublicRoute><RegisterPage/></PublicRoute>}/>
        <Route path='/appointment' element={<ProtectedRoute><Appointment/></ProtectedRoute>}/>
        <Route path='/doctor-appointment' element={<ProtectedRoute><DoctorAppointment/></ProtectedRoute>}/>
      </Routes>
      )}
      
      </BrowserRouter>
    </>
  )
}

export default App
