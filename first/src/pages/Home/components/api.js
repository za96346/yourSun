import axios from "axios"
import env from "react-dotenv"
import { useNavigate } from "react-router-dom"
import { Sort } from "./sort"

const config={
    method:"POST",
    url:'http://localhost:5000/backstage',
    
}


export async function attend_job_insert(token,user_name,date,email,start_work,off_work){
    console.log(token)
    await axios({
        method:'POST',
        url:'http://localhost:5000/backstage/attend/job_insert',
        data:{
            'date':date,
            'email':email,
            'start_work':start_work,
            'off_work':off_work
        },
        headers:{
            'Content-Type': 'application/json',
            'token':token,
            'user_name':user_name,
            'Access-Control-Allow-Origin':'*'
        }
    }).then((response)=>{
        console.log(response)

    }).catch((error)=>{
        console.log(error)
    })


}




export async function verity_user_token(token,user_name,nevigate){
    await axios({
        method:'POST',
        url:'http://localhost:5000/backstage/check',
        headers:{
            'Content-Type': 'application/json',
            'token':token,
            'user_name':user_name,
            'Access-Control-Allow-Origin':'*'
        }
        
    }).then((response)=>{
        console.log(response.data)
        return true
    }).catch((error)=>{
        
        window.sessionStorage.removeItem('token')
        console.log(error)
        nevigate("/login")
        return false
    })
}

export async function attend_user_select(token,user_name,set_job_table,job_table){
    await axios({
        method:'POST',
        url:'http://localhost:5000/backstage/attend_user_select',
        headers:{
            'Content-Type': 'application/json',
            'token':token,
            'user_name':user_name,
            'Access-Control-Allow-Origin':'*'
        }
        
    }).then((response)=>{
        var employee_list=[]
        var email_list=[]
        var data=response.data
        console.log("response length",data.length)
        
        for(let i=0;i< data.length;i++){
            employee_list.push(data[i][0]+" "+data[i][1])
            email_list.push(data[i][2])
        }
        console.log("employee", employee_list)
        set_job_table({...job_table,employee:employee_list,email:email_list})

        
    }).catch((error)=>{
        alert(error)
    })
}

//user_page
export async function user_delete(token,user_name,email){
    await axios({
        method:'POST',
        url:'http://localhost:5000/backstage/user/delete',
        data:{'email':email},
        headers:{
            'Content-Type': 'application/json',
            'token':token,
            'user_name':user_name,
            'Access-Control-Allow-Origin':'*'
        }
        
    }).then((response)=>{

        
    }).catch((error)=>{
        console.log(error)
    })
}

//user_page
export async function user_main(token,user_name,email,set_form_data_show){
    await axios({
        method:'POST',
        url:'http://localhost:5000/backstage/user/main',
        data:{'email':email},
        headers:{
            'Content-Type': 'application/json',
            'token':token,
            'user_name':user_name,
            'Access-Control-Allow-Origin':'*'
        }
        
    }).then((response)=>{
        var data=response.data
        console.log("user_main_api-",response.data)
        set_form_data_show({  
            first_name:data[1],
            last_name:data[2],
            phone_number:data[3],
            sexual:data[4],
            position:data[5],
            salary:data[6],
            email:data[0],
            password:data[7]
    })
    

        
    }).catch((error)=>{
        console.log(error)
    })
}

//user_page
export async function form_data_storage(token,user_name,form_data){
    console.log("api--------",form_data.first_name)
    await axios({
        method:'POST',
        url:'http://localhost:5000/backstage/user/insertform',
        data:{
            'first_name':form_data.first_name,
            'last_name':form_data.last_name,
            'phone_number':form_data.phone_number,
            'sexual':form_data.sexual,
            'position':form_data.position,
            'salary':form_data.salary,
            'email':form_data.email,
            'password':form_data.password
        },
        headers:{
            'Content-Type': 'application/json',
            'token':token,
            'user_name':user_name,
            'Access-Control-Allow-Origin':'*'
        }
        
    }).then((response)=>{
        console.log(response.data)

    }).catch((error)=>{
        console.log(error.response.data)
    })
}

//user_page
export async function user_select(token,user_name,setchoose){
    await axios({
        method:'POST',
        url:'http://localhost:5000/backstage/user',
        headers:{
            'Content-Type': 'application/json',
            'token':token,
            'user_name':user_name,
            'Access-Control-Allow-Origin':'*'
        }
        
    }).then((response)=>{
        var employee_list=[]
        var employee_email_list=[]
        var data=response.data
        console.log("response length",data.length)
        
        for(let i=0;i< data.length;i++){
            employee_list.push(data[i][0]+" "+data[i][1])
            employee_email_list.push(data[i][2])

        }
        console.log("employee", employee_list)
    
        setchoose({
            employee_email:employee_email_list,
            employee:employee_list,
            switch:1,
            now_employee:-1
        })
        
    }).catch((error)=>{
        alert(error.response.data)
    })
}


