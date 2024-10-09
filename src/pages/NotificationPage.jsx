import { useDispatch, useSelector } from "react-redux"
import Layout from "../components/Layout"
import { message, Tabs } from 'antd'
import axios from "axios"
import { hideLoading, showLoading } from '../redux/features/AlertSlice'

function NotificationPage(){
    const dispatch=useDispatch()
    const {user}=useSelector(state=>state.user)
    //const userId=user._id
    const handleMarkAllRead=async()=>{
      try{
           
           dispatch(showLoading())
           const res=await axios({
             method:'post',
             url:['http://localhost:1234/api/user/getallnotification'],
             withCredentials:true,
             data:{userId:user._id},
             headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
           })
           window.location.reload()
           dispatch(hideLoading())
           if(res.data.success){
            console.log(res.data.data)
             message.success(res.data.message)
           }else{
            message.error(res.data.message)
           }
      }catch(e){
        dispatch(hideLoading())
        console.log(e)
        message.error('something went wrong')
      }
    }

    const handleDeleteAllRead=async()=>{
        try{
            dispatch(showLoading())
            const res=await axios({
              method:'post',
              url:['http://localhost:1234/api/user/deleteallnotification'],
              withCredentials:true,
              data:{userId:user._id},
              headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
              }
            })
            window.location.reload()
            dispatch(hideLoading())
            if(res.data.success){
             console.log(res.data.data)
             message.success(res.data.message)
            }else{
             message.error(res.data.message)
            }
       }catch(e){
         dispatch(hideLoading())
         console.log(e.message)
         message.error('something went wrong')
       }
    }
    return(
        <Layout>
          <h4 className="p-3 text-center">Notification page</h4>
          <Tabs>
            <Tabs.TabPane tab='Read' key={0}>
                <div className="d-flex justify-content-end">
                    <h4 className="p-2" onClick={handleMarkAllRead}>Mark All Read</h4>
                </div>
                {
                    user?.notification.map((Nmsg)=>(
                        <div className="card" onClick={Nmsg.onClickPath} style={{cursor:'pointer'}}>
                            <div className="card-text">{Nmsg.message}</div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab='unRead' key={1}>
                <div className="d-flex justify-content-end">
                    <h4 className="p-2" onClick={handleDeleteAllRead}>Delete All Read</h4>
                </div>
                {
                    user?.seenNotification.map((Nmsg)=>(
                        <div className="card" onClick={Nmsg.onClickPath} style={{cursor:'pointer'}}>
                            <div className="card-text">{Nmsg.message}</div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
          </Tabs>
        </Layout>
    )
}

export default NotificationPage