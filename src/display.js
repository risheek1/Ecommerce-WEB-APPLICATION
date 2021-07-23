import React,{useState,useEffect} from 'react'
import {auth,db,dat} from './firebase.js'
import firebase from 'firebase';
  import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

export const Products=(props)=>{
    
	const [state,setState]=useState
    ({ 
      results:[], 
 
    }); 
    const [cart,setCart]=useState();
		useEffect(()=>{
	
	 const r=async()=>{
		    var results=[];
		    var l=[];

		db.collection("Products").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
        results.push(doc.data());

        setState({
        	results:results
        });

    });

});
auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    sessionStorage.setItem("User",auth.currentUser.uid);

  } else {
    // No user is signed in.
    console.log("scb")
  }
});

		dat.ref(localStorage.getItem("User")).once('value', function(snapshot) {
  snapshot.forEach(function(userSnapshot) {
    var userKey = userSnapshot.key;
    var userData = userSnapshot.val();
    l.push([userData])
  });
});
console.log(l)
setCart({cart:l});


	 }
	 r();
	},[]);
const p=(id)=>
	{

let q=0

var r=Object.values(cart)
for(let i=0;i<r[0].length;i++)
{
   const e=Object.values(r[0][i])
   if(e[0].ProductName==id)
   {
   	q+=1;
   }
 }
var f=0;
auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    sessionStorage.setItem("User",auth.currentUser.uid);

  } else {
    // No user is signed in.
    console.log("scb")
  }
});

sessionStorage.setItem("User",auth.currentUser.uid);
console.log(auth.currentUser)
localStorage.setItem("Email",auth.currentUser.email)
console.log(sessionStorage.getItem("User"))
		dat.ref(auth.currentUser.uid).on('value',(snapshot)=>{
       const mo=snapshot.val();
         for(let i in mo)
         {
              if(mo[i].ProductName==id)
              {
              	f=1;
                break;
              	}
         }
      });
if(f==1)
{
	alert("Already in Cart");
}
else if(f==0)
{
	var price,ig;
     for(let t=0;t<state.results.length;t++)
    {
	if(state.results[t].ProductName==id)
	{
      price=state.results[t].ProductPrice;
      ig=state.results[t].ProductImg;
	}
	
    }
dat.ref(localStorage.getItem("User")).push({ProductImg:ig,ProductName:id,ProductPrice:price,Quantity:1,UnitPrice:price});
}
 console.log(auth.currentUser.uid)
}

	return(

	<React.Fragment>
  <h1 class="heading">Products</h1>
  <hr/>
  		    		<div class="container page-wrapper">

  {state.results.length===0 && <div>No products to display</div>}
  {
  	state.results.map(product=>(

  <div class="page-inner">
  
    <div class="row">
      <div class="el-wrapper">
        <div class="box-up">
          <img class="im" src={product.ProductImg} alt=""/>
          <div class="img-info">
            <div class="info-inner">
              <span class="p-name">{product.ProductName}</span>
              
            </div>
            
          </div>
        </div>

        <div class="box-down">
          <div class="h-bg">
            <div class="h-bg-inner"></div>
          </div>

          <a class="cart" href="#">
            <span class="price">₹
{product.ProductPrice}</span>
            <span class="add-to-cart">
              <span class="txt" id={product.ProductName} onClick={(e)=>p(e.target.id)}>Add in cart</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>

  		))

  }
    </div>

  </React.Fragment>
	)
}