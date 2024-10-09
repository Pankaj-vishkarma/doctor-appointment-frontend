
import Layout from "../../components/Layout"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Col, Form, Input, message, Row, TimePicker } from 'antd'
import { useSelector,useDispatch } from "react-redux"
import axios from "axios"
import { useParams } from "react-router-dom"
import {showLoading,hideLoading} from '../../redux/features/AlertSlice'
import moment from 'moment'

function Profile(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const params=useParams()
    const {user} =useSelector(state=>state.user)
    const [doctor,setDoctor]=useState(null)

    const getDoctor=async()=>{
      try{
        const res=await axios({
          method:'post',
          url:['http://localhost:1234/api/doctor/getdoctorinfo'],
          withCredentials:true,
          data:{userId:params.id},
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })

        if(res.data.success){
            message.success(res.data.message)
            console.log(res.data.data)
            setDoctor(res.data.data)
        }else{
            message.error(res.data.message)
        }

      }catch(e){
        console.log(e)
        message.error('something went wrong ')
      }
    }

    //handlefinish
    const handleFinish=async(values)=>{
      try{
          dispatch(showLoading())
          const res=await axios({
            method:'post',
            url:['http://localhost:1234/api/doctor/updateprofile'],
            withCredentials:true,
            data:{...values,userId:user._id,timings:[moment(values.timings[0]).format("HH:mm"),moment(values.timings[1]).format("HH:mm")]},
            headers:{
               Authorization:`Bearer ${localStorage.getItem("token")}`
             }
          })
          dispatch(hideLoading())
          if(res.data.success){
            message.success('update successfully')
            navigate('/')
          }else{
            message.error(res.data.message)
            console.log(res.data.message)
          }

      }catch(e){
         dispatch(hideLoading())
         console.log(e)
         message.error('Something went wrong')
      }
    }
    //handlefinish

    useEffect(()=>{
     getDoctor()
    },[])

    return(
        <Layout>
       
       {doctor && (
        <Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={{...doctor,timings:[moment(doctor.timings[0],'HH:mm'),moment(doctor.timings[1],'HH:mm')]}}>
        <h3 className="">Personal Details : </h3>
        <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
            <Form.Item label='First Name' name="firstname" required>
               <Input type="text" placeholder="first name" required/>
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            <Form.Item label='Last Name' name="lastname" required>
               <Input type="text" placeholder="last name" required/>
            </Form.Item>
            </Col>
             <Col xs={24} md={24} lg={8}>
             <Form.Item label='Phone Number' name="phone" required>
               <Input type="number" placeholder="Phone Number" required/>
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            <Form.Item label='Email' name="email" required>
               <Input type="email" placeholder="Email" required/>
            </Form.Item>
            </Col>
             <Col xs={24} md={24} lg={8}>
            <Form.Item label='Website (optional)' name="website">
               <Input type="text" placeholder="Website"/>
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            <Form.Item label='Address' name="address" required>
               <Input type="textarea" placeholder="Address" required/>
            </Form.Item>
            </Col>
            </Row>
         <h3 className="">Profestional Details : </h3>
        <Row gutter={20}>
           <Col xs={24} md={24} lg={8}>
            <Form.Item label='Specification' name="specification" required>
               <Input type="text" placeholder="Specification" required/>
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            <Form.Item label='Experience' name="experience" required>
               <Input type="number" placeholder="Experience" required/>
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            <Form.Item label='FeesPerConsaltation' name="feesPerConsaltation" required>
               <Input type="number" placeholder="feesPerConsaltation"  required/>
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label='Timings' name="timings" required>
                   <TimePicker.RangePicker format="HH:mm"/>
                </Form.Item>
            </Col> 
           
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">Update</button>
            </Col>
        </Row>
      </Form>
       )}
        </Layout>
    )
}

export default Profile