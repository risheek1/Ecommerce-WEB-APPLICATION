import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import React,{Component} from 'react'
import {Home} from './home.js'
import {AddProducts} from './add.js'
import {Products} from './display.js'
import {Sign} from './sign.js'
import {auth,db,storage} from './firebase.js'
import {Login} from './login.js'
export class Ap extends Component{
   componentDidMount() {

        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
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
    <Route exact path='/' component={Home}/>
    <Route path="/sign" component={Sign} />
        <Route path="/add" component={AddProducts} />

        <Route path="/login" component={Login} />

    </Switch>
    
    </BrowserRouter>
    
    </React.Fragment>
  );
}
}
export default Ap;