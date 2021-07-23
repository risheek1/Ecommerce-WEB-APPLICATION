import './bootstrap-4.3.1-dist/css/bootstrap.css';
import {auth} from './firebase.js'
import React from 'react'
import {Link} from 'react-router-dom'
export const NavBar=({user})=>
{
	  const handleLogout = () => {
        auth.signOut().then(() => {
        })
    }
	return(
	<React.Fragment>
	<div>
	<nav class="navbar navbar-expand-md navbar-light">

  <a class="navbar-brand" href="#!">
    <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="30" alt="mdb logo"/>
  </a>


  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav1"
    aria-controls="basicExampleNav1" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>



  <div class="collapse navbar-collapse" id="basicExampleNav1">

    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a href="#!" class="nav-link navbar-link-2 waves-effect">
          <span class="badge badge-pill red">1</span>
          <i class="fas fa-shopping-cart pl-0"></i>
        </a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle waves-effect" id="navbarDropdownMenuLink3" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="true">
          <i class="united kingdom flag m-0"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#!">Action</a>
          <a class="dropdown-item" href="#!">Another action</a>
          <a class="dropdown-item" href="#!">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a href="#!" class="nav-link waves-effect">
          Shop
        </a>
      </li>
      <li class="nav-item">
        <a href="#!" class="nav-link waves-effect">
          Contact
        </a>
      </li>
   {!user &&
      <li class="nav-item">
        <a href="#!" class="nav-link waves-effect">
          Sign in
        </a>
      </li>
  }
 {!user && 
      <li class="nav-item pl-2 mb-2 mb-md-0">
      <Link to="/sign" className="NavLinks">
        <a href="#!" type="button"
          class="btn btn-outline-info btn-md btn-rounded btn-navbar waves-effect waves-light">Sign up</a>
        </Link>
      
      </li>
    } 
     {user && <li className='nav-item pl-2 mb-2 mb-md-0'>
                <span><Link to="/" className='navlink' id="pol">{user}</Link></span>
            </li>}
            {user &&                 <Link to="/login"><span><button className='btn btn-primary' onClick={handleLogout}>Logout</button></span></Link>}
             {user && <li className='nav-item pl-2 mb-2 mb-md-0'>
                <span><Link to="/cart" className='navlink' id="pol">Cart</Link></span>
            </li>}
    </ul>

  </div>

</nav>

<hr style={{width:"100"}}/>
	</div>
	</React.Fragment>)
}
