import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuestionQuiz from "./pages/Quiz/QuestioQuiz";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Category from "./pages/Dashboard/Category";
import Templates from "./pages/Dashboard/Templates";
import CreateQuiz from "./pages/Quiz/CreateQuiz";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import ToastNotification from "./components/ToastNotification";
import Quiztes from "./pages/Quiz/Quiztes";
import Result from "./pages/Quiz/Result";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Rute Home */}
          <Route path="/" element={<Home />} />

          {/* Rute yang membutuhkan login */}
          <Route
            path="/Quiz/:quizId"
            element={
              <ProtectedRoute>
                <QuestionQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Result/:quizId"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CreateQuiz/:quizId"
            element={
              <ProtectedRoute>
                <CreateQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Quiztes"
            element={
              <ProtectedRoute>
                <Quiztes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="Category"
              element={
                <ProtectedRoute>
                  <Category />
                </ProtectedRoute>
              }
            />
            <Route
              path="Templates"
              element={
                <ProtectedRoute>
                  <Templates />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Rute Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastNotification />
    </div>
  );
}

export default App;
