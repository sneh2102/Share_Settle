import React from 'react';
import { useState,useEffect } from 'react';
import './Group.css'
import { useGroup } from '../../Hooks/useGroup';
import { useUserAuth } from '../../Context/AuthContext';
import Navbar from '../../Components/Navbar/Navbar';
import { Link } from 'react-router-dom';

const Groups = () => {

  const [data,setData]=useState([]);
  const {fetchGroups}=useGroup();
  const user = JSON.parse(window.localStorage.getItem('user'));

  




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
      {data.map((groups, index) => (
        <Link to={`/groups/view/${groups._id}`}>
        <div className="card">
        <div className="members">
          image
          <p className="members__count"> members</p>
        </div>
        <p className="card__title">{groups.name}</p>
        <p className="card__count"> members</p>
      </div>
        </Link>
      ))}
    </div>
      </>
  );
};

export default Groups;
