import { getValue } from "@testing-library/user-event/dist/utils"
import { Fragment, useState ,useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { form_data_storage,user_select,user_main, user_delete } from "../../Home/components/api"
const User_main=(({choose,setchoose,token,user_name,g})=>{
    const nevigate=useNavigate()
    const [button_text,set_button_text]=useState({
        text:["更改資料","儲存"],
        now_text:"更改資料"
    })
    const [update,set_update]=useState(true)
    const [form_data_show,set_form_data_show]=useState({
        first_name:"",
        last_name:"",
        phone_number:"",
        sexual:'女',
        position:'店長',
        salary:"",
        email:"",
        password:"",
        password_again:""
    })
    const [form_data,set_form_data]=useState({
        first_name:"",
        last_name:"",
        phone_number:"",
        sexual:'女',
        position:'店長',
        salary:"",
        email:"",
        password:"",
        password_again:""
    })
    function create_employee(){
        if(form_data.password!==form_data.password_again){alert("密碼不相等")}
        else if(!form_data.first_name){alert("check your first name")}
        else if(!form_data.last_name){alert("check your last name")}
        else if(form_data.phone_number===0){alert("check your phone_number")}
        else if(form_data.salary===0){alert("check your salary")}
        else if(!form_data.email){alert("check your email")}
        else{
            
            //填完表單後reset
            form_data_storage(token,user_name,form_data)
            user_select(token,user_name,setchoose)
            g.current=false
            
            set_form_data({
                first_name:"",
                last_name:"",
                phone_number:"",
                sexual:'女',
                position:'店長',
                salary:"",
                email:"",
                password:"",
                password_again:""
            })


            
        }
    }
    function handleinput(event){
        var name=event.target.name
        var target=event.target
        if(name==='first_name'){
            set_form_data({...form_data,first_name:target.value})
            console.log(target.value)}
        else if(name==='last_name'){
            set_form_data({...form_data,last_name:target.value})
            console.log(target.value)}
        else if(name==='phone_number'){
            set_form_data({...form_data,phone_number:target.value})
            console.log(target.value)}
        else if(name==='sexual'){
            set_form_data({...form_data,sexual:target.value})
            console.log(target.value)}
        else if(name==='position'){
            set_form_data({...form_data,position:target.value})
            console.log(target.value)}
        else if(name==='salary'){
            set_form_data({...form_data,salary:target.value})
            console.log(target.value)}
        else if(name==='email'){
            set_form_data({...form_data,email:target.value})
            console.log(target.value)}
        else if(name==='password'){
            set_form_data({...form_data,password:target.value})
            console.log(target.value)}
        else if(name==='password_again'){
            set_form_data({...form_data,password_again:target.value})
            console.log(target.value)}
    }
    useEffect(()=>{
        //var email=choose.employee_email[choose.now_employee]
        //user_main(token,user_name,email,set_form_data)
        if(choose.now_employee===-1){
            set_button_text({...button_text,now_text:button_text.text[0]})
            set_update(true)
            set_form_data({
            first_name:"",
            last_name:"",
            phone_number:"",
            sexual:'女',
            position:'店長',
            salary:"",
            email:"",
            password:"",
            password_again:""
        })
        }else{
        var email=choose.employee_email[choose.employee.indexOf(choose.now_employee)]
        console.log("now_employee的信箱",email)
        user_main(token,user_name,email,set_form_data_show)
        }


    },[choose.now_employee])
    async function switch_button(){
        //如果按下去的時候為更改資料  就把按鈕文字射程"儲存"並且把disable改為false 可更改的狀態
        if(button_text.text.indexOf(button_text.now_text)===0){
            set_button_text({...button_text,now_text:button_text.text[1]})
            set_update(false)
        }
        //如果按下去的時候為儲存  就把按鈕文字射程"更改資料"並且把disable改為true 不可更改的狀態
        //按為儲存後 就把人刪掉在新增
        else{
            if(form_data_show.password!==form_data_show.password_again){alert("密碼不相等")}
            else if(!form_data_show.first_name){alert("check your first name")}
            else if(!form_data_show.last_name){alert("check your last name")}
            else if(form_data_show.phone_number===0){alert("check your phone_number")}
            else if(form_data_show.salary===0){alert("check your salary")}
            else if(!form_data_show.email){alert("check your email")}
            else{
                console.log(" im first name",form_data_show.first_name)
                await user_delete(token,user_name,choose.employee_email[choose.employee.indexOf(choose.now_employee)]).then(()=>{
                    form_data_storage(token,user_name,form_data_show)
                    user_select(token,user_name,setchoose)
                    g.current=false
                    
                    set_button_text({...button_text,now_text:button_text.text[0]})
                    set_update(true)
            
                })
            }
        }
    }

    function handleinput_show(event){
        var name=event.target.name
        var target=event.target
        if(name==='first_name'){
            set_form_data_show({...form_data_show,first_name:target.value})
            console.log(target.value)}
        else if(name==='last_name'){
            set_form_data_show({...form_data_show,last_name:target.value})
            console.log(target.value)}
        else if(name==='phone_number'){
            set_form_data_show({...form_data_show,phone_number:target.value})
            console.log(target.value)}
        else if(name==='sexual'){
            set_form_data_show({...form_data_show,sexual:target.value})
            console.log(target.value)}
        else if(name==='position'){
            set_form_data_show({...form_data_show,position:target.value})
            console.log(target.value)}
        else if(name==='salary'){
            set_form_data_show({...form_data_show,salary:target.value})
            console.log(target.value)}
        else if(name==='email'){
            set_form_data_show({...form_data_show,email:target.value})
            console.log(target.value)}
        else if(name==='password'){
            set_form_data_show({...form_data_show,password:target.value})
            console.log(target.value)}
        else if(name==='password_again'){
            set_form_data_show({...form_data_show,password_again:target.value})
            console.log(target.value)}
    }

    function select(){
        if(choose.switch===0){
            return(
                <Fragment>
                <form>
                <div>
                <span>姓氏:</span>
                <input disabled={update} required placeholder="請輸入姓" name="first_name" value={form_data_show.first_name} onChange={(event)=>handleinput_show(event)} type="text" />
                <br/>
                </div>
    
                <div>
                <span>名字:</span>
                <input disabled={update} required placeholder="請輸入名字" name="last_name" type="text" value={form_data_show.last_name}onChange={(event)=>handleinput_show(event)}/>
                <br/>
                </div>
    
                <div>
                <span>聯絡電話:</span>
                <input disabled={update}required  placeholder="請輸入聯絡電話" type="number" name="phone_number" value={form_data_show.phone_number}onChange={(event)=>handleinput_show(event)}/>
                <br/>
                </div>
    
                <div>
                <span>性別:</span>
                <select disabled={update}required  name="sexual"  value={form_data_show.sexual} onChange={(event)=>handleinput_show(event)} >
                    <option selected value="女">女</option>
                    <option value="男">男</option>
    
                </select>
                <br/>
                </div>

                <div>
                <span>職位:</span>
                <select disabled={update} required name="position" value={form_data_show.position} onChange={(event)=>handleinput_show(event)}>
                    <option selected value="店長">店長</option>
                    <option value="副店長">副店長</option>
                    <option value="正職">正職</option>
                    <option value="兼職">兼職</option>

                </select>
                <br/>
                </div>
    
                <div>
                <span>薪資:</span>
                <input disabled={update} required placeholder="請輸入薪資" type="number" name="salary" value={form_data_show.salary} onChange={(event)=>handleinput_show(event)}/>
                <br/>
                </div>


                <div>
                <span>電子郵件:</span>
                <input disabled={update}required  placeholder="請輸入電子郵件" type="email" name="email" value={form_data_show.email} onChange={(event)=>handleinput_show(event)}/>
                <br/>
                </div>
    
                <div>
                <span>密碼:</span>
                <input disabled={update}required  placeholder="請輸入密碼" type="text" name="password" value={form_data_show.password} onChange={(event)=>handleinput_show(event)}/>
                <br/>
                </div>

                <div>
                <span>確認密碼:</span>
                <input disabled={update} required placeholder="請輸入密碼" value={form_data_show.password_again} type="password" name="password_again" onChange={(event)=>handleinput_show(event)}/>
                <br/>
                </div>

            </form>
            <button onClick={()=>switch_button()}>{button_text.now_text}</button>
            <button onClick={()=>{
                user_delete(token,user_name,choose.employee_email[choose.employee.indexOf(choose.now_employee)],set_form_data_show)
                g.current=1
                user_select(token,user_name,setchoose)
                
                }}>刪除員工</button>
                </Fragment>

            )
        }
        else{

            console.log(choose.switch)
            console.log("one",choose.now_employee)
            return(
            <Fragment>
                <form>
                <div>
                <span>姓氏:</span>
                <input required placeholder="請輸入姓" name="first_name" value={form_data.first_name} type="text" onChange={(event)=>handleinput(event)}/>
                <br/>
                </div>
    
                <div>
                <span>名字:</span>
                <input required placeholder="請輸入名字" name="last_name" value={form_data.last_name} type="text" onChange={(event)=>handleinput(event)}/>
                <br/>
                </div>
    
                <div>
                <span>聯絡電話:</span>
                <input required placeholder="請輸入聯絡電話" type="number" value={form_data.phone_number} name="phone_number" onChange={(event)=>handleinput(event)}/>
                <br/>
                </div>
    
                <div>
                <span>性別:</span>
                <select name="sexual" onChange={(event)=>handleinput(event)} >
                    <option selected value="女">女</option>
                    <option value="男">男</option>
    
                </select>
                <br/>
                </div>

                <div>
                <span>職位:</span>
                <select name="position" onChange={(event)=>handleinput(event)} >
                    <option selected value="店長">店長</option>
                    <option value="副店長">副店長</option>
                    <option value="正職">正職</option>
                    <option value="兼職">兼職</option>
    
                </select>
                <br/>
                </div>
    
                <div>
                <span>薪資:</span>
                <input required placeholder="請輸入薪資" value={form_data.salary} type="number" name="salary" onChange={(event)=>handleinput(event)}/>
                <br/>
                </div>


                <div>
                <span>電子郵件:</span>
                <input required placeholder="請輸入電子郵件" value={form_data.email} type="email" name="email" onChange={(event)=>handleinput(event)}/>
                <br/>
                </div>
    
                <div>
                <span>密碼:</span>
                <input required placeholder="請輸入密碼" value={form_data.password} type="password" name="password" onChange={(event)=>handleinput(event)}/>
                <br/>
                </div>
    
                <div>
                <span>確認密碼:</span>
                <input required placeholder="請輸入密碼" value={form_data.password_again} type="password" name="password_again" onChange={(event)=>handleinput(event)}/>
                <br/>
                </div>
            </form>
                
                <button onClick={create_employee}>確認新增</button>
        </Fragment>
            )
        }
    }
    

    return(
    <div className="user_main">
            {
                select()
            }
    </div>
    )
})
export default User_main