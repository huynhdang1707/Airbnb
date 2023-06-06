import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainLayout from './layout/MainLayout';
import Home from './modules/Home/Home';
function App(){
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Home/>}/>
        </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
