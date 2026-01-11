import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import StartPage from './pages/StartPage/StartPage';
import AddContactPage from './pages/AddContactPage/AddContactPage';
import CallPopupWindow from './pages/CallPopup/CallPopup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/add-contact" element={<AddContactPage />} />
        <Route path="/call-popup" element={<CallPopupWindow />} />
      </Routes>
    </Router>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);