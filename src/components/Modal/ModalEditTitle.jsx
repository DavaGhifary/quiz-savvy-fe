import { useRef, useState, useEffect } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import axios from "axios";
import { getSession } from "../../utils/session";
import { showToast } from "../ToastNotification";

const ModalEditTitle = ({ isOpen, closeModal, quizId, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState({
    gambar: "", // Tempatkan URL gambar atau file di sini
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Pratinjau gambar
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (initialData) {
      setQuiz({
        gambar: initialData.gambar || "", // Ambil URL gambar dari data awal
        title: initialData.title || "",
        description: initialData.description || "",
      });
      setPreviewImage(initialData.gambar || ""); // Gunakan gambar awal untuk pratinjau
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl); // Pratinjau gambar baru
      setQuiz((prevQuiz) => ({ ...prevQuiz, gambar: file })); // Simpan file gambar
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(""); // Hapus pratinjau gambar
    setQuiz((prevQuiz) => ({ ...prevQuiz, gambar: "" })); // Kosongkan gambar
  };

  const handleEditQuizTitle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const user = getSession("userDetails");
    if (!user) {
      setError("User session not found or has expired. Please login.");
      setLoading(false);
      return;
    }

    // Validate that the title is not empty
    if (!quiz.title.trim()) {
      setError("Title is required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    // Append updated fields only
    // if (quiz.title !== initialData.title) {
    formData.append("title", quiz.title); // Ensure title is included if changed
    // }

    // if (quiz.description !== initialData.description) {
    formData.append("description", quiz.description); // Add description if changed
    // }

    // Check if there is an image selected and ensure it's not a URL
    if (quiz.gambar && quiz.gambar instanceof File) {
      formData.append("gambar", quiz.gambar); // Add the image file if present
    }

    // formData.append("updatedBy", user.id);

    // Debugging: Log form data to check the fields before sending
    for (let [key, value] of formData.entries()) {
      console.log(key, value); // Log all the fields in the formData
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${apiUrl}/edit-title/${quizId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        showToast("success", "Quiz Title updated successfully!");
        closeModal();
      } else {
        setError(`Failed to update quiz. Status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        setError(
          `Failed to update quiz. Error: ${error.response.data.message}`
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
          <h2 className="text-xl font-semibold">Edit Quiz Title</h2>
          <button
            onClick={closeModal}
            className="text-xl text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleEditQuizTitle}>
          <div className="w-full border rounded-md flex flex-col mb-6">
            <div className="flex">
              <div className="relative m-2">
                <div className="absolute top-2 right-2 flex gap-3">
                  <div className="bg-white p-1 rounded-md cursor-pointer">
                    <label htmlFor="upload-edit-image">
                      <ImagePlus />
                    </label>
                    <input
                      type="file"
                      id="upload-edit-image"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div
                    className="bg-white p-1 rounded-md cursor-pointer"
                    onClick={handleRemoveImage}
                  >
                    <Trash2 />
                  </div>
                </div>
                <img
                  src={previewImage || initialData?.gambar || "/Group_13.png"}
                  className="w-[210px] h-[160px] object-cover rounded-md"
                  alt="Quiz Title"
                />
              </div>
              <div className="w-full p-2 flex flex-col gap-y-3">
                <input
                  type="text"
                  className="w-full h-[2rem] border px-2"
                  placeholder="Input Title"
                  value={quiz.title}
                  onChange={(e) =>
                    setQuiz((prevQuiz) => ({
                      ...prevQuiz,
                      title: e.target.value,
                    }))
                  }
                />
                <textarea
                  className="w-full h-[7rem] border p-2"
                  placeholder="Input Description"
                  value={quiz.description}
                  onChange={(e) =>
                    setQuiz((prevQuiz) => ({
                      ...prevQuiz,
                      description: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-sm p-2 m-2 rounded-md text-white"
              disabled={loading}
            >
              {loading ? "Loading..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditTitle;
