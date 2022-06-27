
import Report_page from "../../article_page/report_page"
import Index_page from "../../article_page/index_page"
import User_page from "../../article_page/user_page"
import Statistic_page from "../../article_page/statistic_page"
import Attend_page from "../../article_page/attend_page"
import Profile_page from "../../article_page/profile_page"
import Material_page from "../../article_page/material_page"
const Article=({page})=>{
  
  //判斷是哪一個頁面並返回相扶的頁面
  function selection(page){
    
    let user = sessionStorage.getItem('user')
    if(page==="report"){return <Report_page/>}
    else if(page==="index"){return < Index_page />}
    else if(page==="user"){return <User_page user={user}/>}
    else if(page==="statistic"){return <Statistic_page />}
    else if(page==="material"){return <Material_page />}
    else if(page==="profile"){return <Profile_page />}
    else if(page==="attend"){return <Attend_page/>}
  }
  return <div className="article">
    {
      selection(page)
    }
  </div>
  }
  
  export default Article
  