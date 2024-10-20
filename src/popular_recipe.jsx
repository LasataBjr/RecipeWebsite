import './assets/css/popular_recipe.css'
import c_curry from './assets/images/chicken curry.png'
import b_sekuwa from './assets/images/buff sekuwa.png'
import p_sekuwa from './assets/images/Pork Bhutuwa.png'
import  "./fontawesome-free-6.6.0-web/css/all.min.css"
import arrow_up from './assets/images/arrow_up.png'
import { useState} from 'react'
function popular_review(){

    const [count, setCount] = useState(0);
    const [like, setLike] = useState(false); //to track only once the button is clicked so that one person cannot click like button multiple times
    const popularity = () => {
            if(like == false)//(!like) When the function is called, it checks if like is false using if (!like). Since like is false, the condition is true (because !false means "not false," which is true).
         {
            setCount(count + 1);
            setLike(true)
        }
    };
    return(
        <>
                  
        <h2 id="tt1">Popular Recipe</h2>
        <br></br>
        <div id="row">
                <div className="column">
                    <img  className="latest" src={c_curry}></img>
                    <p className="l_title">Chicken Curry</p>
                    
                    <button className='btn2' onClick={popularity} disabled={popularity}><i class="fa-solid fa-heart"></i></button><p>like: {count}</p>
                    
                    <button className='btn3' ><img className="arrow" src={arrow_up} ></img></button>
                    
                </div>
                <div className="column">
                    <img className="latest" src={b_sekuwa}></img>
                    <p className="l_title">Buff Sekuwa</p> 
                    <button className='btn2'><i class="fa fa-heart"></i></button><p>like: {count}</p>
                    <button className='btn3'><img className="arrow" src={arrow_up}></img></button>
                                  
                </div>
                <div className="column">
                    <img className="latest" src={p_sekuwa}></img>
                    <p className="l_title">Pork Sekuwa</p>
                    <button className='btn2'><i class="fa fa-heart"></i></button><p>like: {count}</p>
                    <button className='btn3'><img className="arrow" src={arrow_up}></img></button>
                </div>
            </div>
        </>
    )
}
export default popular_review