import './App.css';
import HomePage from './pages/HomePage';
import './App.css'
import QuestionPage from './pages/QuestionPage';
import ResultPage from './pages/ResultPage';
import { Routes, Route } from 'react-router-dom';
import { default as DataProvider } from './Context/data';
function App() {
  return (
    <DataProvider>
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
