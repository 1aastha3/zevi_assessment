import './App.css';
import { Route, Routes } from 'react-router-dom';
import Results from './pages/Results';
import Home from './pages/Home';
import { Typography } from '@mui/material';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/results' element = {<Results/>} />
      </Routes>
    </div>
  );
}

export default App;
