import React,{useEffect} from 'react'
import {NavBar} from './navbar.js'
import {AddProducts} from './add.js'
import {Products} from './display.js'
import { useHistory } from 'react-router-dom'
import {auth} from './firebase.js'

export const Home=({user})=>
{
	    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
    })

	return(
	<React.Fragment>
	<div>
	<NavBar user={user}/>
    <Products/>
	</div>
	</React.Fragment>)
}
