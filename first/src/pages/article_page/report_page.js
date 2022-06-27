import {get_data,upload_csv} from "../Home/components/api"
import { useState ,useEffect,Fragment} from "react"
import { useNavigate, } from "react-router-dom";
import Report_main from "./article_component/report_main"
import Report_nav_buttom from "./article_component/report_nav_buttom"
import Report_nav_top from "./article_component/report_nav_top"
const Report_page=()=>{
    var token=window.sessionStorage.getItem('token')
    var user_name=window.sessionStorage.getItem('user_name')
    const [date,setdate]=useState()
    const [date2,setdate2]=useState()

    const[style,changestyle]=useState({
        record_nav:10,
        now_date:"",
        table_activity:false,
        date_activity:0,
        acount:1,
        date_arr:["◀",1,"▶"],
        table_arr:["優惠折扣","付款方式","銷售商品數前十名","熱門時段","銷售商品總類前十","營業總額"]
    })
    const [xls_file,set_xls_file]=useState("")
    const [file_name,set_file_name]=useState("choose file")
    const [getReport,setReport]=useState({
        dates:[],
        list:[],
        amount:[],
        total:[],
        last_price:[]
    })
    //拿到index 必且去對應到route 以及去變更他的style
    function diff_days(){
        
        // 跑天數
        
        var d1=new Date(date)
        var d2=new Date(date2)

        var diff=Math.abs(d2-d1)
        var days=diff/(1000 * 3600 * 24)
        //當按下確認後就要把物件的屬性重設

        changestyle({...style,date_activity:days,now_date:date, date_arr:["◀",1,"▶"],table_activity:"優惠折扣",record_nav:0,acount:1})
        console.log(days)
    }
    function handle_input(token,user_name){
        //console.log(`token:${token}`)

        const formdata=new FormData();

        formdata.append('file',xls_file)

        upload_csv(token,formdata,user_name)
    }

    return(
        <div className="report">
            <div className="report_date_btn">
                <input onChange={(e)=>setdate(e.currentTarget.value)} min="2022-03-01" value={date} type="date"/>
                <input onChange={(e)=>setdate2(e.currentTarget.value)} value={date2} type="date"/>
                <button onClick={()=>{
                    diff_days()
                    get_data(token,date,user_name,setReport,0)}}>確認</button>

                <input type="file" accept=".xls" name="file" onChange={e=>{
                    set_file_name(e.target.files[0].name)
                    set_xls_file(e.target.files[0])}}/>
                <button onClick={()=>handle_input(token,user_name)}>上傳</button>
            </div>
            
            {  
            <Fragment>
                {/*這裡是nav_top table component */}
                <Report_nav_top style={style} changestyle={changestyle} token={token} date={date} user_name={user_name} setReport={setReport}/>
                {/* 這裡是table component*/}
                <Report_main getReport={getReport} index={style.record_nav} style={"report_table"}/>
                {/* 這裡是nav_buttom 頁數 component*/}
                <Report_nav_buttom style={style} changestyle={changestyle} token={token} date={date} user_name={user_name} setReport={setReport}/>
            </Fragment>
            }
        </div>
    )
}
export default Report_page