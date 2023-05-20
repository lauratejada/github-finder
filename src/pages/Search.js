import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Search() {

    const [user, setUser] = useState('');
    const [userResult, setUserResult] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const input = event.target.user.value;
        if(input.trim().length > 2) {
            setUser(input.trim());
            event.target.user.value = '';      
        }  
        event.target.user.focus();
    };

    useEffect(() => {
        const getData = async () => {
            try{
                const { data } = await axios.get(`https://api.github.com/users/${user}`);
                console.log(data);
                setUserResult(data);
                // send to new profile page
                navigate(`/github-finder/user/${user}`);

            } catch (error) {
                setMessage("Profile not found");
                console.error("Error:", error);
                setUserResult('');
            }
        } 
        
        if (user) { getData();  }
    }, [user, userResult]);

    const userProfile = <p>{userResult}</p>;
    const errorMessage = <p>{message}</p>;

    return(
        <section className="center">
            <h1>GitHub Finder</h1>
            <div className="search">
               <form onSubmit={handleSubmit}> 
                    <input type="text" placeholder="Profile" name="user" />
                    <input type="submit" value="Search" />
                </form>
                 { userResult ? userProfile : errorMessage }
            </div>
        </section>
    )
}

export default Search;