import {get_data} from "../../Home/components/api"
const Report_nav_buttom=({ style, changestyle,token,date,date2,user_name,setReport})=>{
    function nav_buttom_change_style(index){
        if(style.acount===1){
            changestyle({...style,now_date:date})
        }
        if(index===0 && style.acount!==1 &&style.acount>=1){
            var d_diff =new Date(style.now_date);
            d_diff.setDate(d_diff.getDate() - 1);
            changestyle({...style,date_arr:["◀",style.acount-1,"▶"],acount:style.acount-1,now_date:d_diff})
            get_data(token,d_diff.toISOString().slice(0, 10),user_name,setReport,style.record_nav)
            console.log(d_diff.toISOString().slice(0, 10));
        }
        else if(index===2 && style.acount<=style.date_activity){
            var d_plus =new Date(style.now_date);
            d_plus.setDate(d_plus.getDate() + 1);
            changestyle({...style,date_arr:["◀",style.acount+1,"▶"],acount:style.acount+1,now_date:d_plus})

            get_data(token,d_plus.toISOString().slice(0, 10),user_name,setReport,style.record_nav)
            console.log(d_plus.toISOString().slice(0, 10));
            
        }
    }
    function key_press_down(event,index){
        if(event.key===39){
            nav_buttom_change_style(index)}
    }
    return(
        <div className="report_nav_buttom">
        {   style.date_arr.map((item,index)=>{
                return(
                    <div onKeyDown={(event,index)=>(key_press_down(event,index))} onClick={()=>(nav_buttom_change_style(index))}>
                        <p>{item}</p>
                    </div>
                )
            })
        }
        </div>
    )

}
export default Report_nav_buttom