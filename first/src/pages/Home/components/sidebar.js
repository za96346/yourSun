import { useState,useEffect, Fragment } from "react"
import { useNavigate } from "react-router-dom"

const Sidebar = ({sidebar,set_sidebar, page}) => {
    
    let navigate=useNavigate()
    //創建一個state物件 他的初始值有兩個 obj為一個帶有資料的陣列
    const [stylestate,setstyle]=useState({
        activeobject:null,
        objects:["員工管理","首頁","個人資料","物料管理","出勤狀況","查看報表","營業分析"]
    })
    

    //如果onclick就把stylestate物件解構 並且把屬性activeobject 設為被按下的obj
    function togglestyle(index){
        setstyle({...stylestate,activeobject:stylestate.objects[index]})
        let item= stylestate.objects[index]
        if(item==='員工管理'){navigate("/backstage/user")}
        else if(item==='查看報表'){navigate("/backstage/report")}
        else if(item==='首頁'){navigate("/backstage/index")}
        else if(item==='營業分析'){navigate("/backstage/statistic")}
        else if(item==='物料管理'){navigate("/backstage/material")}
        else if(item==='出勤狀況'){navigate("/backstage/attend")}
        else if(item==='個人資料'){navigate("/backstage/profile")}
    }
    //每次都要去跑玩stylestate.obj 如果陣列的東西跟stylestate.activeobject 一樣的話就改變它
    function togglechange(index){
        if(stylestate.objects[index]===stylestate.activeobject){
            return "tt2"
        }
        else{
            return "tt1"
        }
    }
    //只要url 傳進來的pages 有變動 就回傳togglestyle
    useEffect(()=>{
        console.log(page)
        if(page==="report"){return togglestyle(5)}
        else if(page==="index"){return togglestyle(1)}
        else if(page==="user"){return togglestyle(0)}
        else if(page==="statistic"){return togglestyle(6)}
        else if(page==="material"){return togglestyle(3)}
        else if(page==="profile"){return togglestyle(2)}
        else if(page==="attend"){return togglestyle(4)}        

    },[page])

    function change(){
        if(sidebar.style1==="sidebar_phone"){
            console.log("lllllll")
            set_sidebar({...sidebar,style1:"sidebar_phone2"})
        }
        else if(sidebar.style1==="sidebar_phone2"){
            console.log("lllllll")
            set_sidebar({...sidebar,style1:"sidebar_phone"})
        }
    }

    return (
        <Fragment>
        <div onClick={change} className={sidebar.style2}>
            <img src={require('../sidebar_img.png')} style={{width:"100%",height:"5vh"}}/>
        
        </div>
        <div className={sidebar.style1}>

            {/* 把創建好的state拿去跑map */}
            {stylestate.objects.map((item,index) => (
            
            <div 
                className={togglechange(index)} 
                key={index} 
                onClick={()=>{togglestyle(index)}}>{item}</div>

            ))
            }
            
        </div>
        </Fragment>)
}
export default Sidebar