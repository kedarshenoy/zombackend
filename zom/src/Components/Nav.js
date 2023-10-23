import { Component } from "react";
import { Link } from "react-router-dom";
// import Home from './Home';
import Modal from 'react-modal';
import axios from "axios";
import ('../Styles/home.css');


// import Filter from './Filter'
// import Details from './Details'
var  customStyles={
    content: {
             top: '50%',
             left: '50%',
             right: 'auto',
             bottom: 'auto',
             marginRight: '-50%',
             transform: 'translate(-50%, -50%)',
             border: '2px solid tomato',
             width: '350px'
             }
 }

 var Xstyles={
    width:'100%',
    textAlign: 'end',
    padingRight:'5px',
    cursor: 'pointer'
 }

class Nav extends Component{
    constructor(){
        super();
        this.state={
            accountmodal:false,
            user:[],
            islogedin:false,
            signpmodal:false,
            isloginopen:false,
            formfirstname:undefined,
            formsecondname:undefined,
            formpassword:undefined,
            formemail:undefined,
            loginerror:undefined
        }
    }

    componentDidMount(){
        var user=localStorage.getItem('data')
        user=JSON.parse(user);
        let islogedin=localStorage.getItem('islogedin')
        this.setState({
         user:user,
         islogedin:islogedin,
     })
     
     
        console.log(user)
    }

    logout=()=>{
        // localStorage.setItem('data',[0]);
        localStorage.removeItem('data')
        localStorage.removeItem('islogedin')

        // localStorage.setItem('islogedin',false)
        this.setState({accountmodal:false})
        this.setState({islogedin:false})
     }

     closemodal=()=>{
        this.setState({
           username:'',
           password:'',
           isloginopen:false
        })
     }
     loginsubmit=()=>{
        const obj ={
           email:this.state.username,
           password:this.state.password
        }
        axios({
           method:'POST',
           url:'http://localhost:5403/login',
           header:{ 'Content-Type':'application/json'},
           data:obj
        })
        .then(result=>{
           // console.log( JSON.stringify(result.data.values[0]))
           
           // console.log(this.state.islogedin)
           localStorage.setItem("data", JSON.stringify(result.data.values[0]))
           localStorage.setItem("islogedin", true);
            var user=localStorage.getItem('data')
            user=JSON.parse(user);
            let islogedin=localStorage.getItem('islogedin')
            this.setState({
               user:user,
               islogedin:islogedin,
             })
           
            setTimeout(() => {
               this.setState({islogedin:true})
           this.closemodal();
           }, 0);
           
           
  
        }).catch(error=>{
            this.setState({
               loginerror:"Wrong Username or Password"
            })
           console.log("erorrrrrrrrr");
        })
     }

     handlechange=(event,value)=>{
        this.setState({
           [value]:event.target.value,
           loginerror:undefined
        })
     }

     SignUP=()=>{
        this.setState({signpmodal:false});
  
        const obj={
           email:this.state.formemail,
           password:this.state.formpassword,
           firstname:this.state.formfirstname,
           lastname:this.state.formsecondname
        }
  
        axios({
           method:("POST"),
           url:('http://localhost:5403/signup'),
           header:{'Content-Type':'application/json'},
           data:obj
        }).then(result=>{
           console.log(result.data);
        }).catch(error=>{
           console.log(error);
        })
  
     }
     signuphandler=(value,element)=>{
        this.setState({
           [element]:value
        })
  
     }


render(){
    return(
        <>
        <div className="navibar"></div>
        <div id="logofilter">aks</div>
        <div className="loginfilter">
             {/* <label id="btn1">login!</label> */}
            <label id="btn2_filter"><Link id="btn2_filter" to ={'/home'}> Home</Link></label>
            <label id="btn2_filter"><span id="btn2_filter" onClick={()=>this.setState({accountmodal:true})} > My Account</span></label>
        </div>

        <Modal isOpen={this.state.accountmodal} style={customStyles} ariaHideApp={false}>
            <div onClick={()=>this.setState({accountmodal:false})} style={Xstyles}>X</div>
           <div ><h3>My Account</h3></div>
           
               {
                  localStorage.getItem('islogedin')
                  ?
                  <>
                     <h5>Firstname:-{this.state.user.firstname}</h5>
                      <h5>Lastname:-{this.state.user.lastname}</h5> 
                      <h5>Email:-{this.state.user.email}</h5>
                     <br/>
                     <button onClick={()=>{this.logout()}}>Logout</button>
                  </>
                  :
                  <h5>New User? <span className="signuologinlinks" onClick={()=>this.setState({accountmodal:false, signpmodal:true})}> Create Account</span><br/>   Alredy a User?<span className="signuologinlinks" onClick={()=>this.setState({accountmodal:false, isloginopen:true})}>Login</span></h5>

               } 
          

         </Modal>

         <Modal isOpen={this.state.signpmodal} style={customStyles} ariaHideApp={false}>
            <div onClick={()=>this.setState({signpmodal:false})} style={Xstyles}>X</div>
           <div ><h3>SignUP</h3></div>
           
               {
                 
                  <>
                     <label className="form-label">Firstname: </label>
                     <input type="text" className="form-control" onChange={(event)=>{this.signuphandler(event.target.value,'formfirstname')}}></input><br/>
                     <label className="form-label">Lastname:</label>
                     <input type="text" className="form-control" onChange={(event)=>{this.signuphandler(event.target.value,'formsecondname')}}></input><br/>
                     <label className="form-label">Email:</label>
                     <input type="email" className="form-control"onChange={(event)=>{this.signuphandler(event.target.value,'formemail')}}></input><br/>
                     <label className="form-label">Password:</label>
                     <input type="password" className="form-control"onChange={(event)=>{this.signuphandler(event.target.value,'formpassword')}}></input>
                     <br/>
                     <br/>
                     <button onClick={()=>{this.SignUP()}}>SignUP</button>


                  </>

               } 
          

         </Modal>

         <Modal isOpen={this.state.isloginopen} style={customStyles} ariaHideApp={false}>
            <div onClick={()=>{this.closemodal()}} style={Xstyles}>X</div>
            {this.state.loginerror ? <div className=" alert alert-danger">{this.state.loginerror}</div> : null} 
           <div ><h3>Login</h3></div>
           
                <label className="form-label">UserName</label>
                <input type="text" className="form-control" value={this.state.username} onChange={(event)=>this.handlechange(event,"username")}></input><br/>
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={this.state.password}onChange={(event)=>this.handlechange(event,"password")}></input><br/>
                <button onClick={()=>{this.loginsubmit()}}>Login</button>
          

         </Modal>
        
        </>        
    )
}
}  

export default Nav
