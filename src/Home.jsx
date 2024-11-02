import Head from './Header.jsx'
import Searchbar from './searchbar.jsx'
import Latest_review from './Latest_recipe.jsx'
import PopularReview from './PopularReview.jsx'
import recipePage from './recipePage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/css/index.css'


function Home() {
    return(
                                       
        <>
            <Head/>
            <Router>
                <Routes>
                    <Route path="/" element={<Searchbar/>}/>
                    <Route path="/recipePage/:id" element={<recipePage/>}/>
                </Routes>
            </Router>
           
            <Latest_review/>
            <PopularReview/>
        </>
    );
}
    

export default Home
