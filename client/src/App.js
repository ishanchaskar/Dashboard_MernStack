import { Button } from 'antd';
import './stylesheets/theme.css';
import './stylesheets/alignments.css';
import './stylesheets/textelements.css';
import './stylesheets/custom-components.css';
import './stylesheets/form-elements.css';
import {BrowserRouter , Routes , Route } from 'react-router-dom'
import Login from './pages/common/Login';
import Register from './pages/common/Register';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Login" element = {<Login/>}/>
      <Route path="/register" element= {<Register/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
