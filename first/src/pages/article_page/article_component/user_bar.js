const User_bar=(({choose,setchoose})=>{
    function set_user_page(index){
        setchoose({...choose,now_employee:choose.employee[index],switch:0})
    }
    function setstyle(index){
        if(choose.now_employee===choose.employee[index]|| index===choose.now_employee){
            return "tt2"
        }
        else{return "tt1"}
    }
    return(
        
    <div className="user_bar">
        {
            choose.employee.map((item,index)=>{
                return(
                    <a className={setstyle(index)} onClick={()=>set_user_page(index)} key={index}><div>{item}</div></a>
                )
            })
        }
    <a className={setstyle(-1)} onClick={()=>setchoose({...choose,switch:1,now_employee:-1})}><div>✚</div></a>
    </div>
    )
})
export default User_bar