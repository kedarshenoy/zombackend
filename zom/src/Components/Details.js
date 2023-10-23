import { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import Nav from './Nav';
import Modal from 'react-modal';

import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
// import queryString from 'query-string';

import('../Styles/details.css');

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
             width: '500px'
             }
 } 
 var Xstyles={
    width:'100%',
    textAlign: 'end',
    padingRight:'5px',
    cursor: 'pointer'
 }

 






class Details extends Component{

     

constructor(){
    super();
    this.state={
        restaurants:[],
        productmodal:false,
        totalamount:0,
        checkoutmodal:false,
        selecteditem:[],
        menu:[]
        
    }
}


getmenu=()=>{
    axios.get('http://localhost:5403/menu').then(
        result=>{
            this.setState({
                menu:result.data.menu
            })
        }
    ).catch(error=>{
        console.log("error")
    })
 }


componentDidMount(){
    
    const hotelid =this.props.hotelid.id;
    // console.log(hotelid);


    axios.get( `http://localhost:5403/restaurantsbyidm/${hotelid}`).then(result=>
   
     this.setState({
        restaurants:result.data.location
    })
    
    ).catch(error=>console.log(error))
}

addItemHnadler=(item)=>{
    var {selecteditem}=this.state
    this.setState({
        totalamount:this.state.totalamount+item.itemPrice,
        
    })
    selecteditem.push(item.itemName)

    
}


saveorderdetail=(addrs,hotel)=>{
  
  const order={
    restauarant:hotel,
    food:this.state.selecteditem,
    cost:this.state.totalamount,
    addr:addrs,
    date:new Date()
  }
  axios({
    method:'POST',
    url:'http://localhost:5403/saveorder',
    headers:{'Content-Type':'application/json'},
    data:order
  }).then(result=>{
    // console.log(result)
    this.setState({checkoutmodal:false,productmodal:false})
    alert("Order Place Succefully")
  }).catch(error=>{
    // console.log(error)
    alert("Error Placing Order Plz try again later")

  })

}




render(){
    const {restaurants, selecteditem} =this.state;
    let cuisine = [];
    let cost=0;
    let locality='';
    let addr ='';
    let restaurantname=''
    restaurants.forEach(element => {
        cuisine=element.Cuisine;
        cost=element.cost;
        locality=element.locality;
        addr=element.address;
        restaurantname=element.name;

    });
    return(
        <>
            <Nav></Nav>  
            <div className=" container my-4" >
            <Carousel  infiniteLoop={true} showThumbs={false} autoPlay={true} interval={2500}  showStatus={false} >
                <div >
                    <img src={require("../Assets/img1.jpg")} className="carousalimg" alt="m" />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div >
                    <img src={require("../Assets/chinese.jpg")} className="carousalimg" alt="m" />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src={require("../Assets/img3.jpg")} alt="m" className="carousalimg"/>
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={require("../Assets/beverages.jpg")} alt="m" className="carousalimg"/>
                    {/* <p className="legend">Legend 3</p> */}
                </div>

            </Carousel>

            <div className="mt-3 nameofhotel">{restaurants.map((item,index)=>{
                return <h1 key={index}>{item.name}</h1>
            })}</div>

            
            <div className="orderbtndiv"><input type="button" className="orderbtn" value="Place Online Order" onClick={()=>{this.setState({productmodal:true}); this.getmenu() }}></input> </div>

                <Tabs>
                <TabList>
                <Tab >Overview</Tab>
                <Tab >Contact</Tab>
                </TabList>

                <TabPanel>
                <h2>About this Place</h2>
                <br/>
                <h4>Cusines Available:</h4>
                {
                 cuisine.map((item,index)=>{
                  return  <span key={index} >{item.name}</span>
                 }) 
                
                }
                <br/>
                <br/>

                <h4>Average Cost:</h4>
                <span>&#8377; {cost}/-</span>
                
                
                </TabPanel>
                <TabPanel>
                <h2>{locality}</h2>
                <br/>
                <br/>
                
                <h4>Restaurrant Address:</h4>
                <br/>
                <span>{addr}</span>
                </TabPanel>
                </Tabs>
            </div>




            <Modal isOpen={this.state.productmodal} style={customStyles2} ariaHideApp={false} >
                
            <div onClick={()=>this.setState({productmodal:false})} style={Xstyles} >X</div>
           <div ><h3>{restaurantname}</h3></div>
           
               {
                  localStorage.getItem('islogedin')?
                  <>
                     <br/>
                     <ul className="menu pr-3" >
                        {this.state.menu.map((item,index)=>{
                       return  <div key={index}>
                        {/* <span><img className="menuimg" src={require('../Assets/food.jpg')} alt="n"/>  </span><span> {item.itemName}</span> */}
                        <li key={index}>
                                            <div className="row no-gutters menuItem">
                                                <div className="col-10">
                                                    {
                                                        item.isVeg 
                                                        ?
                                                        <div className="text-success">Veg</div> 
                                                        :
                                                        <div className="text-danger">Non-Veg</div> 
                                                    }
                                                    <div className="cuisines">{ item.itemName }</div>
                                                    <div className="cuisines">&#8377;{ item.itemPrice }</div>
                                                    <div className="cuisines item-desc text-muted">{ item.itemDescription }</div>
                                                </div>
                                                <div className="col-2">
                                                    <button className="btn btn-light addButton" onClick={() => this.addItemHnadler(item)}>Add</button>
                                                </div>
                                            </div>
                                        </li>
                        


                         </div>
                     
                     })}

                    </ul>
                     

                     <div className="mt-3 restName fs-4">
                                Subtotal  <span className="m-4">&#8377;{this.state.totalamount}</span>
                                <button className="btn btn-danger float-end" onClick={()=>this.setState({checkoutmodal:true})} >Pay Now</button>
                            </div>
                  </>
                  :
                  <div alert alert-danger>Login to order food</div>

               } 
          

         </Modal>

         <Modal isOpen={this.state.checkoutmodal} style={customStyles} ariaHideApp={false} >
            <div onClick={()=>this.setState({checkoutmodal:false})} style={Xstyles} >X</div>
            <h3>Selected Items</h3>
         {
             selecteditem.map((item,index)=>{
                return <div className="productselected" key={index}>◉{item}</div>
            })
         }

            <div className="mt-3 restName fs-4">
                                Subtotal  <span className="m-4">&#8377;{this.state.totalamount}</span>
                                <button className="btn btn-danger float-end" onClick={()=>{this.saveorderdetail(addr,`${restaurantname}`)}} >Pay Now</button>
                            </div>
           
         </Modal>
               {console.log(this.state.selecteditem)}
        </>
    )
}

}  

const Detailsfunc =()=>{
    const hotelid =useParams();
  return <Details hotelid={hotelid}></Details>
}

export default Detailsfunc;



