import {get_data} from "../../Home/components/api"
import { useEffect } from "react"
const Report_nav_top = ({ style, changestyle,token,date,user_name,setReport}) => {

    function nav_top_change_style(index) {
        console.log(token)
        get_data(token,date,user_name,setReport,index)
        changestyle({ ...style, table_activity: style.table_arr[index],record_nav:index,date_arr:["◀",1,"▶"],acount:1,now_date:date})
    }
    function nav_top_style(index) {
        if (style.table_arr[index] === style.table_activity) {
            return "tt3"
        }
    }
    return (
        <div className="report_nav_top">
            {style.table_arr.map((item, index) => {
                return (
                    <div className={nav_top_style(index)} onClick={() => (nav_top_change_style(index))}>
                    {item}
                    </div>
                )
            })
            }
        </div>
    )

}
export default Report_nav_top