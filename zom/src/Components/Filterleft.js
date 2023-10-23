import { Component } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


class Filterleft extends Component{
    slectedcityid=localStorage.getItem("city_id");



constructor(){
    super();
    this.state={
        mealtypeid:0,
        locationsincity:[],
        location:'',
        cityid:0,
        cuisineselected:[],
        availableresturants:[],
        lcost:undefined,
        hcost:undefined,
        sortingorder:1,
        page:1,
        totalResults:0,
        noofresultsperpage:2,
        // noofbtn:0,
        noofpage:0
    }
   
}



componentDidMount(){
    this.setState({
        mealtypeid:this.props.mealtypeid,
        locationsincity:this.props.locationarray,
        cityid:this.slectedcityid
    })
//    this.paginationbtn()
    this.filterres();


}




eventhandler(event){

    this.setState({
        location:event
    })
    

    setTimeout(() => {
        this.filterres();
    }, 0);
}


cuisinehandler(event, value){
    let {cuisineselected} =this.state
   const index =cuisineselected.indexOf(value);
   
   if( event.target.checked &&index<0){
    cuisineselected.push(value);
   }
     else if (!event.target.checked) {
        cuisineselected.splice(index,1);
    }
    this.setState({
        cuisineselected:cuisineselected
    });

    setTimeout(() => {
        this.filterres();
    }, 0);
   
}


priceeventhandler(lowcost,highcost){
// const {lcost ,hcost}= this.state;

this.setState({
    lcost:lowcost,
    hcost:highcost
})
setTimeout(() => {
    this.filterres();
}, 0);
}



paginationhandler(pageno){
    if(pageno !== -1&& pageno !== +2){
    this.setState({
        page:pageno
    })
    setTimeout(() => {
        this.filterres();
    }, 0);
    }
    if(pageno === -1 && this.state.page >1 ){
        this.setState({
            page:this.state.page-1
        })
        setTimeout(() => {
            this.filterres();
        }, 0);
       
    }
    if(pageno === +2 && this.state.page <this.state.noofpage){
        this.setState({
            page:this.state.page+1
        })
        setTimeout(() => {
            this.filterres();
        }, 0);
       
    }
}

createpagebtn(){
    const {noofpage}=this.state;
    let btn=[];
    for(let i=0; i<noofpage; i++){
        
       btn.push( <button key={i} className="paginations" onClick={()=>this.paginationhandler(i+1)}>{i+1}</button>)
    }
    return btn;
    
    
}


sorthandler(sortorder){
    this.setState({
        sortingorder:sortorder
    })
    setTimeout(() => {
        this.filterres();
    }, 0);
}





navigate=(item)=>{
    const navigate=this.props.navigate;
    // const url = `/details?id=${item._id}`;
    navigate(`/details/${item._id}`);
}



