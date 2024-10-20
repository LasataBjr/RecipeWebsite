import './assets/css/search.css'
import  "./font-awesome/css/font-awesome.min.css"
import bck from './assets/images/background1.jpg'

function searchbar(){
    return(
        <>
        <div id="content">
            <p id="slogan">I would like to cook</p>
            <img id ="background_img"src={bck}></img>
             <p id="slogan1">"Where Great Taste Begins at Home"</p>
        </div>
        <div id="search_bar">
            <input id="search" type="text" placeholder="Search" name="SearchBar"></input>
            <button id="btn1"><i class="fa fa-search" id="search_icon"></i></button>
        </div>
        </>
    )
}
export default searchbar