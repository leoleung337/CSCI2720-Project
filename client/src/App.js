import Home from "./Client/Home";
import LoginPage from "./Login/LoginPage";
import { BrowserRouter,Routes,Route} from "react-router-dom";

const App =() =>{
  return(
      <div style={{height: "auto", paddingBottom: "72.9vh"}}>
          <Routes>
              <Route path = '/' element = {<LoginPage />}/>
              <Route path = '/home/*' element = {<Home/>}/>
          </Routes>
      </div>
  );
};



export default App;
