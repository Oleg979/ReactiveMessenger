import React, { Component } from 'react'
import User from './User'
import Loader from './Loader'

class ChatsPage extends Component  {

    interval = null

    constructor() {
        super()
        this.state = {
            users:null,
            searchResults:null,
            searchBegin: false
        }
    }


    componentDidMount() {
        this.fetchUsers()
        this.interval = setInterval(() => {this.fetchUsers()}, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    //Отслеживать изменения поиска
    handleSearchChange(e) {
        this.setState({
            searchBegin: true
        })
        if(e.target.value === "" || e.target.value === " ") {
        this.setState({
            searchResults: []
        })
        }
        else this.setState({
        searchResults: this.state.users.filter((user) => (user.name + " " + user.surname).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
        })
    }

    fetchUsers() {
        fetch(this.props.USERS_URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                users: responseData.filter((user) => user.id != this.props.login),
                MyUsers: responseData.filter((user)=>user.chats.indexOf(this.props.login)!=-1)
            })
        })
        .catch((error) => {
            console.log('Error fetching and parsing data', error)
        })
    }

    render() {
        return (
            
            <div>

            <p className="dialog">Последние беседы</p>

            {this.state.users && this.state.users.length > 0 ? this.state.MyUsers.map((user) => 
            <User avatar={user.avatar} name={user.name} key={user.id} id={user.id} surname={user.surname} toDialog={this.props.toDialog} online={user.online}/>
            ) : <Loader /> }
            {!this.state.MyUsers || this.state.MyUsers.length == 0 ? <p className="dialog" style={{'fontSize': 1 + 'em'}}>У вас пока нет ни одной беседы</p> : null}

            {this.state.users ? <div>
            <p className="dialog">Найти собеседника</p>

            <div className="section">
                <input type="text" className="finder" placeholder="Начните печатать имя..." onChange={this.handleSearchChange.bind(this)}></input>
            </div>
               
            {this.state.searchResults && this.state.searchResults.length > 0 ? this.state.searchResults.map((user) => 
            <User avatar={user.avatar} name={user.name} key={user.id} surname={user.surname}  toDialog={this.props.toDialog} id={user.id} online={user.online}/>
            ): this.state.searchBegin ?  <p className="dialog" style={{'fontSize': 1 + 'em'}}>Никого не найдено</p> : null}
            </div> : null}
            
        
        </div>
            
        )
    }

}

export default ChatsPage