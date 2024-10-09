import {Form,Input,message} from 'antd'
import '../Style/RegisterStyle.css'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/AlertSlice'
import axios from 'axios'

function RegisterPage(){
    const dispatch=useDispatch()
    const usenavigate=useNavigate()
    const onFinishHandler=async(values)=>{

      try{
         dispatch(showLoading())
         const res=await axios({
            method:'post',
            url:['http://localhost:1234/api/user/register'],
            withCredentials:true,
            data:values
         })
         dispatch(hideLoading())

         if(res.data.success){
          message.success('register successfully')
          usenavigate('/login')
         }else{
          message.error(res.data.message)
         }
      }catch(e){
        dispatch(hideLoading())
        message.error('something went wrong')
        console.log(e.message)
      }
    }

    return(
        <>
        <div className="form-container">
          <Form layout='vertical' onFinish={onFinishHandler} className='card p-5'> 
            <h3>Register Form</h3>
            <Form.Item label='Name' required name='name'>
                <Input type='text' required/>
            </Form.Item>
            <Form.Item label='Email' required name='email'>
                <Input type='email' required/>
            </Form.Item>
            <Form.Item label='Password' required name='password'>
                <Input type='password' required/>
            </Form.Item>
            <Form.Item label='Confirm Password' required name='confirmpassword'>
                <Input type='password' required/>
            </Form.Item>
            <Link to='/login' className='m-2'>Already users?</Link>
            <button className='btn btn-primary' type='submit'>Register</button>
          </Form>
        </div>
        </>
    )
}

export default RegisterPage