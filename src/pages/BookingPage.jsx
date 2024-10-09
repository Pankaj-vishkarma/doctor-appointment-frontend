import React,{ useEffect, useState } from "react"
import Layout from '../components/Layout'
import { DatePicker, message, TimePicker } from "antd"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { hideLoading, showLoading } from '../redux/features/AlertSlice'
import moment from 'moment'
function BookingPage(){
    const {user}=useSelector(state=>state.user)
    const dispstch=useDispatch()
    const params=useParams()
    const [doctors,setDoctor]=useState([])
    const [date,setDate]=useState("")
    const [time,setTime]=useState()
    const [Available,setAvailable]=useState(false)

    const getDoctor=async()=>{
      try{
           const res=await axios({
            method:'post',
            url:['https://doctor-appointment-backend-7te2.onrender.com/api/doctor/getsingledoctor'],
            withCredentials:true,
            data:{doctorId:params.doctorId}
           })

           if(res.data.success){
            setDoctor(res.data.data);
           }
      }catch(e){
        console.log(e)
        message.error('something went wrong')
      }
    }

    const handleBookAppointment=async()=>{
     try{
         setAvailable(true)
         if(!date && !time){
          return alert('Date and Time required')
         }
         dispstch(showLoading())
         const res=await axios({
          method:'post',
          url:['http://localhost:1234/api/user/book-appointment'],
          withCredentials:true,
          data:{
            userId:user._id,
            doctorId:params.doctorId,
            doctorInfo:doctors[0],
            userInfo:user,
            date:date,
            time:time
          },
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
         })
         //console.log(doctorInfo)
         if(res.data.success){
          dispstch(hideLoading())
           message.success(res.data.message)
         }
     }catch(e){
      dispstch(hideLoading())
      message.error('something went wrong')
      console.log(e)
     }
    }

    const handleAvailability=async()=>{
      try{
          dispstch(showLoading())
          const res=await axios({
            method:'post',
            url:['http://localhost:1234/api/user/check-availability'],
            withCredentials:true,
            data:{doctorId:params.doctorId,date,time},
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          })
          dispstch(hideLoading())
          if(res.data.success){
            setAvailable(true)
            message.success(res.data.message)
          }else{
            message.error(res.data.message)
          }
      }catch(e){
        dispstch(hideLoading())
        console.log(e)
        message.error('something went wrong')
      }
    }

    useEffect(()=>{
       getDoctor()
    },[])
    return(
        <Layout>
        <h3 className="text-center">Booking Page</h3>
        <div className="container">
            {
                doctors.map(d=>(
                  <div>
                  <h3>Dr {d.firstname} {d.lastname}</h3>
                  <h3>Fees : {d.feesPerConsaltation}</h3>
                  <h3>Experience : {d.experience}</h3>
                  <h3>Timings : {d.timings[0]} - {d.timings[1]}</h3>

                  <div className="d-flex flex-column w-50">
                  <DatePicker
                aria-required={"true"}
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setAvailable(false)
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                aria-required={"true"}
                format="HH:mm"
                className="mt-3"
                onChange={(value) => {
                  setAvailable(false)
                  setTime(moment(value).format("HH:mm"));
                }}
              />

              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>
              {
                !Available &&(
                  <button
                className="btn btn-dark mt-2"
                onClick={handleBookAppointment}
              >
                Book Now
              </button>
                )
              }
                  </div>

                  </div>

  
                  
                )) 
            }
        </div>
        </Layout>
    )
}

export default BookingPage
