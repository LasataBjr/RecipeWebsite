import React, {useState} from 'react';
import './assets/css/login.css'
import axios from 'axios'

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loginhandle = async() =>{
        console.Log(username);
        console.Log(password);
    }
    // const handleLogin = (e) => {
    //     e.preventDefault(); //Submission Logic handle like exception handling
    //         console.log(username);
    //         console.log(password);
    // }
    
    return(
        <>
            <div id="loginform">
                <form onSubmit={handleLogin}>
                    <div id="">
                        <input type="text" placeholder='Username' id="uname" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                        {/*onChange: This is a React event that triggers when the value in an input field changes.*/}
                        <input type="password" placeholder="Password" id="pwd" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        <button onClick={loginhandle}  >Login</button>

                    </div>
                </form>
            </div>
        </>
    )
}
export default Login