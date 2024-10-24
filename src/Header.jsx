import React from 'react'
import bakery from './assets/images/bakery.jpg'
import chicken from './assets/images/chicken.jpg'
import fish from './assets/images/fish.jpg'
import buffalo from './assets/images/buffalo.jpg'
import veg from './assets/images/veg.png'
import pork from './assets/images/pork.jpg'
import './assets/css/header.css'
import { useState} from 'react'

function Head(){
   
    const [pop, setPop] = useState(false)
    const popup = () =>{
        setPop(!pop) 
    }
    const [popc, setPopc] = useState(false)
    const popupc = () =>{
        setPopc(!popc) 
    }
    const [popb, setPopb] = useState(false)
    const popupb = () =>{
        setPopb(!popb) 
    }
    const [popba, setPopba] = useState(false)
    const popupba = () =>{
        setPopba(!popba) 
    }
    const [popv, setPopv] = useState(false)
    const popupv = () =>{
        setPopv(!popv) 
    }
    const [popp, setPopp] = useState(false)
    const popupp = () =>{
        setPopp(!popp) 
    }
    const [popf, setPopf] = useState(false)
    const popupf = () =>{
        setPopf(!popf) 
    }
    
    return(
        <>
            
            <header>
                <div id='container'>
                    
                        <div className="col">
                            <a href='#' onClick={popupc}><img  className="list" src={chicken}></img>
                            <p className="title" >Chicken</p></a>
                        </div>
                        {
                            popc &&(
                                <div>
                                    <p>check</p>
                                    <ul>
                                        <li><a href="#">Chicken Curry</a></li>
                                        <li><a href="#">Chicken Chilly</a></li>
                                        <li><a href="#">Chicken Tandoori</a></li>
                                        <li><a href="#">Chicken Momo</a></li>
                                        <li><a href="#">Chicken Biryani</a></li>
                                    </ul>
                                    <button onClick={popupc}>CLose</button>
                                </div>
                            )
                        }
                        <div className="col">
                            <a href="#" onClick={popupf}><img className="list" src={fish}></img>
                            <p className="title">Fish</p></a>
                        </div>   
                        {
                            popf &&(
                                <div>
                                    <p>check</p>
                                    <ul>
                                        <li><a href="#">Fish Curry</a></li>
                                        <li><a href="#">Chicken Chilly</a></li>
                                        <li><a href="#">Chicken Tandoori</a></li>
                                        <li><a href="#">Chicken Momo</a></li>
                                        <li><a href="#">Chicken Biryani</a></li>
                                    </ul>
                                    <button onClick={popupf}>CLose</button>
                                </div>
                            )
                        } 
                        <div className="col">
                            <a href="#" onClick={popupb}><img className="list" src={buffalo}></img>
                            <p className="title">Buffalo</p></a>
                        </div>
                        {
                            popb &&(
                                <div>
                                    <p>check</p>
                                    <ul>
                                        <li><a href="#">Chicken Curry</a></li>
                                        <li><a href="#">Chicken Chilly</a></li>
                                        <li><a href="#">Chicken Tandoori</a></li>
                                        <li><a href="#">Chicken Momo</a></li>
                                        <li><a href="#">Chicken Biryani</a></li>
                                    </ul>
                                    <button onClick={popupb}>CLose</button>
                                </div>
                            )
                        }
                        <div className="col">
                            <a href="#" onClick={popupp}><img className="list" src={pork}></img>
                            <p className="title">Pork</p></a>
                        </div>
                        {
                            popp &&(
                                <div>
                                    <p>check</p>
                                    <ul>
                                        <li><a href="#">Chicken Curry</a></li>
                                        <li><a href="#">Chicken Chilly</a></li>
                                        <li><a href="#">Chicken Tandoori</a></li>
                                        <li><a href="#">Chicken Momo</a></li>
                                        <li><a href="#">Chicken Biryani</a></li>
                                    </ul>
                                    <button onClick={popupp}>CLose</button>
                                </div>
                            )
                        }
                        <div className="col">
                            <a href="#" onClick={popupv}><img className="list" src={veg}></img>
                            <p className="title">Veg</p></a>
                        </div>
                        {
                            popv &&(
                                <div>
                                    <p>check</p>
                                    <ul>
                                        <li><a href="#">Chicken Curry</a></li>
                                        <li><a href="#">Chicken Chilly</a></li>
                                        <li><a href="#">Chicken Tandoori</a></li>
                                        <li><a href="#">Chicken Momo</a></li>
                                        <li><a href="#">Chicken Biryani</a></li>
                                    </ul>
                                    <button onClick={popupv}>CLose</button>
                                </div>
                            )
                        }
                        <div className="col">    
                            <a href="#" onClick={popupba}><img className="list" src={bakery}></img>
                            <p className="title">Bakery</p></a>
                        </div>
                        {
                            popba &&(
                                <div>
                                    <p>check</p>
                                    <ul>
                                        <li><a href="#">Chicken Curry</a></li>
                                        <li><a href="#">Chicken Chilly</a></li>
                                        <li><a href="#">Chicken Tandoori</a></li>
                                        <li><a href="#">Chicken Momo</a></li>
                                        <li><a href="#">Chicken Biryani</a></li>
                                    </ul>
                                    <button onClick={popupba}>CLose</button>
                                </div>
                            )
                        }
                    
                </div>
                
            </header>
        </>
    )
}
export default Head
