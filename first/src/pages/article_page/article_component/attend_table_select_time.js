import { calculateNewValue } from "@testing-library/user-event/dist/utils"
import { Fragment,useEffect } from "react"
import {attend_job_insert} from "../../Home/components/api"

export function insert_worktime_to_table(key_for_element,job_table,set_switch_element,switch_element){
    var data_list=[]
    var token=window.sessionStorage.getItem('token')
    var user_name=window.sessionStorage.getItem('user_name')
    var date=job_table.date[key_for_element%10]
    var email=job_table.email[parseInt(key_for_element/10)]
    var start_work=window.sessionStorage.getItem(key_for_element+"上班")
    var off_work=window.sessionStorage.getItem(key_for_element+"下班")
    set_switch_element({...switch_element,now_element:-1})
    console.log(email)
    data_list.push(token,user_name,date,email,start_work,off_work)
    return data_list
    
}

export function Attend_table_select_thing(){
    return(
    <td >
        <select>
            <option selected value="請選擇">請選擇</option>
            <option value="店休">店休</option>
            <option value="訂貨">訂貨</option>
            <option value="送貨">送貨</option>
            <option value="茶桶">茶桶</option>
            <option value="茶壺">茶壺</option>
        </select>
    </td>
    )
}


export function Attend_table_cal_hours(key_for_element,job_table,set_job_table,method){

    console.log("----------------------------------------------")
    console.log("key_for_element",key_for_element)
    console.log("上班",window.sessionStorage.getItem(key_for_element+"上班"))
    console.log("下班",window.sessionStorage.getItem(key_for_element+"下班"))

    var work_time_start=window.sessionStorage.getItem(key_for_element+"上班")
    var work_time_end=window.sessionStorage.getItem(key_for_element+"下班")

    var work_hour_diff=Math.abs(+(work_time_start.slice(0,2)+'' -  +(work_time_end.slice(0,2)+'')))
    var work_min_diff=Math.abs(+(work_time_start.slice(3,5)+'' -  +(work_time_end.slice(3,5)+'')))
    if(work_min_diff===30){
        work_min_diff=0.5
    }
    var row_index =parseInt(key_for_element/10)
    var row_arr=job_table.row_hours
    if(method==="+"){
        row_arr.splice(row_index,1,row_arr[row_index]+work_hour_diff+work_min_diff)
    }
    else if(method==="-"){
        row_arr.splice(row_index,1,row_arr[row_index]-(work_hour_diff+work_min_diff))
    }
    set_job_table({...job_table,row_hours:row_arr})

    console.log("hours",row_arr)
    console.log("hour_diff",work_hour_diff)
    console.log("min_diff",work_min_diff)
    console.log("full_hour_diff",work_hour_diff+work_min_diff)
    console.log("----------------------------------------------")
}



export function Attend_table_td_switch({switch_element,set_switch_element,job_table,set_job_table,key_for_element}){
    function x(){
        if(switch_element.now_element===key_for_element){
            console.log("now_element",switch_element.now_element)
            console.log("key_for_element",key_for_element)
            //console.log(employee_index,date_index)

            return(
                <>
                <Attend_table_td
                    job_table={job_table}
                    set_job_table={set_job_table}
                    key_for_element={key_for_element}
                    set_switch_element={set_switch_element}
                    switch_element={switch_element}/><br/>
                </>
                )
        }
        else if(window.sessionStorage.getItem(key_for_element+"上班")&&window.sessionStorage.getItem(key_for_element+"下班")){

            var work_time_start=window.sessionStorage.getItem(key_for_element+"上班")
            var work_time_end=window.sessionStorage.getItem(key_for_element+"下班")

            return(
                <>
                <div onClick={()=>

                    set_switch_element({...switch_element,now_element:key_for_element})}>
                        <button >上班{work_time_start}</button>
                        <button >下班{work_time_end}</button>
                </div>
                <button onClick={()=>{

                    
                    window.sessionStorage.removeItem(key_for_element+"上班")
                    window.sessionStorage.removeItem(key_for_element+"下班")
                    set_switch_element({...switch_element,now_element:-1})}
                    }>刪除</button><br/>
                </>
            )
        }

        else{
            return(
                <>
                    <button onClick={()=>
                        set_switch_element({...switch_element,now_element:key_for_element})} style={{width:"8vw"}}>+</button><br/>
                    
                </>
            )
        }

    }


    return(
        <Fragment>
            {
                x()
            }
        </Fragment>
    )



}


export function Attend_table_td({switch_element,set_switch_element,key_for_element,job_table,set_job_table}){
    return(
        
    <>
        <a style={{fontSize:"8px"}}>上班 : </a>

        <Attend_table_select_time
            job_table={job_table}
            set_job_table={set_job_table}
            work={"上班"}
            key_for_element={key_for_element}
            set_switch_element={set_switch_element}
            switch_element={switch_element} 
            /><br/>
        <a style={{fontSize:"8px"}}>下班 : </a>

        <Attend_table_select_time
            job_table={job_table}
            set_job_table={set_job_table}
            work={"下班"}
            key_for_element={key_for_element}
            set_switch_element={set_switch_element} 
            switch_element={switch_element} 
            />
    </>
    )
}


export function Attend_table_select_time({switch_element,set_switch_element,key_for_element,work,job_table,set_job_table}){
    var hour_arr=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
    var minute_arr=["00","30"]
    var each_time_arr=[]
    for(let i=0;i<24;i++){
        each_time_arr.push(hour_arr[i]+":"+minute_arr[0])
        each_time_arr.push(hour_arr[i]+":"+minute_arr[1])
    }

        return(
            
            <select 
                value={
                    window.sessionStorage.getItem(key_for_element+work)
                } 
                onChange={(e)=>{
                    
                    if(e.target.value!=="請選擇"){
                        window.sessionStorage.setItem(key_for_element+work,e.target.value)
                    }
                    if((window.sessionStorage.getItem(key_for_element+"上班")&&work==="下班")
                        ||(window.sessionStorage.getItem(key_for_element+"下班")&&work==="上班")){
                        
                        var list=insert_worktime_to_table(key_for_element,job_table,set_switch_element,switch_element)

                        attend_job_insert(list[0],list[1],list[2],list[3],list[4],list[5])
                        console.log("insett_worktime_to_table_function: ",list)
                    }


                }}>
            <option defaultValue="請選擇">請選擇</option>
            {
                each_time_arr.map((item,index)=>{
                    return(

                        <option key={index} value={item}>{item}</option>
                    )
                })
            }
        </select>
    )
}