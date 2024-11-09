// src/App.jsx
import "./App.css";
import Header from "./components/Header/Header";
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


// Lazy load the components
const Home = lazy(() => import('./components/Home/Home'));
const Teachers = lazy(() => import('./components/Teachers/Teachers'));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;