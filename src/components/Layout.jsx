import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AdminMenu, UserMenu } from '../Data/Data'
import '../Style/LayoutStyle.css'
import { useSelector } from 'react-redux'
import { Badge } from 'antd'

function Layout({children}){

  const navigate=useNavigate()
  const {user}=useSelector(state=>state.user)
  const location=useLocation()
  //doctor Menu
  const DoctorMenu=[
    {
     name:"Home",
     path:'/',
     icon:'fa-solid fa-house'
    },
    {
      name:"Appointments",
      path:'/doctor-appointment',
      icon:'fa-solid fa-list'
    },
    {
     name:"Profile",
     path:`/doctor/profile/${user?._id}`,
     icon:'fa-solid fa-user'
    },
    {
      name:'Logout',
      path:'/logout',
      icon:'fa-solid fa-right-from-bracket'
     }
 ]
  //docot Menu
  const SidebarMenu=user?.isAdmin?AdminMenu:user?.isDoctor?DoctorMenu:UserMenu;
    return(
        <>
        <div className="main">
            <div className="layout">
              <div className="sidebar">
                <div className="logo"><h6>DOC APP</h6></div>
                <hr />
                <div className="menu">
                  {
                    SidebarMenu.map((menu)=>{
                      const isActive=location.pathname === menu.path
                      return(
                        <>
                        <div className={`menu-icon ${isActive && 'active'}`}>
                          <i className={menu.icon}></i>
                          <Link to={menu.path}>{menu.name}</Link>
                        </div>
                        </>
                      )
                    })
                  }</div>
              </div>
              <div className="content">
                <div className="header">
                 <div className="header-content" >
                 <div style={{cursor:'pointer'}}>
                 <Badge count={user && user.notification.length} onClick={()=>navigate('/notification')}>
                  <i class="fa-solid fa-bell"></i>
                 </Badge>
                 </div>
                 <Link to='/profile'>{user?.name}</Link>
                 </div>
                </div>
                <div className="body">{children}</div>
              </div>
            </div>

        </div>
        </>
    )
}

export default Layout