import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import ItemsComponent from './components/ItemsComponent';
import Menu from './components/Menu';
import './style/App.css'
import { fire } from './fire';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    items: {},
    authenticated: false,
    loading: true
  }
  itemsRef = '';

  EmailAndPasswordAuthentication = (e) => {
    e.preventDefault()
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    fire.auth().fetchProvidersForEmail(email)
      .then(provider => {
        if (provider.length === 0) {
          toast.success("Please enter email and password"), { autoClose: 20000 }
        } else if (provider.indexOf("password") === -1) {
          toast.error("Pasword for email:  " + email + " is incorrect")
        } else {
          return fire.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .catch((error) => {
        toast.error("Ooops:  " + error.message)
      })
  }

  EmailAndPasswordRegistration = (e) => {
    e.preventDefault()
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    fire.auth().fetchProvidersForEmail(email)
      .then((provider) => {
        if (provider.length === 0) {
          return fire.auth().createUserWithEmailAndPassword(email, password)
            .then(toast.success("Success. Account with email: " + email + " has been created"), { autoClose: 20000 })
        } else if (provider.indexOf("email") === -1) {
          toast.success("Account with email: " + email + " is already present. Please login instead of register."), { autoClose: 30000 }
        }
      })
      .catch((error) => {
        toast.error("Ooops:  " + error.message)
      })
  }

  componentDidMount() {
    this.removeAuthListener = fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.itemsRef = fire.database().ref(`items/${user.uid}`)
        this.itemsRef.on('value', data => {
          this.setState({
            authenticated: true,
            items: data.val(),
            loading: false
          })
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })
  }
  logOut = () => {
    fire.auth().signOut().then((user) => {
      this.setState({ items: null })
    })
  }
  componentWillUnmount() {
    fire.removeBinding(this.itemsRef)
  }
  completeItem = (id) => {
    this.itemsRef.update({
      [id]: {
        ...this.state.items[id],
        completed: true
      }
    })
  }
  changeItem = (id) => {
    console.log("STATUS", this.state.items[id].completed)
    this.itemsRef.update({
      [id]: {
        ...this.state.items[id],
        completed: !this.state.items[id].completed
      }
    })
  }
  deleteItem = (id) => {
    this.itemsRef.update({
      [id]: null
    })
  }
  removeItem = (id) => {
    this.itemsRef.child(id).remove()
  }
  addItem = (e) => {
    e.preventDefault();
    this.itemsRef.push({
      item: this.todoItem.value,
      completed: false
    })
  }
  render() {
    if (this.state.loading) {
      return (<h3>Loading</h3>)
    }
    return (
      <div>
        <ToastContainer />
        <BrowserRouter>
          <div className="wrap">
            <h2>To do</h2>
            <Menu
              logOut={this.logOut}
              authenticated={this.state.authenticated}
              authWithFacebook={this.authWithFacebook}
              emailInput={el => this.emailInput = el}
              passwordInput={el => this.passwordInput = el}
              EmailAndPasswordAuthentication={this.EmailAndPasswordAuthentication}
              EmailAndPasswordRegistration={this.EmailAndPasswordRegistration}
            />
            <ul className="menu">
            </ul>
            <Route exact path="/"
              render={props =>
                <ItemsComponent
                  items={this.state.items}
                  all={false}
                  done={false}
                  action={this.completeItem}
                  addItem={this.addItem}
                  changeItem={this.changeItem}
                  removeItem={this.removeItem}
                  inputRef={el => this.todoItem = el}
                  authenticated={this.state.authenticated}
                />
              } />
            <Route exact path="/completed"
              render={props =>
                <ItemsComponent
                  items={this.state.items}
                  all={false}
                  done={true}
                  changeItem={this.changeItem}
                  removeItem={this.removeItem}
                  authenticated={this.state.authenticated}
                />
              } />
            <Route exact path="/all"
              render={props =>
                <ItemsComponent
                  items={this.state.items}
                  addItem={this.addItem}
                  changeItem={this.changeItem}
                  removeItem={this.removeItem}
                  all={true}
                  inputRef={el => this.todoItem = el}
                  authenticated={this.state.authenticated}
                />
              } />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;