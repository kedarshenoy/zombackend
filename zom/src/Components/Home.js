// import 'bootstrap/dist/css/bootstrap.min.css';
import Homebackground from "./Homebackground";
import { Component } from "react";
import Quicksearch from "./Quicksearch";
// import "bootstrap"
import ('../Styles/home.css')


class Home extends Component{

render(){
    return(
        <>
        {/* <div className="mg-30" >fgght</div> */}
        <Homebackground></Homebackground>
        <Quicksearch/>
        
        
        </>
    )
}
}  

export default Home
