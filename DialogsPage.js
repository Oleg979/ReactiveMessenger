import React, { Component } from 'react'

class DialogsPage extends Component {
    render() {

        return (
            <div>

                <p className="dialog">Мои диалоги</p>

                <div className="section">
                        <span>
                            <img className="img-feed" src="https://pp.userapi.com/c622217/v622217427/4b0d3/ef-TXM-gBcw.jpg" alt="User page"/>
                            <h3  className="title">Олег Соловьев</h3> 
                            <h3  className="time">12:20</h3>
                        </span>
                    
                </div>

                <p className="dialog">Найти собеседника</p>

                <div className="section">
                    <input type="text" className="finder" onChange={this.props.handleSearchChange}></input>
                </div>
                   
                {this.props.searchResults.length > 0 ? this.props.searchResults.map((user) => <div className="section">
                        <span>
                            <img className="img-feed" src="https://pp.userapi.com/c622217/v622217427/4b0d3/ef-TXM-gBcw.jpg" alt="User page"/>
                            <h3  className="title">{user}</h3> 
                            <h3  className="time">12:20</h3>
                        </span>
                    
                    </div>): <p className="dialog">Никого не найдено</p>}
            
            </div>
        );
    }
}

export default DialogsPage