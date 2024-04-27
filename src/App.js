// import Form from "./component/Form/form";
// import Usememo from "./component/usememo/Memo"
import Register from './page/Register';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import ViewMessage from './component/Auth/message'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import RealTimeDBAdd from "./component/Firebase/Firebaserealtimecrud/Add";
import List from "./component/Firebase/Firebaserealtimecrud/List";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path ='/' element={<ViewMessage/>}/>
          <Route path ='/' element={<Register/>}/>
          <Route path ='/login' element={<Login/>}/>
          <Route path ='/dashboard' element={<Dashboard/>}/>
          <Route path="/FirebaseRealTimeDB" element={<RealTimeDBAdd />} />
          <Route path="/RealTimeDBList" element={<List />} />
        </Routes>
      </BrowserRouter>
      
    </>
    );
}

export default App;
