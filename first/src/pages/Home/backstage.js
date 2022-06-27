import Article from "./components/article";
import Sidebar from "./components/sidebar"
import Title from "./components/title"
import { Fragment, useState,useEffect, useRef } from "react";
import { useNavigate, } from "react-router-dom";
import { verity_user_token } from "./components/api";


const Backstage=({page})=>{
  const [sidebar1,set_sidebar1]=useState({
    style1:"sidebar",
    style2:"sidebar_icon2"
  })
  const [sidebar2,set_sidebar2]=useState({
    style1:"sidebar_phone",
    style2:"sidebar_icon"
  })
  const navigate=useNavigate()
    var token=window.sessionStorage.getItem('token')
    var user_name=window.sessionStorage.getItem('user_name')
    const g=useRef(false)
    //每次進來後台都要去判斷 是否有token 如果沒有就跳轉頁面且不顯示後台
    function right(){
      if(token){
        verity_user_token(token,user_name,navigate)
        return(
          <Fragment >
            <div className="container">
              <Title/>
              <Sidebar sidebar={sidebar1} set_sidebar={set_sidebar1} page={page}/>
              <Sidebar sidebar={sidebar2} set_sidebar={set_sidebar2} page={page}/>
              </div>
              
              <Article page={page}/>
          </Fragment>)
      }
      else{ 
        navigate("/")
      }
    }
    useEffect(()=>{
      if(!token){navigate("/")}
    })


    return(
    <Fragment >
      {right()}
    </Fragment>
    )
}
export default Backstage