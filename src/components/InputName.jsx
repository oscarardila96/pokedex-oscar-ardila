import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeName } from '../store/slices/name.slice';
import pokedexLogo from '../assets/pokedex-logo.png';
import entrenador from '../assets/entrenador.png'
import pokeball from "../assets/pokebola.png"
import pokemonLogo2 from "../assets/png-clipart-pokemon-pokemon.png"


const InputName = () => {

  const [userName, setUserName] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const enterName = () => {
    dispatch(changeName(userName))
    navigate('/loading')
  }

  return (
    <div className='input-background'>
      <img src={pokedexLogo} className='input-logo' />
      <div className='input-content'>
        <h1>Hello trainer!</h1>
        <img src={entrenador} />
        <div className='input'>
          <form onSubmit={enterName} className='input'>
            <input
              type="text"
              placeholder='Enter your name'
              onChange={e => setUserName(e.target.value)}
              value={userName} />
            <button
              onClick={enterName}
              className='input-btn'>
              <img src={pokeball} />
            </button>
          </form>
        </div>
      </div>
      <div className='input-image'>
        <img src={pokemonLogo2} />
      </div>
    </div>
  );
};

export default InputName;