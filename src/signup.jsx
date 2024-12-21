import React, {useState} from 'react';
import './assets/css/signup.css';
import  "./fontawesome-free-6.6.0-web/css/all.min.css"
import axios from 'axios'


function Signup(){
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[errorMessage, setErrorMessage] = useState('');
    const[token, setToken] = useState(null);
        // const signuphandle = async()=>{
        //     console.log(username);
        //     console.log(password);
        // }
        const handlesignup = async(e)=>{
                e.preventDefault();
                setErrorMessage('');

                try{
                    const response = await axios.post('http://localhost:5000/signup', {
                        username,
                        password
                    });                    
               
                    if(response.status === 201)
                    {
                        const receivedToken = response.data.token;
                        setToken(receivedToken);
                        localStorage.setItem('authToken', receivedToken);
                        alert("Signup Successful");
                    }
                    else{
                        alert("Signup Successful,token not received");
                    }
                }
                catch(error){            
                    if(error.response){
                        setErrorMessage('an error occured')      
                    }else{
                        setErrorMessage('Network error, please try again later');
                    }
                }
            };

    return(
        <>
        
            <div id="signin-form">
                <h1>SignUp</h1>
                <form onSubmit={ handlesignup }>
                    <div className = "inputbox">
                        <input type="text" placeholder="Username" 
                        value={username} id="name" onChange={(e) => setUsername(e.target.value)} required/>
                        <i className="fa fa-user form_icons"></i>
                    </div>
                    <div className = "inputbox">
                        <input type="password" placeholder="Password" 
                        value={password} id="pwd" onChange={(e) => setPassword(e.target.value)} required/>
                        <i className="fa fa-lock"></i>
                    </div>
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    <button type='submit'>Sign Up</button>
                    
                </form>
                {token && <p>Token: {token}</p>}
            </div>

        </>
    );

}
export default Signup