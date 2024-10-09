import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { message, Table } from "antd"
import axios from "axios"
import moment from 'moment'
import { useSelector } from 'react-redux'

function DoctorAppointment(){
    const {user}=useSelector(state=>state.user)
    const [appointment,setAppointment]=useState()

    const getappointment=async()=>{
     try{
         const res=await axios({
            method:'post',
            url:['https://doctor-appointment-backend-7te2.onrender.com/api/doctor/doctor-appointment'],
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

    const handleStatus=async(record,status)=>{
        try{
            const res=await axios({
              method:'post',
              url:['https://doctor-appointment-backend-7te2.onrender.com/api/doctor/status-change'],
              withCredentials:true,
              data:{appointmentId:record._id,status}
            })
            if(res.data.success){
              message.success(res.data.message)
              getappointment()
            }
        }catch(e){
          console.log(e)
          message.error('smething went wrong')
        }
    }

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
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
              <div className="d-flex">
                {record.status === "pending" && (
                  <div className="d-flex">
                    <button
                      className="btn btn-success"
                      onClick={() => handleStatus(record, "approved")}
                    >
                      Approved
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleStatus(record, "reject")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ),
          }
    ]
    return (
        <Layout>
           <h1>Appointment</h1>
           <Table columns={coloumns} dataSource={appointment}/>
        </Layout>
    )
}

export default DoctorAppointment
