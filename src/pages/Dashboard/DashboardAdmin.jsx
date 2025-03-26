import { useEffect, useState } from "react";
import { NotebookPen, SwatchBook, User2, UsersRound } from "lucide-react";
import ModalAddTitle from "../../components/Modal/ModalAddTitle";
import CreateQuiz from "../Quiz/CreateQuiz";

const DashboardAdmin = () => {
  const [stats, setStats] = useState({
    users: 0,
    roles: 0,
    categories: 0,
    quizzes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [quizId, setQuizId] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, rolesRes, categoriesRes, quizzesRes] =
          await Promise.all([
            fetch(`${apiUrl}/users`),
            fetch(`${apiUrl}/roles`),
            fetch(`${apiUrl}/categories`),
            fetch(`${apiUrl}/quiz`),
          ]);

        const [usersData, rolesData, categoriesData, quizzesData] =
          await Promise.all([
            usersRes.json(),
            rolesRes.json(),
            categoriesRes.json(),
            quizzesRes.json(),
          ]);

        setStats({
          users: usersData.length,
          roles: rolesData.length,
          categories: categoriesData.length,
          quizzes: quizzesData.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleQuizCreated = (createdQuizId) => {
    setQuizId(createdQuizId);
  };

  return (
    <div>
      <div className="flex justify-end">
        <button className="bg-secondary px-4 p-3 text-sm text-Tertiary rounded-lg" onClick={openModal}>
          Create Quiz
        </button>
        {quizId && <CreateQuiz quizId={quizId}/>}
        <ModalAddTitle isOpen={isModalOpen} closeModal={closeModal} onQuizCreated={handleQuizCreated}/>
      </div>

      {loading ? (
        <p className="text-center text-secondary font-semibold mt-4">
          Loading...
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-between">
              <p className="text-lg text-secondary font-semibold">
                Total Users
              </p>
              <div className="bg-Tertiary bg-opacity-20 p-3 flex justify-center items-center rounded-md">
                <UsersRound className="text-Tertiary" />
              </div>
            </div>
            <p className="text-[35px] text-secondary font-semibold">
              {stats.users}
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-between">
              <p className="text-lg text-secondary font-semibold">
                Total Roles
              </p>
              <div className="bg-Tertiary bg-opacity-20 p-3 flex justify-center items-center rounded-md">
                <User2 className="text-Tertiary" />
              </div>
            </div>
            <p className="text-[35px] text-secondary font-semibold">
              {stats.roles}
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-between">
              <p className="text-lg text-secondary font-semibold">
                Total Category
              </p>
              <div className="bg-Tertiary bg-opacity-20 p-3 flex justify-center items-center rounded-md">
                <SwatchBook className="text-Tertiary" />
              </div>
            </div>
            <p className="text-[35px] text-secondary font-semibold">
              {stats.categories}
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-between">
              <p className="text-lg text-secondary font-semibold">Total Quiz</p>
              <div className="bg-Tertiary bg-opacity-20 p-3 flex justify-center items-center rounded-md">
                <NotebookPen className="text-Tertiary" />
              </div>
            </div>
            <p className="text-[35px] text-secondary font-semibold">
              {stats.quizzes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;
