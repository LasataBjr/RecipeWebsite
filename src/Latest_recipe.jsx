import './assets/css/latest_recipe.css'
import c_curry from './assets/images/chicken curry.png'
import b_sekuwa from './assets/images/buff_sekuwa.jpg'
import p_sekuwa from './assets/images/pork_sekuwa.jpg'
import  "./fontawesome-free-6.6.0-web/css/all.min.css"
import arrow_up from './assets/images/arrow_up.png'
function latest_review(){
    return(
        <>
            <h2 id="tt1">Latest Recipe</h2>
            <br></br>
            <div id="row">
                <div className="column">
                    <img  className="latest" src={c_curry}></img>
                    <p className="l_title">Chicken Curry</p>
                    <button className='btn2'><i class="fa-solid fa-heart"></i></button>
                    <button className='btn3' ><img className="arrow" src={arrow_up}></img></button>
                </div>
                <div className="column">
                    <img className="latest" src={b_sekuwa}></img>
                    <p className="l_title">Buff Sekuwa</p> 
                    <button className='btn2'><i class="fa fa-heart"></i></button>
                    <button className='btn3'><img className="arrow" src={arrow_up}></img></button>
                                  
                </div>
                <div className="column">
                    <img className="latest" src={p_sekuwa}></img>
                    <p className="l_title">Pork Sekuwa</p>
                    <button className='btn2'><i class="fa fa-heart"></i></button>
                    <button className='btn3'><img className="arrow" src={arrow_up}></img></button>
                </div>
            </div>
        </>
    )
}
export default latest_review