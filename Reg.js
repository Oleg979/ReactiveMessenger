import React, { Component } from 'react'

class Reg extends Component {

    //Путь к API
    REG_URL = "https://gt99.xyz/BlogAPI/reg/"

    //Установить начальное состояние
    constructor() {
        super()
        this.state = {
            login: "",
            password: "",
            name: "",
            surname: "",
            avatar: ""
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

    //Отслеживать ввод имени
    handleName(e) {
        this.setState({
            name: e.target.value
        })
    }

    //Отслеживать ввод фамилии
    handleSurname(e) {
        this.setState({
           surname: e.target.value
        })
    }

    //Отслеживать ввод аватара
    handleAvatar(e) {
        this.setState({
            avatar: e.target.value
        })
    }

    //Зарегистрировать
    reg() {
        this.props.loadHead();
        if(this.state.login === "" || this.state.password === "" || this.state.name === "" || this.state.surname === ""
        || this.state.avatar === "" ) {
            this.props.notFilled()
            return
        }
        //Формируем параметры
        let params=`login=${this.state.login}&password=${this.state.password}&name=${this.state.name}
        &surname=${this.state.surname}&avatar=${this.state.avatar}`
        fetch(this.REG_URL, { 
            headers: {  
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", 
            },  
            method: 'post',  
            body: params
          })   
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData)
            if(responseData.status === "ERROR") 
                this.props.onFailedReg(responseData.result)
            else {
                localStorage.setItem("login", this.state.login)
                localStorage.setItem("password", this.state.password)
                localStorage.setItem("name", this.state.name)
                localStorage.setItem("surname", this.state.surname)
                localStorage.setItem("avatar", this.state.avatar)
                this.props.onSuccessReg()
            }
          })
    }

    //Отрендерить
    render() {
        return (
            <div className="section reg" id="regclass" >
                <h1 className="block"  onClick={this.props.onClick}><span style={{color :"#000000"}}>Регистрация</span></h1>
                <div className="data">
                    <h1><span>Телефон&nbsp;&nbsp;</span></h1>
                    <input type="text" placeholder="9012345678" onChange={this.handleLogin.bind(this)} /> </div>
                <br />
                <div className="not-first">
                    <h1><span>Пароль&nbsp;&nbsp;&nbsp;&nbsp;</span></h1>
                    <input type="password" placeholder="1234567" onChange={this.handlePassword.bind(this)} />
                </div>
                <div className="not-first"><h1><span>Имя&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></h1>
                <input type="text" placeholder="Иван" onChange ={this.handleName.bind(this)}/></div>
                <div className=" not-first"><h1><span>Фамилия&nbsp;</span></h1>
                <input type="text" placeholder="Иванов" onChange={this.handleSurname.bind(this)} /></div> 
                <div className=" not-first"><h1><span>Аватар&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></h1>
                <input type="text" placeholder="vk.com/logo.png" onChange={this.handleAvatar.bind(this)}/></div> 
                <div className="round-button" id="auth-button" onClick={this.reg.bind(this)}>
                        <a href="#">
                        <img src="http://www.iconsplace.com/icons/preview/white/login-256.png" alt="Add" />
                        </a>
                </div>
            </div>
        );
    }
}

export default Reg