import "./App.css";
import { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm/AuthForm";
import BookingForm from "./components/BookingForm/BookingForm";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Teachers from "./components/Teachers/Teachers";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closeAuthModal();
        closeBookingModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div>
      <Header />
      <Home />
      <Teachers />
      <AuthForm></AuthForm>
      <div>
        <button onClick={openAuthModal}>Open Auth Form</button>
        <button onClick={openBookingModal}>Open Booking Form</button>
        {isAuthModalOpen && <AuthForm onClose={closeAuthModal} />}
        {isBookingModalOpen && <BookingForm onClose={closeBookingModal} />}
      </div>
    </div>
  );
}

export default App;
