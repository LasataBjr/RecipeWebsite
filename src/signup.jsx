import React, {useState} from 'react';
import './assets/css/signup.css'
import axios from 'axios'


function Signup(){
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[errorMessage, setErrorMessage] = useState('');
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
                        alert("Signup Successful");
                    }
                    else{
                        alert("Signup Successful");
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
        <h1>this is sign up</h1>
            <div id="signin-form">
                <form onSubmit={handlesignup}>
                    <input type="text" placeholder="Username" value={username} id="name" onChange={(e) => setUsername(e.target.value)} required/>
                    <input type="password" placeholder="Password" value={password} id="pwd" onChange={(e) => setPassword(e.target.value)} required/>
                    <button type='submit'>Sign Up</button>
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                </form>
                 
            </div>

        </>
    );

}
export default Signup