  filterres=()=>{
    const {hcost,lcost}=this.state;
    const req ={
        mealtype:this.props.mealtypeid,
        location:this.state.location,
        cityid:this.slectedcityid,
        cuisine:this.state.cuisineselected,
        sort:this.state.sortingorder,
        page:this.state.page
    };
    if (hcost !== undefined && lcost !== undefined) {
        req.hcost = hcost;
        req.lcost = lcost;
    }
    axios( {
            method:"POST",
            url:'http://localhost:5403/filterrestaurants',
            headers:{'Content-Type':'application/json'},
            data:req

            }
        ).then(result =>{
            const totalResults= result.data.totalResultsCount;
            const noofresultsperpage= 2;
            const{ noofpage}=this.state;
            
            let quotient =totalResults/noofresultsperpage;
            let reminder =totalResults%noofresultsperpage;
            if(reminder>0){
                this.setState({
                    noofpage:Math.floor(quotient)+1
                })
            }
            console.log(noofpage);
            this.setState({
                availableresturants:result.data.restaurants,
                totalResultsCount:result.data.totalResultsCount,
                page:result.data.pageNo,
                totalResults:result.data.totalResultsCount

            });

        
        } ).catch(error=>{
            console.log("error in api"+error)
        })
}    




render(){

    return(
        <>
{/*       
      {  
         console.log(this.state.availableresturants)} */}
        
        <div className="filtersection col-lg-3 col-sm-6 col-md-4" >


            <div className="filterhead ">Filters</div>
            <div className="filtersubhead"> Select Location</div>
            <div><select className="drpdown" onChange={(event)=>this.eventhandler( event.target.value)}>
                       <option value={0}selected  >Select Location</option>
                            {
                              this.props.locationarray.map((item,index)=>{
                                    return <option key={index} >{item.locality}</option>
                                })
                            }
                            {/* <option>Banglore</option>
                            <option>Manglore</option>
                            <option>Mumbai</option>
                            <option>Chennai</option> */}

                  </select>
                </div>
                <div className="filtersubhead">Cusine </div>
                <div className="chk"> <input type="checkbox" onChange={(event)=>this.cuisinehandler(event,'North Indain')} value={"North Indain"}/> North Indian</div>            
                <div className="chk"> <input type="checkbox" onChange={(event)=>this.cuisinehandler(event,'South Indian')} value={"South Indian"}/> South Indian</div>   
                <div className="chk"> <input type="checkbox" onChange={(event)=>this.cuisinehandler(event,'Chinese')} value={"Chinese"}/> Chinese</div>            
                <div className="chk"> <input type="checkbox" onChange={(event)=>this.cuisinehandler(event,'Fast Food')}value={"Fast Food"} /> Fast Food</div>            
                <div className="chk"> <input type="checkbox" onChange={(event)=>this.cuisinehandler(event,'Street Food')}value={"Street Food"} /> Streat Food</div> 
                
                <div className="filtersubhead">Cost for Two </div>
                <div className="rdio"> <input type="radio"onChange={(event)=>{this.priceeventhandler(0,500)}} name="cost"/> Less than &#8377;500</div>
                <div className="rdio"> <input type="radio"onChange={(event)=>{this.priceeventhandler(500,1000)}} name="cost"/> &#8377;500 to &#8377;1000</div>
                <div className="rdio"> <input type="radio"onChange={(event)=>{this.priceeventhandler(1000,1500)}} name="cost"/> &#8377;1000 to 1500</div>
                <div className="rdio"> <input type="radio"onChange={(event)=>{this.priceeventhandler(1500,2000)}} name="cost"/> &#8377;1500 to 2000</div>
                <div className="rdio"> <input type="radio"onChange={(event)=>{this.priceeventhandler(2100,3333)}} name="cost"/> &#8377;2000 +</div>



                        
                    
                <div className="filtersubhead">Sort </div>
                <div className="rdio"> <input type="radio" name="sort" onChange={()=>this.sorthandler(1) }/> Low to High</div>
                <div className="rdio"> <input type="radio" name="sort" onChange={()=>this.sorthandler(-1) }/> High to Low</div>

        
        </div>




        <div className="resultsection col-lg-9 col-sm-12 col-md-12">
        {this.state.availableresturants.length>0
        ?
        
        this.state.availableresturants.map((item,index)=>{

            return (
                        
               
                     <div className="reultbox " key={index} onClick={()=>this.navigate(item)}>
                           
                           <div className="uppersection row">
                               <div className="col-3 res" ><img src={require("../Assets/dinner.png")} alt="m" /></div>
                               <div className="col-9">
                                   <div className="reshead_filter">{item.name} </div>
                                   <div className="shop">{item.locality}</div>
                                   <div className="shopaddr">{item.address}</div>
                               </div>
                           </div>
                           <hr/>
                           <div className="lowersection row">
                               <div className="col-3">
                                   <div className="resdeschead">CUSINES</div>
                                   <div className="resdeschead" > Cost for Two</div>
                               </div>
                               <div className="col-9">
                                   <div className="resdesc_filter">
                                       {item.Cuisine.map((cusine,index)=>{
                                           return `/  ${cusine.name} `
                                       })}
                                   </div>
                                   <div className="resdesc_filter"> &#8377; {item.cost}</div>
                               </div>


                           </div>

                           </div>
               
                    )
            })    
        
            :

        <div className="text-center text-danger my-5">No restaurants available</div>
        
        }
            
          

        {this.state.noofpage>1
            ?
            <div className="pagebuttons">
                {
                    
                }
                <button className="paginations"onClick={()=>this.paginationhandler(-1)}>-</button>
               {
                this.createpagebtn()}
                <button className="paginations" onClick={()=>this.paginationhandler(+2)}>+</button>


            </div>
            :<></>
        }
            {/* result div end */}
            </div>    
        </>
    )
}

   

}

const FilterContents =(props)=>{
    const navigate=useNavigate();
    return <Filterleft navigate={navigate} locationarray= {props.locationarray} mealtypeid={props.mealtypeid}></Filterleft> 
}




export default FilterContents;