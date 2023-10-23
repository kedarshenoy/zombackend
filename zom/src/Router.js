import{Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Components/Home';
// import Filter from './Components/Filter'
import Filterparent from './Components/Filterparent'
import Detailsfunc from './Components/Details'
// import Try from './Components/Filter'



const Router =()=>{
    return(
        <BrowserRouter>

        
        <Routes>
           
        <Route exact path='/' Component={Home}/>
        <Route path='/home' Component={Home}/>
        <Route path='/details/:id' Component={Detailsfunc}/>
        <Route path='/filter' Component={Filterparent}/>
        {/* <Route path='/try' Component={Try}/> */}

        </Routes>

        </BrowserRouter>
    );
}

export default Router