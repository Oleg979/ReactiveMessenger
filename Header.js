import React, { Component } from 'react'
class Header extends Component {

    //Отрендерить
    render() {
        return (
            <div id="header">
                <img alt="" className="img-circle" src={this.props.avatar} />

                {!this.props.loadHead ? 
                <p>{this.props.title}</p> :
                <div className="load-3" style={{marginTop:"10px", marginBottom:"10px"}}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                </div>
                }
            </div>
        );
    }
}

export default Header