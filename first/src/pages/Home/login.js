import { useState ,useEffect} from "react"
import { useNavigate} from "react-router-dom"
import {sub} from "./components/api"

const Login=({setlog})=>{
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [style,changestyle]=useState("")
    let navigate=useNavigate()
    //用useeffect去判斷如果回到login頁面時帶有token 就把它帶回去backstage
    useEffect(()=>{
        if(window.sessionStorage.getItem('token')){
        navigate("/backstage")}
    })
    const key_press_enter=(event)=>{
        if(event.key==="Enter"||event.key==="enter"){
            sub(email,password,navigate)
        }
    }
    
    //這裡是return登入頁面
    return (
    <div className="login">
    <div className="all">
        
    <form >
        <div >
            LOG IN
        </div>
        <div >

            <input type="email" 
            placeholder="email" 
            onKeyDown={(event)=>key_press_enter(event)
                        } 
            value={email} 
            onChange={(e)=>setemail(e.target.value)} 
            name="email" required/>
        </div>
        <div >

            <input 
            type="password" 
            placeholder="password" 
            onKeyDown={(event)=>key_press_enter(event)
                        }
            value={password} 
            onChange={(e)=>setpassword(e.target.value)} 
            name="password" required/>
        </div>
        <div >
            <input type="button" value="登入" to="/backstage" onClick={()=>sub(email,password,navigate)} required/>
        </div>
    </form>
    </div>
    </div>)
}
export default Login