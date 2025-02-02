import { Routes, Route } from 'react-router-dom';
import { SearchPage, FavoritesPage, MoviePage } from './pages';
import './App.css';




function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="movies" element={<FavoritesPage />} />
      <Route path="posts/:id" element={<MoviePage />} />
    </Routes>
  )
}

export default App;
