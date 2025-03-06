import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuestionQuiz from "./pages/Quiz/QuestioQuiz";
import AdminLayout from "./layouts/AdminLayout";
import Templates from "./pages/Dashboard/Templates";
import CreateQuiz from "./pages/Quiz/CreateQuiz";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import ToastNotification from "./components/ToastNotification";
import Result from "./pages/Quiz/Result";
import MyQuizz from "./pages/Quiz/MyQuizz";
import RekapQuiz from "./pages/Quiz/RekapQuiz";
import EditQuiz from "./pages/Quiz/EditQuiz";
import UserManagement from "./pages/Dashboard/UserManagement";
import DashboardPage from "./components/AdminOrUser/DashboardPage";
import CategoryPage from "./components/AdminOrUser/CategoryPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Rute Home */}
          <Route path="/" element={<Home />} />
          <Route
            path="/EditQuiz/:quizId"
            element={
              <ProtectedRoute>
                <EditQuiz />
              </ProtectedRoute>
            }
          ></Route>

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
            path="/Result/:resultId"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route
            path="/RekapQuiz/:resultId"
            element={
              <ProtectedRoute>
                <RekapQuiz />
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
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route
              path="Category"
              element={
                <ProtectedRoute>
                  <CategoryPage />
                </ProtectedRoute>
              }
            />
            <Route 
            path="User-Management"
            element={
              <ProtectedRoute>
                <UserManagement />
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
            <Route
              path="MyQuiz"
              element={
                <ProtectedRoute>
                  <MyQuizz />
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
