import React, { Component } from 'react'
import Reg from './Reg'
import Auth from './Auth'

class AuthPage extends Component {
    render() {

        return (
            <div>
                <Auth onClick={this.props.toggleAuth} onFailedAuth={this.props.onFailedAuth} loadHead={this.props.loadHead}
                onSuccessAuth={this.props.onSuccessAuth} notFilled={this.props.notFilled}/>
                <Reg onClick={this.props.toggleReg}  loadHead={this.props.loadHead} onSuccessReg={this.props.onSuccessReg}
                onFailedReg={this.props.onFailedReg} notFilled={this.props.notFilled}/>   
            </div>
        );
    }
}

export default AuthPage