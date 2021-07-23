import React,{Component,useState,useEffect} from 'react'
import {auth,db,dat} from './firebase.js'
import firebase from 'firebase';
import {Link} from 'react-router-dom'

  import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'
import $ from 'jquery';
import {NavBar} from './navbar.js'

export const Cart=()=> {

    
    const [state,setState]=useState
    ({ 
      res:[], 
      dict:{},
      total:0,
    }); 
    var ett={}
        const [user,setUser]=useState();
    
useEffect(()=>{
	const y=async()=>
	{
		var r={};
		db.collection("Products").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        r[doc.data().ProductName]=doc.data().ProductPrice;

        
                       console.log(doc.id, " => ", doc.data());
console.log(r);
ett=r;
console.log(ett);
    });

});
		
	}
	const r=async()=>{
      
      var b=sessionStorage.getItem("User")

      var results=[]; 
      var l=[]
      console.log(b)
      //var b=user.user 
      		 dat.ref(sessionStorage.getItem("User")).on('value', function(snapshot) {
  snapshot.forEach(function(userSnapshot) {
    var userKey = userSnapshot.key;
    var userData = userSnapshot.val();
    l.push([userData])
    console.log(userData)
    state.total+=userData.ProductPrice;
    setState({res:l});
    state.res=l
var e=[];
for(let t=0;t<state.res.length;t++)
{
	e.push(state.res[t][0])
}
console.log(e)
setState({res:e});
console.log(state.res)
console.log(state.total)
localStorage.setItem("Total",state.total)
  });
});

	 }
	 y();
		 r();
	},[]);

const r=(v,u,t)=>
{
console.log(state.total)

  dat.ref(sessionStorage.getItem("User")).once('value', function(snapshot) {
  snapshot.forEach(function(userSnapshot) {
    var userKey = userSnapshot.key;
    var userData = userSnapshot.val();
    if(userData.ProductName==t)
    {
    	  document.getElementById(t).innerHTML=u*userData.UnitPrice;

    	dat.ref(sessionStorage.getItem("User")+'/'+userKey).set({
    Quantity: u,
    ProductPrice:u*userData.UnitPrice,
    ProductImg:userData.ProductImg,
    ProductName:userData.ProductName,
    UnitPrice:userData.UnitPrice,
  });
    	

}
    

  });
});
    	setState({res:[]})

      	  window.location.reload();

}	
const emm=(i)=>
{
	console.log(i);
	  dat.ref(sessionStorage.getItem("User")).once('value', function(snapshot) {
  snapshot.forEach(function(userSnapshot) {
    var userKey = userSnapshot.key;
    var userData = userSnapshot.val();
    if(userData.ProductImg==i)
    {
    	dat.ref(sessionStorage.getItem("User")+'/'+userKey).remove();
            
}
    	setState({res:[]})

state.res=[]
  });
});
	      	setState({res:[]})

	      	  window.location.reload();

}

	return(

<React.Fragment>
	
<h1>Cart</h1>
<hr/>
  {state.res.length===0 && <div>No products to display</div>}
 {state.res.map((product,index)=>(
 	<div class="row">
 	          <img class="img" src={product.ProductImg} alt=""/>
 	<p key={index} class="q">{product.ProductName}</p>
 	<h6 id={product.ProductName}>{product.ProductPrice}</h6>
 	<div class="product-counter">
    Quantity:<input class="quantity" id={product.ProductPrice}type="text" defaultValue={product.Quantity} name={product.ProductName} onChange={(e)=>r(e.target.id,e.target.value,e.target.name)} />
    </div>
 	<button class="button"  id={product.ProductImg} ><img class="tr" id={product.ProductImg} onClick={(e)=>emm(e.target.id)} src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Trash_font_awesome.svg/1200px-Trash_font_awesome.svg.png"/></button>
<hr/>
 	</div>
 	))}
 <Link to="/payment"><button class="button-os">Checkout</button></Link>
 </React.Fragment>
);

}
