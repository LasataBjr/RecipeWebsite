import Head from './Header.jsx'
import Searchbar from './searchbar.jsx'
import Latest_review from './Latest_recipe.jsx'
import PopularReview from './PopularReview.jsx'
import './assets/css/index.css'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import RecipeInsertion from './Recipeadd.jsx'
import RecipeDeletion from './Recipedel.jsx'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

function App() {
    return(
                                       
            <Router>
                <nav>
                    <Link to='/Login'>Login</Link>
                    <Link to='/Signup'>Sign Up</Link>
                    <Link to ='/Recipeadd'>Add Recipe</Link>
                    <Link to ='/Recipedel'>View</Link>
                </nav>
                <Routes>
                    <Route path='/Login' element={<Login/>}/>
                    <Route path='/Signup' element={<Signup/>}/>
                    <Route path='/Recipeadd' element ={<RecipeInsertion/>}/>
                    <Route path='/Recipedel' element ={<RecipeDeletion/>}/>
                    <Route path='/' element={
                        <> 
                            <Head/>
                            <Searchbar/>
                            <Latest_review/>
                            <PopularReview/>
                            
                        </>
                    }/>
                </Routes>
            </Router>
            


    );
}
    

export default App
