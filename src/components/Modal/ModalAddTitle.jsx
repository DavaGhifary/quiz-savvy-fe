import { useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import axios from "axios";
import { getSession } from "../../utils/session";
import { useNavigate } from "react-router-dom"; 
import { showToast } from "../ToastNotification";

const ModalAddTitle = ({ isOpen, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([
    { image: "", title: "", description: "", isPrivate: false },
  ]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); 
  
  const handleImageChange = (e, questionId) => {
    const file = e.target.files[0];
    if (file) {
      const newQuestions = [...questions];
      const imageUrl = URL.createObjectURL(file);
      newQuestions[questionId].image = imageUrl; 
      setQuestions(newQuestions);
    }
  };

  
  const handleRemoveImage = (questionId) => {
    const newQuestions = [...questions];
    newQuestions[questionId].image = ""; 
    setQuestions(newQuestions);
  };

  const handleCreateQuizTitle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const user = getSession("userDetails");
    if (!user) {
      setError("User session not found or has expired. Please login.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", questions[0].title);
    formData.append("description", questions[0].description);
    formData.append("is_private", questions[0].isPrivate ? 1 : 0);

    const selectedImage = fileInputRef.current?.files[0];
    if (selectedImage) {
      formData.append("gambar", selectedImage);
    }

    formData.append("createdBy", user.id);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/quiz`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", response);
      if (response.status === 201) {
        const createdQuiz = response.data.quiz;
        console.log("Created Quiz:", createdQuiz);

        if (createdQuiz && createdQuiz.id) {
          const quizId = createdQuiz.id;
          localStorage.setItem("createdQuizzes", JSON.stringify([createdQuiz]));
          navigate(`/CreateQuiz/${quizId}`);
          closeModal();
          showToast("success", "Quiz Title created successfully!");
        } else {
          setError("Quiz ID is missing in the response.");
        }
      } else {
        setError(`Failed to create quiz. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      if (error.response) {
        setError(
          `Failed to create quiz. Error: ${error.response.data.message}`
        );
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 md:w-1/2 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Quiz Title</h2>
          <button
            onClick={closeModal}
            className="text-xl text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        {/* Menampilkan pesan sukses atau error */}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleCreateQuizTitle}>
          <div className="w-full flex flex-col">
            <div className="flex">
              {/* Gambar kuis */}
              <div className="relative m-2">
                <div className="absolute top-2 right-2 flex gap-3">
                  <div className="bg-white p-1 rounded-md cursor-pointer">
                    <label htmlFor="upload-title-image">
                      <ImagePlus />
                    </label>
                    <input
                      type="file"
                      id="upload-title-image"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, 0)}
                    />
                  </div>
                  {/* Tombol hapus gambar */}
                  <div
                    className="bg-white p-1 rounded-md cursor-pointer"
                    onClick={() => handleRemoveImage(0)}
                  >
                    <Trash2 />
                  </div>
                </div>
                <img
                  src={questions[0].image || "/Group_13.png"} // Default to Group 13.png
                  className="w-[210px] h-[160px]"
                  alt="Quiz Title"
                />
              </div>
              {/* Form input judul dan deskripsi */}
              <div className="w-full p-2 flex flex-col gap-y-3">
                <input
                  type="text"
                  className="w-full h-[2rem] border border-gray-200 focus:outline-primary rounded-md px-2"
                  placeholder="Input Title"
                  value={questions[0].title}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[0].title = e.target.value;
                    setQuestions(newQuestions);
                  }}
                />
                <textarea
                  className="w-full h-[7.3rem] border border-gray-200 focus:outline-primary rounded-md p-2"
                  placeholder="Input Description"
                  value={questions[0].description}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[0].description = e.target.value;
                    setQuestions(newQuestions);
                  }}
                ></textarea>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={questions[0].isPrivate}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[0].isPrivate = e.target.checked;
                      setQuestions(newQuestions);
                    }}
                  />
                  Private Quiz
                </label>
              </div>
            </div>
            {/* Tombol submit */}
            <button
              type="submit"
              className="bg-primary text-sm p-2 m-2 rounded-md text-white"
            >
              {loading ? "Loading..." : "Create Title"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddTitle;
