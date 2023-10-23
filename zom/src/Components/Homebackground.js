// import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Component} from "react";
import Users from "./Users";
import ('../Styles/home.css');
// import axios from "axios";



class Homebackgroundfunc extends Component{





      
        constructor(){
            super();
            this.state={
                locations:[],
                miancity:[],
                city_id:0,
                suggestions:[],
                text:'',
                options:[]
            }
        } 
    
         componentDidMount(){
             axios.get('http://localhost:5403/location')
            .then(result =>{
                this.setState(
                    {
                        locations:result.data.location
                    }
                );
            }
            ).catch(error =>{
                console.log("error in location api")
            
        }    )
        }

        onOptionsChange(event) {
            const city_id = event.target.value;
            this.setState({
                city_id:city_id
            })
            localStorage.setItem("city_id", city_id);
            axios.get(`http://localhost:5403/restaurantsbycitym/${city_id}`)
            .then(result=>{ 
                const options =result.data.location;
                this.setState({
                   
                    
                    options:options
                })
            })
            .catch(error=>console.log(error))
            
        }

        serchhandler=(searchvalue)=>{
            // console.log(searchvalue);
            const {options}=this.state;
            const searchvaluerecived=searchvalue;
            let sugest=[];
            if(searchvaluerecived.length >0){
            // const {city_id} =this.state;
           sugest =options.filter(item=>item.name.toLowerCase().includes(searchvaluerecived.toLowerCase()))
            }
            this.setState({
                suggestions:sugest,
                text:searchvaluerecived
            })
        }
        

        rendersugestions=()=>{
            const sugestionstoshow=this.state.suggestions;
            // console.log(sugestionstoshow);
            // const {text} =this.state;
            if(sugestionstoshow.length ===0  ){
                return null
            }
           else if(sugestionstoshow.length>0){
           
          return  <ul className="suggestionsBox">
                {
                    sugestionstoshow.map((item, index) => {
                        var  mealtype =item.type[0].name
                        return (
                            <li  key={index} onClick={() => this.goToRestaurant(item)}>
                                <div className="suggestionImage">
                                   
                                    <img src={require(`../Assets/${mealtype}.png`)} alt="myimg"/>
                                </div>
                                <div className="suggestionText w-100">
                                    <div>
                                        {item.name}, {item.locality}
                                    </div>
                                    <div className="text-muted">
                                        {/* Rating: {item.aggregate_rating} */}
                                        <span className="text-danger float-end">
                                            Order Now 
                                        </span>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
           }
        }


        goToRestaurant=(item)=>{
            console.log(item);
        const navigate=this.props.navigate;
        navigate(`/details/${item._id}`);

        }

    
//   location =this.props.location;
     
    render(){
        return(
            <>
            
                <img  className="imgmain mg-4"  src={require('../Assets/Background.png')} width="100%" height="450px"alt="img"/>
                <Users></Users>
                    <div className="logocontents">
                        <div id="logo">aks</div>
                        <div id="logotext">
                            <label>Find the best restaurants,cafes and bars.</label>
                        </div>
                
                        <div id="select1"><div className="select1" >
                            <select id="dropdown1" onChange={(event) => this.onOptionsChange(event)}>
                                <option value="disabled"> Select </option>
                                 {
                                    
                                   this.state.locations.map((item, index)=>{
                                        // console.log(item.name);
                                        
                                            return (<option key={index} value={item.city_id}>{item.name}</option>)
                                        
                                    } 
                                    )

                                

                                   

                                } 
                             
                    
                            </select></div>
                        <div className="select1 ">
                            <input type="text" placeholder="Search restuarants " id="searchbox1" onChange={(event)=>{this.serchhandler(event.target.value)}}  ></input>
                            {this.rendersugestions()}
                           
                        </div>
                        </div>
                    </div>
                        
            </>
        );
    }
}


const Homebackground=()=>{
    const navigate =useNavigate();
    return(
        <Homebackgroundfunc navigate={navigate} ></Homebackgroundfunc>
    )
}
export default Homebackground;