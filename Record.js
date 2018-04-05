import React, {Component} from 'react'

//Компонент поста
class Record extends Component {

    render() {
        return(
            <div className="section">
                <span>
                    <img className="img-feed" src={this.props.avatar} alt="User page"/>
                    <h3 className="title">{this.props.title}</h3> 
                    <h3 className="time">{this.props.time}</h3>
                </span>
                <p className="hello">
                   {this.props.content}
                </p>
            </div>
        )
    }
}

export default Record