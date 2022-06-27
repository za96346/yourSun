import { Fragment,useEffect } from "react"

const Report_main=({getReport,index,style})=>{
    function component_head(index){
        if(index!==1){
            return(
                <tr>
                        <th>日期</th>
                        <th>項目</th>
                        <th>數量</th>
                        <th>金額</th>

                    </tr>
            )
        }else{
            return(
                <tr>
                        <th>日期</th>
                        <th>項目</th>
                        <th>數量</th>
                        <th>金額</th>
                        <th>淨額</th>
                    </tr>
            )
        }

    }
    function component_body(index){
        console.log(index)
        var dif=[]
        if(index!==1){
                  return(
            getReport.dates.map((item,index)=>{
                return(
                <tr key={index}>
                    <td>{item}</td>
                    <td>{getReport.list[index]}</td>
                    <td>{getReport.amount[index]}</td>
                    <td>{getReport.total[index]}</td>
                </tr>
                )}
            )
        )
        }else{
            return(
                getReport.dates.map((item,index)=>{
                    return(
                    <Fragment>
                    
                    <tr key={index}>
                        <td>{item}</td>
                        <td>{getReport.list[index]}</td>
                        <td>{getReport.amount[index]}</td>
                        <td>{getReport.total[index]}</td>
                        <td>{getReport.last_price[index]}</td>
                    </tr>
                    </Fragment>
                    )}
                )
            )
        }
  
    }


    return(
        <div className={style}>
        <table>
            {
                component_head(index)
            }

        {
           component_body(index)
        }
        </table>
        </div>
    )
}
export default Report_main