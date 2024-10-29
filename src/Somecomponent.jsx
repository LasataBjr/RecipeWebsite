import axios from 'axios';
import {useEffect, useState} from 'react';
import jwtDecode from 'jwt-decode'

function SomeComponent(){

    const [userId, setUserId] = useState(null);
    const token = localStorage.getItem('token')
    
    useEffect(() => {
        const fetchUserId = async () => {
            try{
                const response = await axios.get('http://localhost:5000/current_user', {header:{Authorization:`Bearer ${token}`,},});
                setUserId(response.data.user_id);
            }catch(error){
                console.error('error fetching user id:',error);
            }
        };
        if(token)
            fetchUserId();
    }, [token]);

    return <div>User ID: {userId}</div>;
}
export default SomeComponent