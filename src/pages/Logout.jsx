import { message } from 'antd'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/AlertSlice'

function Logout(){
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const fun=async()=>{
        try{
          dispatch(showLoading())  
          const res=await axios({
            method:'get',
            url:['https://doctor-appointment-backend-7te2.onrender.com/api/user/logout'],
            withCredentials:true
          })

          dispatch(hideLoading())

          if(res.data.success){
            localStorage.clear()
            message.success('successfully logged out')
            navigate('/login')

          }else{
            message.error(res.data.message)
          }

        }catch(e){
         dispatch(hideLoading())   
         message.error('Something went wrong')
         console.log(e)
        }
    }

    useEffect(()=>{
        fun()
    },[])
    return(
        <>
          
        </>
    )
}

export default Logout
