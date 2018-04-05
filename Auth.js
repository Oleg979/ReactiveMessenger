import React, { Component } from 'react'

class Auth extends Component {

    //Путь к API
    AUTH_URL = "https://gt99.xyz/BlogAPI/auth/"

    //Установить начальное состояние
    constructor() {
        super()
        this.state = {
            login: "",
            password: "",
        }
    }

    //Отслеживать ввод логина
    handleLogin(e) {
        this.setState({
            login: e.target.value
        })
    }

    //Отслеживать ввод пароля
    handlePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    //Авторизовать
    auth() {
        this.props.loadHead();
        if(this.state.login === "" || this.state.password === "") {
            this.props.notFilled()
            return
        }
        //Формируем параметры
        let params=`login=${this.state.login}&password=${this.state.password}`
        fetch(this.AUTH_URL, { 
            headers: {  
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", 
            },  
            method: 'post',  
            body: params
          })   
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
            if(responseData.status === "ERROR") 
                this.props.onFailedAuth(responseData.result);
            else {
                localStorage.setItem("login", this.state.login)
                localStorage.setItem("password", this.state.password)
                this.props.onSuccessAuth()
            }
          })
    }

    //Отрендерить
    render() {
        return (
            <div className="section" id="authclass">
                    <h1  className="block" onClick={this.props.onClick}><span style={{color :"#000000"}}>Авторизация</span></h1>
                    <div className="data">
                        <h1><span>Логин&nbsp;&nbsp;</span></h1>
                        <input type="text" placeholder="9012345678" value={this.state.login} onChange={this.handleLogin.bind(this)}/> 
                    </div>
                    <br />
                    <div className="not-first"><h1><span>Пароль</span></h1>
                        <input type="text" placeholder="1234567" value={this.state.password} onChange={this.handlePassword.bind(this)}/></div> 
                        <div className="round-button" id="auth-button" onClick={this.auth.bind(this)}>
                                <a href="#">
                                <img src="http://www.iconsplace.com/icons/preview/white/login-256.png" alt="Add" />
                                </a>
                    </div>
            </div>
        );
    }
}

export default Auth