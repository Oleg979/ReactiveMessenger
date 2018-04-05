import React, { Component } from 'react'

class Contacts extends Component {
    render() {
        return (
                    <div className="section" id="contacts">
                      <h1><span>Follow Me</span></h1>
                      <div>
                          <a href="https://vk.com/siltstrider" target="_blank">
                          <img alt="Vk" src="https://cdn3.iconfinder.com/data/icons/round-simple-social-icons/58/vkontakte.png"/>
                          </a>
                          <a href="https://github.com/Oleg979" target="_blank">
                          <img alt="Github" src="https://cdn0.iconfinder.com/data/icons/octicons/1024/mark-github-256.png" />
                          </a>
                      </div>
                    </div>
        );
    }
}

export default Contacts