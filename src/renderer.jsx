import { createRoot } from 'react-dom/client';
import './index.css';
import StartPage from './pages/StartPage/StartPage';

const App = () => {
  return (
    <div className="app-wrapper">
      <StartPage />
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);