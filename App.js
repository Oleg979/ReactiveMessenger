import React, { Component } from 'react'
import './App.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Contacts from './Contacts'
import Copyright from './Copyright'
import Header from './Header'
import Menu from './Menu'
import PostPage from './PostPage'
import AuthPage from './AuthPage'
import ChatsPage from './ChatsPage'

class App extends Component {

  //Путь к API
  POSTS_URL = "https://gt99.xyz/BlogAPI/posts/"
  USERS_URL = "https://gt99.xyz/BlogAPI/users/"
  CHATS_URL = "https://gt99.xyz/BlogAPI/chats/"
  DEAUTH_URL = "https://gt99.xyz/BlogAPI/deauth"
  AUTH_URL = "https://gt99.xyz/BlogAPI/auth"
  defaultAvatar = "https://gt99.xyz/BlogAPI/imgs/0.jpg"

  //Установить начальное состояние
  constructor() {
    super()
    this.state = {
      postContent: "", // Содержимое нового поста
      title:"Выполните вход", // Заголовок
      posts: null, // Посты
      addPost: true, // Отображать форму
      author: "ComDig",
      avatar: null, // Аватар
      page: "auth",
      regActive: false,
      loadHead: false,
      login: null,
      password: null,
      chatId:null,
      chatterId:null,
      startFetching: false
    }
  }

  //Инициализация
  componentDidMount() {
    if(localStorage.getItem("login")!=null && localStorage.getItem("password")!=null)
    this.onSuccessReg();

  }


  //Функция добычи постов
  fetchPosts(id) {
    this.state.chatId ? id = this.state.chatId : id
    fetch(this.POSTS_URL+id)
        .then((response) => response.json())
        .then((responseData) => {
                var res = [];
                  for(var i in this.state.posts){
                    var shared = false;
                    for (var j in responseData)
                        if (responseData[j].id == this.state.posts[i].id) {
                            shared = true;
                            break;
                        }
                    if(!shared) res.push(this.state.posts[i])
                  }
                  res = res.concat(responseData);
            this.setState({
              loaded:true,
              posts: res
            })
        })
        .catch((error) => {
            console.log('Error fetching and parsing data', error)
        })
  }

  //Отслеживаем изменение тела поста
  handleContentChange(e) {
    this.setState({
      postContent:e.target.value,
    })
  }

  //Открыть или скрыть окно добавления поста
  toggleAdd() {
      this.setState({
        addPost: !this.state.addPost,
      })
  }

  disableAdd() {
    this.setState({
      addPost: true
    })
  }

  //Отслеживаем нажатие клавиши
  checkInputKeyPress(evt) {
    if (evt.key === 'Enter') {
     evt.preventDefault()
     this.Add()
    }
  }

