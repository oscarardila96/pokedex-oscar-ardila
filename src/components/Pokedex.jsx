import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import nameSlice from '../store/slices/name.slice';
import PokemonCard from './PokemonCard';

const Pokedex = () => {

  const userName = useSelector(state => state.name)
  const [pokemons, setPokemons] = useState([])
  const navigate = useNavigate()
  const [pokemonName, setPokemonName] = useState('')
  const [types, setTypes] = useState([])

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1150&offset=0`)
      .then(res => setPokemons(res.data.results))
    axios.get(`https://pokeapi.co/api/v2/type/`)
      .then(res => setTypes(res.data.results))
  }, [])


  console.log(types);
  console.log(pokemons);

  const searchPokemon = (e) => {
    e.preventDefault()
    navigate(`/pokedex/${pokemonName.toLowerCase()}`)
  }

  const [page, setPage] = useState(1)
  const pokemonsPerPage = 16
  const lastIndex = page * pokemonsPerPage
  const firstIndex = lastIndex - pokemonsPerPage
  const pokemonsPagination = pokemons.slice(firstIndex, lastIndex)

  const numbers = [];

  let lastPage = Math.ceil(pokemons.length / pokemonsPerPage)
  let initialPage = page < 5 ? 1 : (page - 4)
  if (page < (lastPage - 5)) {
    if (page > 5) {
      lastPage = (page + 4)
    } else {
      lastPage = 9;
    }
  }

  for (let i = initialPage; i <= lastPage; i++) {
    numbers.push(i)
  }

  const active = (num) => {
    if (num == page)
      return "rgba(255, 0, 0, 0.703)"
  }
  const activeNum = (num) => {
    if (num == page)
      return "white"
  }

  const disableFButton = (p) => {
    if (p == 1) {
      return "start-button"
    } else {
      return "vaca "
    }
  }
  const enebleFButton = (p) => {
    if (p !== 1) {
      return "button"
    } else {
      return " vaca"
    }
  }
  const disableLButton = (p) => {
    if (p == lastPage) {
      return "final-button"
    } else {
      return "vaca "
    }
  }

  const filterType = (e) => {
    const url = e.target.value
    axios.get(url).then(res => setPokemons(res.data.pokemon))
  }


  return (
    <div className='pokedex'>
      <nav>
        <h1 style={{color: 'white', paddingTop: '1.5rem'}}>Welcome {userName}!</h1>
        <div className='pokedex-input'>
          <input
            type='text'
            placeholder='search pokemon'
            value={pokemonName}
            onChange={e => setPokemonName(e.target.value)}
          />
          <button onClick={searchPokemon}>Search</button>
          <select onChange={filterType}>
            <option value={types.url}>Types - </option>
            {types.map((type) => (
              <option
                value={type.url}
                key={type.name}
              >
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </nav>
      <div className='pokedex-grid'>
        {pokemonsPagination.map(pokemon => (
          <PokemonCard key={pokemon.url ? pokemon.url : pokemon.pokemon.url} url={pokemon.url ? pokemon.url : pokemon.pokemon.url} />
        ))}
      </div>
      <div className='next-prev-btn'>
          <button onClick={() => setPage(page - 1)}
            disabled={page === 1}
            id={disableFButton(page)}
            className={enebleFButton(page)}
            style={{ boxShadow: '1px 1px 5px 1px black' }}><i className="fa-solid fa-angles-left"></i></button>
          {
            numbers.map(number => (
              <button key={number} onClick={() => setPage(number)} style={{ boxShadow: '1px 1px 5px 1px black', background: active(number), color: activeNum(number) }}>{number}</button>
            ))
          }
          <button onClick={() => setPage(page + 1)}
            disabled={page === lastPage}
            id={disableLButton(page)}
            className="button"
            style={{ boxShadow: '1px 1px 5px 1px black' }}><i className="fa-solid fa-angles-right"></i></button>
        </div>
    </div>
  );
};

export default Pokedex;