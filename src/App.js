import './App.css';
import { Route, Routes } from 'react-router-dom';
import Results from './pages/Results';
import Home from './pages/Home';

function App() {
  return ( // Zevi's logo setup and routing
    <div>
      <img
        src='/logo.png'
        alt= 'logo'
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