  //Добавить новый пост
  Add() {
    if(this.state.postContent === "") return 
    //Формируем параметры
    let params="title="+this.state.name+" "+this.state.surname+"&content="+this.state.postContent
    +"&author="+this.state.author+"&avatar="+this.state.avatar
    
    let tmp;
    tmp = this.state.posts ? this.state.posts.slice(0) : [];
    let newPost = {
      title: this.state.name + " " + this.state.surname,
      content: this.state.postContent,
      author: this.state.author,
      avatar: this.state.avatar,
      time:"Отправка..."
    }
    tmp.unshift(newPost)
    this.setState({
      posts: tmp
    })

    if(!this.state.chatId) {
      fetch(this.CHATS_URL+this.state.chatterId, { 
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", 
        },  
        method: 'post',  
        body: "userId="+this.state.login
      })   
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
         chatId: responseData.id,
        })
        return responseData.id
      })
      .then ((id) => fetch(this.POSTS_URL+id, { 
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", 
        },  
        method: 'post',  
        body: params
      }))
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          postContent: "",
        })
    })
    .then(()=> {
      this.setState({
        startFetching: true
      })
    })
    }

    else {
      //Асинхронно загружаем пост
      fetch(this.POSTS_URL+this.state.chatId, { 
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", 
        },  
        method: 'post',  
        body: params
      })   
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          postContent: "",
        })
    })
    }
    
  }

  //Скрыть показать авторизацию
  toggleAuth() {
    if (document.getElementById('regclass').classList.contains('reg')) {
      document.getElementById('authclass').classList.toggle('reg')
      setTimeout(() => document.getElementById('regclass').classList.toggle('reg'), 500 ) 
    }
    else {
      document.getElementById('regclass').classList.toggle('reg')
      setTimeout(() => document.getElementById('authclass').classList.toggle('reg'), 500 ) 
    }
  }

  //Скрыть показать регистрацию
  toggleReg() {

    if (document.getElementById('authclass').classList.contains('reg')) {
      document.getElementById('regclass').classList.toggle('reg')
      setTimeout(() => document.getElementById('authclass').classList.toggle('reg'), 500 ) 
    }

    else {
      document.getElementById('authclass').classList.toggle('reg')
      setTimeout(() => document.getElementById('regclass').classList.toggle('reg'), 500 ) 
    }
   
  }

  //Авторизация удалась
  onSuccessAuth() {
    fetch(this.USERS_URL+localStorage.getItem("login"))
    .then((response) => response.json())
    .then((responseData) => {
      localStorage.setItem("avatar",responseData.avatar);
      localStorage.setItem("name",responseData.name);
      localStorage.setItem("surname",responseData.surname);
        this.setState({
          loadHead:false,
          name: responseData.name,
          surname: responseData.surname,
          avatar: responseData.avatar,
          login: localStorage.getItem("login"),
        password: localStorage.getItem("password"),
        page:"chats",
        title: "Мои диалоги"
        })
    })
    .catch((error) => {
        console.log('Error fetching and parsing data', error)
    })
      
  }

  //Авторизация не удалась
  onFailedAuth(res) {
    let title
    if(res === "WRONG PASSWORD") title = "Неправильный пароль!"
    else if(res === "NOT REGISTERED") title = "Аккаунт не существует!"
    this.setState({
      title: title,
      loadHead: false
    })
  }

  //Регистрация удалась
  onSuccessReg() {
    this.setState({
      login: localStorage.getItem("login"),
      password: localStorage.getItem("password"),
      name: localStorage.getItem("name"),
      surname: localStorage.getItem("surname"),
      avatar: localStorage.getItem("avatar"),
      page: "chats",
      loadHead:false,
      title: "Мои диалоги"
    })

    fetch(this.AUTH_URL, { 
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", 
      },  
      method: 'post',  
      body: `login=${localStorage.getItem("login")}&password=${localStorage.getItem("password")}`
    })   
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
  })

  }

  //Регистрация не удалась
  onFailedReg(res) {
    let title
    if(res === "ALREADY REGISTERED") title = "Аккаунт уже зарегистрирован!"
    this.setState({
      title: title,
      loadHead: false
    })
  }

  //Лоадер в хедере
  loadHead() {
    this.setState({
      loadHead:true
    })
  }

  //Поля не заполнены
  notFilled() {
    this.setState({
      loadHead:false,
      title: "Вы не заполнили необходимые поля!"
    })
  }

  //Деавторизация
  deAuth() {

    localStorage.clear()
    this.setState({
      page:"auth",
      title:"Выполните вход",
      avatar:null
    })
  fetch(this.DEAUTH_URL, { 
        headers: {  
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", 
        },  
        method: 'post',  
        body: `login=${this.state.login}`
      })   
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
    })

    }
    
  

  //На главную
  toChats(){
    this.setState({
      page:"chats",
      title: "Мои диалоги"
    })
  }

  toDialog(id,name,surname) {
    this.setState({
      chatterId: id,
      page: "post",
      title: "Диалог: " + name + " " + surname
    })
  }

  //Установить айди чата
  setChatId(id) {
    this.setState({
      chatId: id
    })
  }

  //Обнулить посты
  nullPosts() {
    this.setState({
      posts: null,
      startFetching: false
    })
  }

  //Отрендерить компоненты
  render() {
  
    

    return (
      <div className="App">

        <Header title={this.state.title} loadHead={this.state.loadHead} avatar={this.state.avatar ? this.state.avatar : this.defaultAvatar}/>
    
        <div className="content">

           <ReactCSSTransitionGroup transitionName="example"
                    transitionEnterTimeout={300}
                    transitionLeave={false}
                    transitionAppear={true}
                    transitionAppearTimeout={300}>


            {this.state.page === "chats" ?  <ChatsPage USERS_URL={this.USERS_URL} toDialog={this.toDialog.bind(this)} login={this.state.login} /> : null}       

            {this.state.page === "auth" ? <AuthPage toggleAuth={this.toggleAuth.bind(this)} toggleReg={this.toggleReg.bind(this)} onFailedAuth={this.onFailedAuth.bind(this)}
            onFailedReg={this.onFailedReg.bind(this)} onSuccessAuth={this.onSuccessAuth.bind(this)} onSuccessReg={this.onSuccessReg.bind(this)} 
            loadHead={this.loadHead.bind(this)} notFilled={this.notFilled.bind(this)}/> : null}

            {this.state.page === "post" ? <PostPage Add={this.Add.bind(this)} checkInputKeyPress={this.checkInputKeyPress.bind(this)} 
                postContent={this.state.postContent} handleContentChange={this.handleContentChange.bind(this)} posts={this.state.posts} addPost={this.state.addPost}
                onSuccessReg={this.onSuccessReg.bind(this)} fetchPosts={this.fetchPosts.bind(this)} chatId={this.state.chatId} chatterId={this.state.chatterId} 
                nullPosts={this.nullPosts.bind(this)} CHATS_URL={this.CHATS_URL} setChatId={this.setChatId.bind(this)} chatterId={this.state.chatterId} 
                login={this.state.login} disableAdd={this.disableAdd.bind(this)}/> : null}
                    
          </ReactCSSTransitionGroup>

          {this.state.page === "auth" ? null : <Menu toggleAdd={this.toggleAdd.bind(this)} deAuth={this.deAuth.bind(this)} toChats={this.toChats.bind(this)}
          page={this.state.page}/>}
          <Contacts />
          <Copyright /> 

        </div>

      </div>
    );
  }
}

export default App
