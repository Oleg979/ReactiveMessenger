import React, {Component} from 'react'

//Компонент юзера
class User extends Component {

    click() {
        this.props.toDialog(this.props.id, this.props.name, this.props.surname)
    }

    render() {
        return(
            <div className="section user" onClick={this.click.bind(this)}>
                    <span>
                        <img className="img-feed" src={this.props.avatar} alt="User page"/>
                        <h3  className="title">{this.props.name + " " + this.props.surname}</h3> 
                        <h3  className="time">{this.props.online}</h3>
                    </span>
            </div>
        )
    }
}

export default User