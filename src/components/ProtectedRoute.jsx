import { Navigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/AlertSlice'
import axios from "axios";
import { setUser } from "../redux/features/UserSlice";
import { useEffect } from "react";

export default function ProtectedRoute({children}){

    const dispatch=useDispatch()
    const {user}=useSelector(state=>state.user)


    const getUser=async()=>{
       try{
            dispatch(showLoading())
            const res=await axios({
                method:'get',
                url:['http://localhost:1234/api/user/getdata'],
                withCredentials:true,
                token: localStorage.getItem("token"),
              
                headers: {
                           Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
              
            })
            dispatch(hideLoading())

            if(res.data.success){
                dispatch(setUser(res.data.data))
            }else{
                <Navigate to='/login' />
                localStorage.clear()
            }

       }catch(e){
          dispatch(hideLoading())
          localStorage.clear()
          console.log(e)
       }
    }

    useEffect(()=>{
        if(!user){
            getUser()
        }
    },[user,getUser])

    if(localStorage.getItem('token')){
        return children;
    }else{
        return <Navigate to="/login"/>
    }
}

