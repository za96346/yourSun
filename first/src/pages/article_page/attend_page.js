import { Fragment,useState,useEffect } from "react";
import Attend_map from "./article_component/attend_map";
import Attend_table from "./article_component/attend_table";
import { attend_user_select } from "../Home/components/api"
const Attend_page = ({reload}) => {
    const [shop_user_position, set_shop_user_position] = useState({
        user_lat:0,
        user_lon:0,
        shop_lat:25.05595911252863,
        shop_lon:121.52555348811515,
        each_distance:0
    });
    const [job_table,set_job_table]=useState({
      employee:[],
      email:[],
      date:["3/1","3/2","3/3","3/4","3/5","3/6","3/7"],
      week_day:['一','二','三','四','五','六','日'],
      row_hours:[0,0,0,0,0,0,0,0,0,0],
      column_hours:["0","0","0","0","0","0","0"]
  })
  var token=window.sessionStorage.getItem('token')
  var user_name=window.sessionStorage.getItem('user_name')

  useEffect(()=>{
    attend_user_select(token,user_name,set_job_table,job_table)
    
  },[job_table.date])


      //this function is calculate distance of two postion
      //(one is shop ,other one is user)
      function cal_distance(){
        const R = 6371e3; // metres
        const φ1 = shop_user_position.shop_lat * Math.PI/180; // φ, λ in radians
        const φ2 = shop_user_position.user_lat * Math.PI/180;
        const Δφ = (shop_user_position.user_lat-shop_user_position.shop_lat) * Math.PI/180;
        const Δλ = (shop_user_position.user_lon-shop_user_position.shop_lon) * Math.PI/180;
        
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        const d = R * c; // in metres
        console.log(d)
        set_shop_user_position({...shop_user_position,each_distance:d})
        
      }
      function success(position){
        console.log(position)
        set_shop_user_position({...shop_user_position,user_lat:position.coords.latitude ,user_lon:position.coords.longitude})
        console.log("Latitude is :", shop_user_position.user_lat);
        console.log("Longitude is :", shop_user_position.user_lon);
        cal_distance()
        }
    function getPosition(){
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition((position)=>success(position));
      }else{
          alert("您的浏览器不支持地理定位");
        }
    }



    
      
    
    return (
        <Fragment>
          <div className="">
          {
            <Attend_table attend_table_style={"attend_table_style"} job_table={job_table} set_job_table={set_job_table}/>
          }

          




{/*
              <div className="attend_map">
                <Attend_map />
              </div>
*/}
          </div>
         </Fragment>
    )

}
export default Attend_page