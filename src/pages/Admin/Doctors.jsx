import Layout from "../../components/Layout"
import { useEffect, useState } from "react"
import { message, Table } from 'antd'
import axios from 'axios'


function Doctors(){
        const [users,setUsers]=useState([])
        const getUser=async()=>{
          try{
            const user=await axios({
                method:'get',
                url:['http://localhost:1234/api/admin/doctors'],
                withCredentials:true,
            })
             
            if(user.data.success){
              message.success(user.data.message)
              setUsers(user.data.data)
              
            }else{
                message.error(res.data.message)
            }
          }catch(e){
            console.log(e)
            message.error('something went wrong')
          }
        }

        const handleClick=async(record,status)=>{
         // window.location.reload()
          try{
              const res=await axios({
                method:'post',
                url:['http://localhost:1234/api/admin/chnageaccountstatus'],
                withCredentials:true,
                data:{doctorId:record._id,userId:record.userId,status:status},
                headers:{
                  Authorization:`Bearer ${localStorage.getItem("token")}`
                }
              })
              
              if(res.data.success){
                message.success(res.data.message)
              }else{
                message.error(res.data.message)
              }

          }catch(e){
            message.error('something went wrong')
            console.log(e)
          }
        }

        useEffect(()=>{
            getUser()
        },[])
    
        const coloums=[
            {
                title:"Name",
                dataIndex:"name",
                render:(text,record)=>(
                  <span>{record.firstname} {record.lastname}</span>
                )
            },
            {
                title:"Status",
                dataIndex:"status"
            },
            {
                title:"Phone",
                dataIndex:"phone",
            },
            {
                title:"Actions",
                dataIndex:"actions",
               render:(text,record)=>(
                <div className="d-flex">
                  {
                    record.status === "pending" ?(
                        <button className="btn btn-success" onClick={handleClick(record,'approved')}>Approve</button>
                    ):(
                         <button  className="btn btn-danger">Reject</button>
                    )}
                </div>
               )
            }
        ]
    return(
        <Layout>
        <h2 className="text-center m-2">All Doctors</h2>
        <Table columns={coloums} dataSource={users}/>
    </Layout>
    )
}

export default Doctors