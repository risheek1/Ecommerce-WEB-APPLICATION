import React,{Component,useState,useEffect} from 'react'
import {auth,db,dat} from './firebase.js'
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import firebase from 'firebase';
  import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'
import $ from 'jquery';
import {NavBar} from './navbar.js'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { useHistory } from 'react-router-dom'

export const Payment=()=> {
// defining state
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

 const [state,setState]=useState
    ({ 
      res:[], 
      dict:{},
      total:0,
    }); 

    useEffect(() => {

        auth.onAuthStateChanged(user => {
            if (user) {
              console.log(localStorage.getItem("User"))
                db.collection('UserData').doc(localStorage.getItem("User")).onSnapshot(snapshot => {
                    
                    console.log(snapshot.data)
                })
            }
            else {
                history.push('/login')
            }
        })
    })

    const cashoutSubmit = (e) => {
        e.preventDefault();
        auth.onAuthStateChanged(user => {
            if (user) {

                const date = new Date();
                const time = date.getTime();
                var b=localStorage.getItem("User")
      var results=[]; 
      var l=[]
                           dat.ref(b).on('value', function(snapshot) {
  snapshot.forEach(function(userSnapshot) {
    var userKey = userSnapshot.key;
    var userData = userSnapshot.val();
    l.push([userData])
    console.log(userData)
    setState({res:l});
    state.res=l
var e=[];
for(let t=0;t<state.res.length;t++)
{
  e.push(state.res[t][0])
  state.total+=state.res[t][0].ProductPrice
}
console.log(e)
setState({res:e});
console.log(state.res)
console.log(state.total)
localStorage.setItem("Total",state.total)
  });
});

                for(let u=0;u<state.res.length;u++)
                {
                  dat.ref('Orders'+'/'+user.uid).push({ProductName:state.res[u][0].ProductName,ProductPrice:state.res[u][0].UnitPrice,Quantity:state.res[u][0].Quantity})
                }
                db.collection('Buyer-info ' + user.uid).doc('_' + time).set({

                    BuyerName: "Risheek",
                    BuyerEmail: localStorage.getItem("Email"),
                    BuyerCell: cell,
                    BuyerAddress: address,
                    BuyerPayment: sessionStorage.getItem("Total"),
                }).then(() => {
                    setCell('');
                    setAddress('');
                    setSuccessMsg('Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds');
                    setTimeout(() => {
                        history.push('/')
                    }, 5000)
                }).catch(err => setError(err.message))
            }
        })
    }

    return (
        <>
            <div className='container'>
                <br />
                <h2>Cashout Details</h2>
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control' required
                        value="
                        Risheek" disabled />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required
                        value={localStorage.getItem("Email")} disabled />
                    <br />
                    <label htmlFor="Mobile No">Cell No</label>
                    <input type="number" className='form-control' required
                        onChange={(e) => setCell(e.target.value)} value={cell} placeholder='eg 03123456789' />
                    <br />
                    <label htmlFor="Delivery Address">Delivery Address</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setAddress(e.target.value)} value={address} />
                    <br />
                    <label htmlFor="Price To Pay">Price To Pay</label>
                    <input type="number" className='form-control' required
                        value={localStorage.getItem("Total")} disabled />
                    <br />

                    <br />
                    <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
            
            </div>
        </>
    )
}
