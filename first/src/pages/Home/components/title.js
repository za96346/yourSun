import {useNavigate} from 'react-router-dom'
const Title=()=>{
  let navigate=useNavigate()
  //當登出的時候 session清空 並且用useNavigate去做導航到 /login
  function log_out(){
    window.sessionStorage.clear()

    navigate("/login")
  }

  return <div className='head'> 
    <p onClick={()=>navigate("/backstage")}>羽上後台管理系統</p>
    <button className='title_button' onClick={()=>{log_out()}}>登出</button>
  </div>
}

export default Title





