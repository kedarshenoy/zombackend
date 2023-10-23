// import { Axios } from "axios";
import axios from "axios";
import { Component } from "react";

import Modal from 'react-modal';

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

var  customStyles2={
   content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '2px solid tomato',
            width: 'px'
            }
}




class Users extends Component{
    Xstyles={
      width:'100%',
      textAlign: 'end',
      padingRight:'5px',
      cursor: 'pointer'
   }
  
   constructor(){
      super();
      this.state={
         username:'',
         password:'',
         isloginopen:false,
         logindata:undefined,
         islogedin:false,
         detailsmodal:false,
         signpmodal:false,
         formfirstname:undefined,
         formsecondname:undefined,
         formpassword:undefined,
         formemail:undefined,
         loginerror:undefined,
         ordermodal:false,
         orderdata:[]
      }
   }

   login=()=>{
      this.setState({
         isloginopen:true
      })
   }

   closemodal=()=>{
      this.setState({
         username:'',
         password:'',
         isloginopen:false
      })
   }
   handlechange=(event,value)=>{
      this.setState({
         [value]:event.target.value,
         loginerror:undefined

      })
   }
   componentDidMount(){
      const user=localStorage.getItem('data');
      const islogedin=localStorage.getItem('islogedin')
      this.setState({
         logindata:user,
         islogedin:islogedin
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
         localStorage.setItem("islogedin", true)
         this.setState({islogedin:true})
         this.closemodal();

      }).catch(error=>{
         this.setState({
            loginerror:"Wrong Credentials"
         })
         console.log("erorrrrrrrrr");
      })
   }

   mydetails=()=>{
      this.setState({
         detailsmodal:true

       } )
   }

   logout=()=>{
      localStorage.removeItem('data')
      localStorage.removeItem('islogedin')
     
      // localStorage.setItem('data',[0]);
      // localStorage.setItem('islogedin',false)
      this.setState({detailsmodal:false})
      this.setState({islogedin:false})
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

   getorder=()=>{
      axios.get('http://localhost:5403/orders').then(result=>{ this.setState({orderdata:result.data.orders})}).catch(error=>{console.log(error)})

   }

   render(){
      let userdata=localStorage.getItem('data')
      userdata=JSON.parse(userdata)
// const ans =this.props;

// console.log(userdata)

    return(
        <>
        {
         localStorage.getItem('islogedin')
         ?
         <div className="login"> 
            <label id="btn1" onClick={()=>{this.mydetails()}}>{userdata.firstname}</label>
            {/* <label id="btn2"> Logout</label> */}
         </div>
         :
         <div className="login"> 
             <label id="btn1" onClick={()=>{this.login()}}>login!</label>
             <label id="btn2" onClick={()=>this.setState({signpmodal:true})}> Create Account</label>
         </div>
        }
         
         <Modal isOpen={this.state.isloginopen} style={customStyles} ariaHideApp={false}>
            <div onClick={()=>{this.closemodal()}} style={this.Xstyles}>X</div>

            {this.state.loginerror ? <div className="alert alert-danger ">{this.state.loginerror}</div> :null}
           <div ><h3>Login</h3></div>
           
                <label className="form-label">UserName</label>
                <input type="text" className="form-control" value={this.state.username} onChange={(event)=>this.handlechange(event,"username")}></input><br/>
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={this.state.password}onChange={(event)=>this.handlechange(event,"password")}></input><br/>
                <button onClick={()=>{this.loginsubmit()}}>Login</button>
          

         </Modal>

         {/* --------------------------------loginmodal 👆------------------------------------- */}

         <Modal isOpen={this.state.detailsmodal} style={customStyles} ariaHideApp={false}>
            <div onClick={()=>this.setState({detailsmodal:false})} style={this.Xstyles}>X</div>
           <div ><h3>My Account</h3></div>
           
               {
                  this.state.islogedin
                  ?
                  <>
                      <h5>Firstname:-{userdata.firstname}</h5>
                      <h5>Lastname:-{userdata.lastname}</h5> 
                      <h5>Email:-{userdata.email}</h5>
                     <br/>
                     <button onClick={()=>{this.logout()}} className="mr-4">Logout</button>
                     <button onClick={()=>{this.setState({ordermodal:true}); this.getorder()}} >Order Details</button>
                  </>
                  :
                  null

               } 
          

         </Modal>
        {/* { -----------------------------------USER DETAILS MODAL 👆 ^-----------------------------------------} */}
        {/* { -----------------------------------SIGNUP  MODAL👇 >-----------------------------------------} */}
       
        <Modal isOpen={this.state.signpmodal} style={customStyles} ariaHideApp={false}>
            <div onClick={()=>this.setState({signpmodal:false})} style={this.Xstyles}>X</div>
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

         {/* ///////////////////////////////////////order details👇////////////////////////////////////////////////////// */}
         <Modal isOpen={this.state.ordermodal} style={customStyles2} ariaHideApp={false}>
            <div onClick={()=>this.setState({ordermodal:false})} style={this.Xstyles}>X</div>
           <div ><h3>Order Details</h3></div>
           
               {
                  this.state.islogedin
                  ?
                     <ul className="menu">{
                           this.state.orderdata.map((item,index)=>{
                           return <li key={index} className="menuItem">
                              <h5 className="resnameinordermodal">●{item.restauarant}</h5>
                              <div className="item-desc">🏙  {item.addr}</div>
                              <div>🍴 {item.food.map((item,index)=>{return <span className="item-desc" key={index}>{item},</span>})}</div>
                              <div className="cuisines">💰 {item.cost}</div>
                              <div className="cuisines">📅 {item.date}</div>

                           </li>
                        })

                     }</ul>
                  
                     
                  
                  :
                  null

               } 
          

         </Modal>

        </>
    );
   }
}

export default Users;