import './assets/css/search.css'
import  "./font-awesome/css/font-awesome.min.css"

function searchbar(){
    return(
        <>
        <div id="search_bar">
            <input id="search" type="text" placeholder="Search" name="SearchBar"></input>
            <button id="btn1"><i class="fa fa-search" id="search_icon"></i></button>
        </div>
        </>
    )
}
export default searchbar