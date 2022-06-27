import React from "react";
import  ReactDOM  from 'react-dom';
import Home from './pages/Home'


//放入口主目錄即時畫板 （把元件匯入）

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
)



