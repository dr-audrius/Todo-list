import React, {Component} from 'react' 
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ItemsComponent from './components/ItemsComponent';
import './App.css'
import fire from './fire';

class App extends Component {
  state = {
    items: {}
    }
    
  itemsRef = fire.database().ref('items');

  componentWillMount(){
    this.itemsRef.on('value', data=> {
      this.setState({
        items: data.val()
      })
    })
  }
  componentWillUnmount(){
    fire.removeBinding(this.itemsRef)
  }


  completeItem=(id)=>{  
    this.itemsRef.update({
      [id]:{
        ...this.state.items[id], 
        completed: true      
      }
    })
  }

  changeItem=(id)=>{  
    console.log("STATUS", this.state.items[id].completed)
    this.itemsRef.update({
      [id]:{
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

  addItem=(e)=> {
    e.preventDefault();
    this.itemsRef.push({
      item: this.todoItem.value, 
      completed: false     
    })
  }

  render() {
    return (
      <BrowserRouter>  
        <div className="wrap">
          <h2>To do</h2>
          <ul className="menu">
            <li><Link to={'/'}>To do</Link></li>
            <li><Link to={'/completed'}>Completed</Link></li>
            <li><Link to={'/all'}>All</Link></li>
          </ul>
          <Route exact path="/"
            render={props => 
              <ItemsComponent  
                items={this.state.items} 
                all = {false}
                done={false}
                action={this.completeItem}
                addItem={this.addItem}
                changeItem={this.changeItem}
                removeItem={this.removeItem}
                inputRef={el => this.todoItem = el}
                /> 
            }/>
          <Route exact path="/completed" 
            render={props => 
              <ItemsComponent  
                items={this.state.items} 
                all = {false}
                done={true}
                changeItem={this.changeItem}
                removeItem={this.removeItem}

                /> 
            }/>
           <Route exact path="/all" 
            render={props => 
              <ItemsComponent  
                items={this.state.items} 
                changeItem={this.changeItem}
                removeItem={this.removeItem}
                all = {true}
                /> 
            }/>
        </div>
      </BrowserRouter>   
    );
  }
}
export default App;