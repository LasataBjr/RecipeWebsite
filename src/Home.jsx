import Head from './Header.jsx'
import Searchbar from './searchbar.jsx'
import Latest_review from './Latest_recipe.jsx'
import PopularReview from './PopularReview.jsx'
import './assets/css/index.css'


function Home() {
    return(
                                       
        <>
            <Head/>
            <Searchbar/>
            <Latest_review/>
            <PopularReview/>
        </>
    );
}
    

export default Home
