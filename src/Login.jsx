import React, {useState} from 'react';
import './assets/css/login.css'
import axios from 'axios'

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const loginhandle = async() =>{
    //     console.Log(username);
    //     console.Log(password);
    // }
    const handleLogin = async (e) => {
        e.preventDefault(); //Submission Logic handle like exception handling
            try{
                const response = await axios.post('http://localhost:5000/login',{
                    username,
                    password
                });

                if(response.status === 200){
                    alert("Login successful");
                }else{
                    alert("Login Failed!");
                }                
            }catch(error){
                console.error(error);
                alert("an error occured during login.");
            }
    }
    
    return(
        <>
        <h1>THis is login form</h1>
            <div id="loginform">
                <form onSubmit={handleLogin}>
                   
                        <input type="text" placeholder='Username' id="uname" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                        {/*onChange: This is a React event that triggers when the value in an input field changes.*/}
                        <input type="password" placeholder="Password" id="pwd" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        <button >Login</button>

                   
                </form>
            </div>
        </>
    )
}
export default Login