//report_page
export async function upload_csv(token,formdata,user_name){

    await axios.post('http://localhost:5000/backstage/report/upload',
            formdata,
        {
            headers:{
                'content-type':'multipart/form-data',
                'token':token,
                'user_name':user_name
            }
        }
    ).then((response)=>{

        
        console.log(response.data)
    }).catch((error)=>{
        alert(error.response.data)
    })
}

//report_page
export async function get_data(token,date,user_name,setReport,index){
    
    var IP = "http://localhost:5000/backstage/report/"
    var url=0
    //去判斷是哪一個table_button並給予對應的url
    if(index===0){ url ='http://localhost:5000/backstage/report/dicount'}
    if(index===1){ url ='http://localhost:5000/backstage/report/pay_methods'}
    if(index===2){ url ='http://localhost:5000/backstage/report/tail'}
    if(index===3){ url ='http://localhost:5000/backstage/report/time_range'}
    if(index===4){ url ='http://localhost:5000/backstage/report/top10_type'}
    if(index===5){ url ='http://localhost:5000/backstage/report/total_deal'}
    if(index===6){url='http://localhost:5000//backstage/index/main'}

    await axios({
        method:'POST',
        url: url,
        data:{
            'date':date,
            'user_name':user_name
        },
        headers:{
            'Content-Type': 'application/json',
            'token':token,
            'Access-Control-Allow-Origin':'*'
        }
    })
    .then((response) =>{
        console.log(token)
        var arry_list,custom_list=[]
        var data=response.data
        var dates_list=[]
        var list_list=[]
        var amount_list=[]
        var total_list=[]
        var total_amount=0
        var total_money=0
        var last_price_list=[]
        var total_last=0
        if(index!==1 && index!==6){
            for(let i=0;i<data.length;i++){
                dates_list.push(data[i]['date'])
                list_list.push(data[i]['list'])
                amount_list.push(data[i]['amount'])
                total_list.push(data[i]['total'])
                total_amount+=data[i]['amount']
                total_money+=data[i]['total']
            }//如果是index4 就去做排序
            if(index===4){
                custom_list=[ '手做薰香茶', '羽上嚴選茶', '水果王國', '手沖/冷泡台灣高山茶','好農鮮乳坊','遇上后甜蜜', '職人手做甜點', '咖啡甘醇', '鍋煮厚歐蕾', '店家推薦'
                , '奶茶節護照', '羽上周邊', '經典加料', '微醺創飲', '其他', '酸甜氣泡飲']
                arry_list=[dates_list,list_list,amount_list,total_list]
                arry_list = Sort(list_list,arry_list,custom_list)

                dates_list = arry_list[0]
                list_list=arry_list[1]
                amount_list=arry_list[2]
                total_list=arry_list[3]
            }



            dates_list.push("total")
            amount_list.push(total_amount)
            total_list.push(total_money)
            

            //把存在陣列的資料送給狀態
            setReport({
                dates:dates_list,
                list:list_list,
                amount:amount_list,
                total:total_list,
                last_price:[]
            })
        }
        else{
            for(let i=0;i<data.length;i++){
                dates_list.push(data[i]['date'])
                list_list.push(data[i]['list'])
                amount_list.push(data[i]['amount'])
                total_list.push(data[i]['total'])
                last_price_list.push(data[i]['last'])
                total_amount+=data[i]['amount']
                total_money+=data[i]['total']
                total_last+=data[i]['last']
            }
            //客製化排序
            //並呼叫sort進行五個陣列的排序
            
            custom_list=['現金', 'LINE Pay','街口支付', 'NCCC','台灣pay','UberEats', '熊好券'
             ,'Foodpanda']
            
            arry_list=[dates_list,list_list,amount_list,total_list,last_price_list]
            arry_list = Sort(list_list,arry_list,custom_list)

            dates_list = arry_list[0]
            list_list=arry_list[1]
            amount_list=arry_list[2]
            total_list=arry_list[3]
            last_price_list=arry_list[4]

            
            dates_list.push("total")
            amount_list.push(total_amount)
            total_list.push(total_money)
            last_price_list.push(total_last)

            //把存在陣列的資料送給狀態
            setReport({
                dates:dates_list,
                list:list_list,
                amount:amount_list,
                total:total_list,
                last_price:last_price_list
            })

        }


    })
    .catch( (error) => {

        alert(error)
    })
}
//login
//宣告async 代表宣告裡面是同步 可以在裡面用await
export async function sub(email,password,navigate){
    var IP = "http://localhost:5000"
    await axios.post(IP,{
        email_verify:email,
        password_verify:password
    })
    
    //當有拿到正確的responense的時候 就把token,user存在session
    //然後登錄成功後就用useNavigate去到航道  /backstage
    .then( (response) =>{
        if(response.data!=='please enter right'){
            
            window.sessionStorage.setItem('token', response.data.token);
            window.sessionStorage.setItem('user_name', response.data.user_name);
            navigate("/backstage")
            alert("登入成功")
        }
    })
    //當responese 403時 就把token清空 並且跳出alert() 導航login
    .catch( 
        (error) => {
            window.sessionStorage.removeItem('token')
            alert("帳號或密碼輸入錯誤")
            navigate("/login")
        })
            
}

