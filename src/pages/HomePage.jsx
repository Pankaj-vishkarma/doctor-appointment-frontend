import axios from "axios"
import { useEffect, useState } from "react"
import {message, Row} from 'antd'
import Layout from '../components/Layout'
import DoctorList from "../components/DoctorList"

function HomePage(){
  const [doctor,setDoctor]=useState([])
    const fun=async()=>{

      try{
         const res=await axios({
          method:'get',
          url:['http://localhost:1234/api/user/getalldoctor'],
          withCredentials:true
        })
        if(res.data.success){
          message.success(res.data.message)
          setDoctor(res.data.data)
        }else{
          message.error(res.data.message)
        }
      }catch(e){
        console.log(e)
        message.error('something went wrong')
      }
    }
    useEffect(()=>{
      fun()
    },[])
    return(
        <>
        <Layout>
          <h3 className="text-center">Home Page</h3>
          <Row>
            {doctor && doctor.map(doctor => <DoctorList doctor={doctor}/>)}
          </Row>
        </Layout>
        
        </>
    )
}

export default HomePage