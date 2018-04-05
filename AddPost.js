import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AddPost extends Component {

    //Отрендерить
    render() {
        return (
            <div className="section" id="first">
                            <div className="round-button" id="add" onClick={this.props.Add}>
                                    <a href="#">
                                            <img src="https://gt99.xyz/BlogAPI/imgs/check-mark-32.png" alt="Send"/>
                                      </a>
                            </div>    
                            <div className="text">
                                <ReactCSSTransitionGroup transitionName="example"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}
                                transitionAppear={true}
                                transitionAppearTimeout={300}>
                                        <textarea  onKeyPress={this.props.checkInputKeyPress} placeholder="Введите Ваше сообщение..." value={this.props.postContent} onChange={this.props.handleContentChange}
                                        ref={function(input) {
                                            if (input != null) {
                                            input.focus();
                                            }}}></textarea>
                                </ReactCSSTransitionGroup>
                            </div>
                      </div>
        );
    }
}

export default AddPost