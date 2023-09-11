import React, { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Details from './components/details';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
