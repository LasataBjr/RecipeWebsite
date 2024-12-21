import { Link } from "react-router-dom"
import logo from './assets/images/Logo.png'


function Navbar({ handleLogout }){
    
return(
            <>
                <nav className='navbar'>
                    
                        <Link to="/">
                            <img src={logo} className="navlogo" alt="Website Logo" />
                        </Link>
                    
                    
                        <ul id="navbar">
                            <li><Link to='/' class="active">Home</Link></li>
                            <li><Link to='/Recipeadd'>Add Recipe</Link></li>
                            <li><Link to='/Recipedel'>View Recipes</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>                                           
                                                        
                        </ul>                             
                    
                </nav>
            </>
       );
    }
export default Navbar
