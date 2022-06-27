import { calculateNewValue } from "@testing-library/user-event/dist/utils"
import { useState } from "react"
import { Attend_table_td ,Attend_table_select_thing,Attend_table_td_switch} from "./attend_table_select_time"

const Attend_table = ({job_table,set_job_table,attend_table_style}) => {
    const [switch_element,set_switch_element]=useState({
        now_element:-1,
        now_select:-1,

    })




    return(
        <div className={attend_table_style}>
            <table border="1">
                <tr>
                    <th >員工</th>

                    {
                        job_table.date.map((item,index)=>{
                            return(
                                <>
                                    <td>
                                        {item}
                                        <p>星期({job_table.week_day[index]})</p>
                                    </td>

                                    
                                </>
                            )
                        })
                    }
                    <th rowSpan={"2"}>時數</th>
                </tr>
                <tr>
                    <td>每日要事</td>
                    {
                        job_table.date.map((index)=>{

                            return(
                                <Attend_table_select_thing />
                                
                            )
                        })
                    }

                </tr>
                {/*第三裂開死 */}
                <tbody>
                    {
                        
                        job_table.employee.map((employee,employee_index)=>{
                            
                            return(
                                <tr key={employee_index}>
                                    <td>{employee}</td>
                                    {
                                        job_table.date.map((date,date_index)=>{
                                            var ele_index= +(employee_index+''+date_index+'')
                                            //console.log(ele_index)
                                            return(
                                                <td>
                                                <Attend_table_td_switch
                                                job_table={job_table}
                                                set_job_table={set_job_table}
                                                key_for_element={ele_index}
                                                key={ele_index}
                                                set_switch_element={set_switch_element} 
                                                switch_element={switch_element}/>

                                                <Attend_table_td_switch
                                                job_table={job_table}
                                                set_job_table={set_job_table}
                                                key_for_element={ele_index+100000}
                                                key={ele_index+100000}
                                                set_switch_element={set_switch_element} 
                                                switch_element={switch_element}/>
                                                
                                                </td>
                                            )
                                        })
                                    }
                                    <td>{job_table.row_hours[employee_index]}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                    <tr>
                        <td>總計時數</td>
                        {
                        job_table.date.map((item,index)=>{
                            return(
                                <td></td>
                            )
                        })
                        }
                        <td></td>
                        
                    </tr>


            </table>
        </div>
    )


}
export default Attend_table