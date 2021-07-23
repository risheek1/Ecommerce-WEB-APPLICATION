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
export const Completed=()=> {




	return(

<React.Fragment>
	
<h1>PaymentSuccesful</h1>


 </React.Fragment>
);

}
