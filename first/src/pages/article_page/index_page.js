import { Fragment,useState,useEffect, useRef } from "react"
import {get_data} from "../Home/components/api"
import Report_main from "./article_component/report_main"
const Index_page=()=>{
    var token=window.sessionStorage.getItem('token')
    var user_name=window.sessionStorage.getItem('user_name')
    const [get,setget]=useState({
        dates:[],
        list:[],
        amount:[],
        total:[],
        last_price:[]
        
    })
    const g=useRef(false)
    //每次reder時會去判別 如果g的值沒有改變 就不在發同樣的api
    //因為會無限的re-render
    useEffect(()=>{
        var today=new Date()
        var yyyy=today.getFullYear()
        var mm= today.getMonth()+1
        var dd= today.getDate()
        if(mm<10){mm='0'+mm}
        if(dd<10){dd='0'+dd}
        console.log(yyyy+"-"+mm+"-"+dd)
        get_data(token,yyyy+"-"+mm+"-"+dd,user_name,setget,6)
        g.current=true
    },[g])
    

    

    
    console.log("page")
    
    return ( 
    <div className="index">

        {
            <Report_main getReport={get} index={1} style={"index_main"}/>
        }
        <div>

        </div>
        <div>

        </div>
    </div>
        
            )
    

}
export default Index_page