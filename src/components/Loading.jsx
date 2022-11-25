import React from 'react';
import { useNavigate } from 'react-router-dom';
import gif from "../assets/JO4d.gif"

const Loading = () => {

  const navigate = useNavigate()

  const changePage = () => {
    setTimeout(() => {
      navigate('/pokedex')
    }, 5000)
  }

  return (
    <div className='loading'>
      <img src={gif} alt=""/>
      {changePage()}
    </div>
  );
};

export default Loading;