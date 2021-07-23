import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import React,{Component} from 'react'
import {Home} from './home.js'
import {AddProducts} from './add.js'
import {Products} from './display.js'
import {Sign} from './sign.js'
import {auth,db,storage} from './firebase.js'
import {Login} from './login.js'
import {Ap} from './h.js'
import {Cart} from './cart.js'
import {Payment} from './payment.js'
import {Completed} from './c.js'
export class App extends Component{
   
    state = {
        user: null,
    }

    componentDidMount() {

        // getting user info for navigation bar
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('Userdata').doc(user.uid).get().then(snapshot => {
                    this.setState({
                        user: snapshot.data().Name
                    })
                })
                  
            }
            else {
                this.setState({
                    user: null
                })
            }
        })
    }

  render()
  {
  return (
    <React.Fragment>
    <BrowserRouter>
    <Switch>
    <Route exact path='/' component={() => <Home user={this.state.user} />}/>
    <Route path="/sign" component={Sign} />
        <Route path="/add" component={AddProducts} />
                <Route path="/payment" component={Payment} />

        <Route path="/login" component={Login} />
        <Route path="/cart"  component={Cart}/>
        <Route path='/Completed' component={Completed}/>
    </Switch>
    
    </BrowserRouter>
    
    </React.Fragment>
  );
}
}
export default App;