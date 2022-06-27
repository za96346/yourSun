import Login from "./login"
import Backstage from "./backstage";
import "./index.css"
import {BrowserRouter,Route, Routes} from "react-router-dom";
import Error_page from "../article_page/error_page";

//要大瀉
const Home = () => {
  //在index創建個個路由 只要component呼叫跳轉路由 就會重這邊選擇符合的路由 並且每個backstage路由都會夾帶page
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Login/>}/>
        <Route path="/login" exact={true} element={<Login/>}/>
        <Route path="/backstage/" exact={true} element={<Backstage page={"index"}/>}/>
        <Route path="/backstage/index" exact={true} element={<Backstage page={"index"}/>}/>
        <Route path="/backstage/report" exact={true} element={<Backstage page={"report"}/>}/>
        <Route path="/backstage/user" exact={true} element={<Backstage page={"user"}/>}/>
        <Route path="/backstage/statistic" exact={true} element={<Backstage page={"statistic"}/>}/>
        <Route path="/backstage/material" exact={true} element={<Backstage page={"material"}/>}/>
        <Route path="/backstage/attend" exact={true} element={<Backstage page={"attend"}/>}/>
        <Route path="/backstage/profile" exact={true} element={<Backstage page={"profile"}/>}/>
        <Route path="*" exact element={<Error_page/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default Home