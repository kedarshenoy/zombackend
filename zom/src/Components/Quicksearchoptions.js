import { Component } from "react";

import { Link } from "react-router-dom";

class Quicksearchoptions extends Component{

    render(){
        return(
            <>

                            <div className=" col-lg-4 col-md-6 col-12" >
                                        
                                    <Link to ={'/filter'}
                                     state={{
                                        mealtype:this.props.heading,
                                        mealtypeid:this.props.id,
                                     }}
                                    >
                                    <div className="quickbox">
                                        <img src={this.props.imgsrc}alt="img"/>
                                        <div className="redescbox">
                                        <h3 className="reshead">{this.props.heading}</h3>
                                        <p className="resdesc">{this.props.descr}</p>
                                    </div>
                                    </div>
                                    </Link>
                                </div>
            </>
        );
    }
}

export default Quicksearchoptions;