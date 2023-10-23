
// import{useParams} from 'react-router-dom';
import FilterContents from './Filterleft'
import { useLocation } from 'react-router-dom';
import Nav from './Nav'
import ('../Styles/filter/filter.css');





// this.state ={
//    location:'' ,
//    mealtype:0
// }


const Filters =(props)=>{
const location =useLocation();
const mealtypeselected=location.state.mealtype;
const mealtypeid=location.state.mealtypeid;
    const locationarray= props.locationarray;

    const selected=locationarray.map((item)=>{
        return item.city_name
    })
 
    
    
    return(
            <>
            <Nav></Nav>  
       <div className="container"><h1 className="header">{mealtypeselected} Places in {selected[0]}</h1></div> 
       <div className="container">
        <div className="row">
            <FilterContents mealtypeid={mealtypeid} locationarray={props.locationarray}></FilterContents>
          {  console.log(props.locationarray)}
        </div>
      
       </div>
     

            
            </>
        
    )



}

export default Filters;