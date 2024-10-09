import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { message, Table } from "antd"
import axios from "axios"
import moment from 'moment'
import { useSelector } from "react-redux"

function Appointment(){
    const [appointment,setAppointment]=useState()
    const {user}=useSelector(state=>state.user)
    const getappointment=async()=>{
     try{
         const res=await axios({
            method:'post',
            url:['https://doctor-appointment-backend-7te2.onrender.com/api/user/user-appointment'],
            withCredentials:true,
            data:{userId:user._id},
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
         })

         if(res.data.success){
            setAppointment(res.data.data)
            message.success(res.data.message)
         }
     }catch(e){
        console.log(e)
        message.error('something went wrong')
     }
    }

    useEffect(()=>{
        getappointment()
    },[])

    const coloumns=[
        {
            title:"ID",
            dataIndex:"_id"
        },
        {
            title:"Name",
            dataIndex:"name",
            render:(text,record)=>(
                <span>
                    {record.doctorId.firstname} {record.doctorId.lastname}
                </span>
            )
        },
        {
            title:"Phone",
            dataIndex:"phone",
            render:(text,record)=>(
                <span>
                    {record.doctorId.phone}
                </span>
            )
        },
        {
            title:"Date & Time",
            dataIndex:"phone",
            render:(text,record)=>(
                <span>
                    {moment(record.date).format("DD-MM-YYYY")}
                    {moment(record.time).format("HH:mm")}
                </span>
            )
        },
        {
            title:"Status",
            dataIndex:"status"
        }
    ]
    return(
        <Layout>
        <h1>Appointment</h1>
        <Table columns={coloumns} dataSource={appointment}/>
        </Layout>
    )
}

export default Appointment
