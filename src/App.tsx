import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";

const App = () => {
    return (
        <div>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
            </Routes>
            <footer 
              className="fixed bottom-0 bg-gray-800 w-screen text-center text-gray-500 text-sm p-4"
            >
              <p>Created by <a className="text-red-500" href="https://github.com/charityrymbai">Charity Rymbai</a></p>
            </footer>
        </div>
    );
}

export default App;