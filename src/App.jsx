import "./App.css";
import Header from "./components/Header/Header";
import { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const Home = lazy(() => import("./components/Home/Home"));
const Teachers = lazy(() => import("./components/Teachers/Teachers"));
const Favorites = lazy(() => import("./components/Favorites/Favorites"));

function App() {
  const [isLogInOpen, setIsLogInOpen] = useState(false);

  const openLogIn = () => setIsLogInOpen(true);
  const closeLogIn = () => setIsLogInOpen(false);

  return (
    <Router>
      <Header
        openLogIn={openLogIn}
        closeLogIn={closeLogIn}
        isLogInOpen={isLogInOpen}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route element={<PrivateRoute onOpenLogin={openLogIn} />}>
            <Route path="/favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
