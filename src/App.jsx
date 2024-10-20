import Head from './Header.jsx'
import Searchbar from './searchbar.jsx'
import Latest_review from './Latest_recipe.jsx'
import Popular from './popular_recipe.jsx'
import './assets/css/index.css'
import Login from './Login.jsx'

function App() {
    return(
        <>
            
            <Login/>
            <Head/>
            <Searchbar/>
            <Latest_review/>
            <Popular/>
        </>

    );
}
    

export default App
