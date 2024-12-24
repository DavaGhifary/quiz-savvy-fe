import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuestionQuiz from "./pages/Quiz/QuestioQuiz";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Category from "./pages/Dashboard/Category";
import Templates from "./pages/Dashboard/Templates";
import CreateQuiz from "./pages/Quiz/CreateQuiz";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Quiz" element={<QuestionQuiz />} />
        <Route path="/CreateQuiz" element={<CreateQuiz />} />
        <Route path="/Dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="Category" element={<Category />} />
          <Route path="Templates" element={<Templates />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
