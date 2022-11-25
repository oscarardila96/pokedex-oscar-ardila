import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import InputName from './components/InputName'
import Loading from './components/Loading'
import Pokedex from './components/Pokedex'
import PokedexDetail from './components/PokedexDetail'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<InputName />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/loading' element={<Loading />} />
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokedex/:id' element={<PokedexDetail />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
