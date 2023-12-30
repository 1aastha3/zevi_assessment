import './App.css';
import { Route, Routes } from 'react-router-dom';
import Results from './pages/Results';
import Home from './pages/Home';
import { Typography } from '@mui/material';

function App() {
  return (
    <div>
      <img
        src='/logo.png'
        style={{
          position: 'fixed',
          width: '86px',
          height: '44.69px',
          top: '2.5rem',
          right: '7.875rem',
        }}
      />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/results' element = {<Results/>} />
      </Routes>


    </div>
  );
}

export default App;
