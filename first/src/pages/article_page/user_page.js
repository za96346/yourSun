import User_bar from "./article_component/user_bar"
import User_main from "./article_component/user_main"
import { useState,useEffect, useRef } from "react"
import { user_select } from "../Home/components/api"
const User_page=({page,user})=>{
    const [choose,setchoose]=useState({
        employee_email:"",
        employee:[],
        switch:1,
        now_employee:-1,
    })

    const g=useRef()
    var token=window.sessionStorage.getItem('token')
    var user_name=window.sessionStorage.getItem('user_name')

    useEffect(() => {

        user_select(token,user_name,setchoose)
        
        g.current=true
    },[g.current]);
    return( 
    <div className="user">

        <User_bar setchoose={setchoose} choose={choose} token={token} user_name={user_name}/>
        <User_main  g={g} setchoose={setchoose} choose={choose} token={token} user_name={user_name} />

    </div>
    )
}
export default User_page