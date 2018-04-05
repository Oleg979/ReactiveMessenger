import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Menu extends Component {

    //Отрендерить
    render() {
        return (
            <div>
              <div className="round-button" id="fixedbutton" onClick={this.props.deAuth}>
                  <a href="#">
                      <img src="https://gt99.xyz/BlogAPI/imgs/logout-32.png" alt="Home" />
                  </a>
                </div>

                

                <div className="round-button" id="fixedbutton2">
                <a href="#">
                  <img src="http://codeitdown.com/media/Home_Icon.svg" alt="Logout" onClick={this.props.toChats} />
                </a>
                </div>
                {this.props.page === "post" ?
                <div className="round-button" id="fixedbutton5" onClick={this.props.toggleAdd}> 
                <a href="#">
                  <img src="https://gt99.xyz/BlogAPI/imgs/plus-2-32.png" alt="Up" />
                </a>
                </div>
                : null}
                <div className="round-button" id="fixedbutton3" >
                <a href="#">
                  <img src="https://gt99.xyz/BlogAPI/imgs/arrow-139-32.png" alt="Add" />
                </a>
                </div>
              </div>
        );
    }
}

export default Menu