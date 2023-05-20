import React, { useState , useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
//import { format } from 'date-fns';

function User(){
    const [profileData, setProfileData] = useState([]);
    const [repos, setRepos] = useState([]);
    const { userName } = useParams();
   // const navigate = useNavigate();
    
   useEffect(() => {
 //       console.log(userName);
        const getProfile = async () => {
            try{
                const {data: result } = await axios.get(`https://api.github.com/users/${userName}`);
                console.log(result);
               // console.log(result.name);
               // console.log(result.avatar_url);
                setProfileData(result);
               // profileData.push(result);
               // console.log(profileData);
               // profileData.forEach( (Element) => {console.log(Element);});
            } catch (error) {
                console.error("Error:", error.message);
            }
        }

        const getRepos = async () => {
            try{
                const {data: result } = await axios.get(` https://api.github.com/users/${userName}/repos
                `);
                console.log(result);
                setRepos(result);
                // console.log(profileData);
              } catch (error) {
                console.error("Error:", error.message);
            }
        }

       if(userName) { getProfile(); getRepos(); }
    },[userName]);

    const longEnCAFormat = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    //let aux='2023-05-20T07:43:27Z';
    //console.log(aux.slice(0,10));
    //console.log(longEnCAFormat.format(new Date(aux)));

    return(
        <section className="user">
            <div className="user-profile">
                <div className="user-image">
                    <img src={profileData.avatar_url} alt="user-avatar" />
                </div>
                <div className="user-name">
                    <h2>{profileData.name}</h2>
                </div>
                <div className="user-profile-data">
                    <div className="repositories">
                        <span>{profileData.public_repos}</span>
                        <p>repositories</p>
                    </div>
                    <div className="followers">
                        <span>{profileData.followers}</span>
                        <p>followers</p>
                    </div>
                    <div className="following">
                        <span>{profileData.following}</span>
                        <p>following</p>
                    </div>
                </div>
                <div className="goto-btn">
                    <button onClick={() => { window.location.href = `${profileData.html_url}`} } >Go to profile</button>
                </div>

            </div>
            <div className="user-repositories">
                <h3>My repositories</h3>
                <div className="repositories-list grid">
                    { repos.map(repo => (
                    <div className="repository-data">
                        <div className='repo-top'>
                            <div className='repo-title'><Link to={repo.html_url} target="_blank" >{repo.name}</Link></div>
                            <div className='repo-date'> Updated at {longEnCAFormat.format(new Date(repo.updated_at))}</div>
                        </div>
                        <div className='repo-bottom'>
                            <div className='repo-description'>{repo.description}</div>
                        </div>                   
                    </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default User;