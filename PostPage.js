import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Record from './Record.js'
import AddPost from './AddPost'
import Loader from './Loader'

class PostPage extends Component {


    
    //Сохраняем интервал для очистки
    interval = null


    //Добыть посты после монтирования компонента
    componentDidMount() {
        this.props.disableAdd()
        fetch(this.props.CHATS_URL+this.props.chatterId+"?userId="+this.props.login)
        .then((response) => response.json())
        .then((responseData) => {
            this.props.setChatId(responseData.id)
            console.log(responseData.id)
            this.props.fetchPosts(responseData.id)
        })
        .then (this.interval = setInterval(() => {
            this.props.fetchPosts()
        }, 3000))  
        .then(()=>console.log("fetched"))
        .catch((e) => console.log(e))
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        this.props.nullPosts()
    }

    render() {
        let Records = 
            this.props.posts ? this.props.posts.map((post, index) =>
            <Record title={post.title} time={post.time} content={post.content} avatar={post.avatar} key={index}/>) : ""
  
        let Feed = 
            <ReactCSSTransitionGroup transitionName="example"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionAppear={true}
                    transitionAppearTimeout={300}>
                        {Records}
            </ReactCSSTransitionGroup>

        return (
            <div>
                {this.props.addPost ? 
                  <AddPost Add={this.props.Add} checkInputKeyPress={this.props.checkInputKeyPress} 
                  postContent={this.props.postContent} handleContentChange={this.props.handleContentChange} /> 
                  : null
                }

                {this.props.chatId ? 
                    <div className="Records">
                        {this.props.posts ? Feed : <Loader /> }
                    </div> 
                    :
                    <div>
                        <p className="dialog">У вас нет переписки с этим пользоватетелем
                        <br/>
                        Напишите что-нибудь первым!</p> 
                    </div> 
                }
                
            </div>
        );
    }
}

export default PostPage


// WEBPACK FOOTER //
// src/PostPage.js