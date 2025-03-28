import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./components/footer.tsx";
import "./locales/i18n.ts";
import { MoodSelector } from "./pages/mood-selector";
import MovieReco from "./pages/movie-reco";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <Router>
        <Routes>
          <Route path="/" element={<MoodSelector />} />
          <Route path="/movie/recommendation" element={<MovieReco />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}
export default App;
