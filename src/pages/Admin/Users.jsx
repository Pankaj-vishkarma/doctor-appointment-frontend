import { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import { message, Table } from 'antd'
import axios from 'axios'

function Users(){
    const [users,setUsers]=useState([])
    const getUser=async()=>{
      try{
        const user=await axios({
            method:'get',
            url:['http://localhost:1234/api/admin/users'],
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
              }
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
    useEffect(()=>{
        getUser()
    },[])

    const coloums=[
        {
            title:"Name",
            dataIndex:"name"
        },
        {
            title:"Email",
            dataIndex:"email"
        },
        {
            title:"Doctor",
            dataIndex:"isDoctor",
            render:(text,record)=>(
                <span>{record.isDoctor ? 'Yes' : 'No'}</span>
            )
        },
        {
            title:"Actions",
            dataIndex:"actions",
            render:(text,record)=>(
                <div className="d-flex">
                 <button className="btn btn-danger">Block</button>
                </div>
            )
        }
    ]
    return (
    <Layout>
        <h2 className="text-center m-2">All Users</h2>
        <Table columns={coloums} dataSource={users}/>
    </Layout>
    )
}

export default Users