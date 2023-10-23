import Filter from './Filter'
import { Component } from 'react';
import axios from "axios";


class Filterparent extends Component{
    constructor(){
        super();
        this.state={
            locations:[],
            dropdown:[]
        }
    }
     cityid=localStorage.getItem("city_id");

     componentDidMount()
                {
                    axios.get('http://localhost:5403/restaurantsm')
                    .then(result =>{
                            this.setState(
                                {
                                    locations:result.data.location
                                    
                                }
                            );
                        }
                    ).catch(error =>{
                            console.log("error in location api")
                        } )
                }   

   

    render(){
    

  const localityarray=this.state.locations.filter(
                    city=> city.city===this.cityid
                      
                )
        
        return(
            <>
            {/* <Filter city={city} object={dropdown}></Filter> */}
            <Filter locationarray={localityarray} cityid={this.cityid}></Filter>
                {/* {console.log(localityarray)} */}
                {/* {console.log(dropdown)} */}

            
            
            </>

        )
    }

}




export default Filterparent;