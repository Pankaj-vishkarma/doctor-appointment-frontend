import {Form,Input,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/AlertSlice'

function LoginPage(){
    const navigate=useNavigate()
    const dispatch=useDispatch()


    const onFinishHandler=async(values)=>{
       try{
           dispatch(showLoading())
           const res=await axios({
            method:'post',
            url:['http://localhost:1234/api/user/login'],
            withCredentials:true,
            data:values
           })
           window.location.reload()
           dispatch(hideLoading())

           if(res.data.success){
            localStorage.setItem('token',res.data.token)
            console.log(res.data.token)
            message.success('Login successfully')
            navigate('/')
           }else{
            message.error(res.data.message)
           }
       }catch(e){
        dispatch(hideLoading())
        message.error('something is wrong')
        console.log(e.message)
       }
    }

    return(
        <>
        <div className="form-container">
            <Form layout='vertical' onFinish={onFinishHandler} className='card p-5' >
                <h3>Login Page</h3>
                <Form.Item label='Email' required name='email'>
                    <Input type='email' required/>
                </Form.Item>
                <Form.Item label='Password' required name='password'>
                    <Input type='password' required/>
                </Form.Item>
                <Link to='/register' className='m-2'>New Users?</Link>
                <button className='btn btn-primary'>Login</button>
            </Form>
        </div>
        </>
    )
}

export default LoginPage