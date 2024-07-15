import React from 'react';
import { useState,useEffect } from 'react';
import './Group.css'
import { useGroup } from '../../Hooks/useGroup';
import { useUserAuth } from '../../Context/AuthContext';
import Navbar from '../../Components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Groups = () => {

  const [data,setData]=useState([]);
  const {fetchGroups}=useGroup();
  const user = JSON.parse(window.localStorage.getItem('user'));
  const icons = ['fa-home', 'fa-user', 'fa-envelope', 'fa-star'];
  const iconBackgroundColors = ['#6691B9', '#BC8AC4', '#FFA07A', '#7CBF7C'];
  const location = useLocation();
  const {state} = location;
  console.log(state);

  function getRandomIcon() {
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  }

  function getRandomBackgroundColor() {
    const randomIndex = Math.floor(Math.random() * iconBackgroundColors.length);
    return iconBackgroundColors[randomIndex];
  }
  

  useEffect(() => {
    const fetchUserGroup = async () => {
      try {
        console.log(user.email);
        const groups = await fetchGroups(user.email);
        setData(groups);
      } catch (error) {
      }
    };
    fetchUserGroup();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="card-list">
      {data.map((group, index) => (
        <Link to={`/groups/view/${group._id}`} key={group._id}>
          <div className="card">
            <i className={`fa ${getRandomIcon()} custom-icon`} 
              style={{ backgroundColor: getRandomBackgroundColor() }}></i>
            <div className="card-body">
              <h5 className="card-title">{group.name}</h5>
              <p className='settlement-period'>{group.settlePeriod}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
      </>
  );
};

export default Groups;
