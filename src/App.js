import React, { Route, Routes } from 'react-router-dom';
import Home from './components/home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
