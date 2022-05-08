import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./Client/Home";
import LoginPage from "./Login/LoginPage";
import AdminPage from "./Admin/AdminPage"
import { BrowserRouter,Routes,Route} from "react-router-dom";

const App =() =>{
  return(
      <div style={{height: "auto", paddingBottom: "72.9vh"}}>
          <Routes>
              <Route path = '/' element = {<LoginPage />}/>
              <Route path = '/home/*' element = {<Home/>}/>
              <Route path = '/user/:username' element = {<Home/>}/>
              <Route path = '/admin/*' element = {<AdminPage/>}/>
          </Routes>
      </div>
  );
};



export default App;
