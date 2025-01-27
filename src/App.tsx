import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";

import Footer from "./components/Footer";

const App = () => {
    return (
        <div>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;