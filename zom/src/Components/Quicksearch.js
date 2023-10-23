import axios from "axios";
import Quicksearchoptions  from './Quicksearchoptions';
import { Component } from "react";
// import mealtype from "../../../Models/mealtype";
import ('../Styles/home.css');


class Quicksearch extends Component{


    constructor(){
        super();
        this.state={
        mealtype:[]

        }
    }

componentDidMount(){
    
axios.get("http://localhost:5403/mealtype").then(
    result=>{
        this.setState({
            mealtype:result.data.location
        })
    }


    ).catch(error=>{
        console.log("error in Quicksearch component")
    })
}




    render(){

        return(
            <>
            <div className="quicksearchsection container">
                <h1 className=" quickheading">Quick Searches</h1>
                 <h2 className=" quicksubhead">Choose restaurants</h2>

                <div className="row">
                {
                    this.state.mealtype.map((item,index)=>{
                        return(
                            <>
                         {/* <Quicksearchoptions imgsrc={require("../Assets/dinner.png")} heading={item.name} descr={item.content}/> */}
                         <Quicksearchoptions key={index} imgsrc={require("../"+item.image)} heading={item.name} descr={item.content} id={item._id} />
                         </> 
                        )

                    })
                }


              

                </div>

            </div>
            <div className=" box" >
                {/* <div className="container">
                    <div className="row">
                        <div className="col-9 mt-5">
                             <h2>A Kedar Shenoy</h2>
                             <p>This is a food ordering website I created using MERN stack. 
                                for this i have used a create react app utility to create frontend using React and used mongoose to build the backend
                             </p>
                             <p>©aks@20223</p>
                        </div>
                        <div className="col-3 mt-5">
                            <span className="mx-2">About</span>
                            <span className="mx-2">Projects</span>
                            <span className="mx-2">Me!</span>
                            <div>
                               <a href="https://github.com/kedarshenoy" target="blank"> <img className="descboximg" src={ require('../Assets/link3.png')} alt=""/></a>
                               <a href="mailto:akedarshenoy@gmail.com"> <img className="descboximg"src={ require('../Assets/link2.png')} alt=""/></a>
                                <a href="linkedin.com/in/argodu-kedar-shenoy" target="blank"><img className="descboximg"src={ require('../Assets/link1.png')} alt=""/></a>

                            </div>

                        </div>
                    </div>
                </div> */}

<footer className="footer">
    <div className="container">
        <div className="row">
            <div className="col-md-4">
                <h4>Contact Us</h4>
                <p>
                    <strong>AKS Food Ordering</strong><br/>
                    Argodu, Kamalashile,Kundapura<br/>
                    Udupi , 576229 <br/>
                    Phone: +1 (555) 123455666<br/>
                    Email: info@lookincontacts.com
                </p>
            </div>
            <div className="col-md-4">
                <h4>Follow Us</h4>
                <div className="social-icons">
                    <a href="https://github.com/kedarshenoy" className="fa fa-facebook"><img className="descboximg" src={ require('../Assets/link3.png')} alt=""/></a>
                    <a href="mailto:akedarshenoy@gmail.com" className="fa fa-twitter"> <img className="descboximg"src={ require('../Assets/link2.png')} alt=""/></a>
                    <a href="linkedin.com/in/argodu-kedar-shenoy" className="fa fa-instagram"><img className="descboximg"src={ require('../Assets/link1.png')} alt=""/></a>
                </div>
            </div>
            <div className="col-md-4">
                <h4>Quick Links</h4>
                <ul className="footer-links">
                    <li><a href="/">Home</a></li>
                    {/* <li><a href="/menu">Menu</a></li> */}
                    <li><a href="https://kedarshenoy.github.io/portfolio" target="blank">About Us</a></li>
                    <li><a href="mailto:akedarshenoy@gmail.com">Contact Us</a></li>
                    <li><a href="mailto:akedarshenoy@gmail.com">FAQs</a></li>
                </ul>
            </div>
        </div>
        <hr/>
        <div className="row">
            <div className="col-md-6">
                <p>&copy; 2023 AKS . All rights reserved.</p>
            </div>
            <div className="col-md-6">
                <ul className="footer-links">
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                </ul>
            </div>
        </div>
    </div>
</footer>

            </div>

            </>
        );
    }
}

export default Quicksearch;