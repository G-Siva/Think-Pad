import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-rose-900 to-neutral-900 text-rose-50">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-rose-300 hover:text-rose-200 transition mb-8"
          >
            <ArrowLeftIcon className="size-5" />
            <span className="text-sm font-medium">Back to Notes</span>
          </Link>

          {/* Card */}
          <div className="rounded-2xl bg-neutral-950/70 backdrop-blur shadow-xl border border-rose-900/50">
            <div className="p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-rose-200">
                Create New Note
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-rose-400 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Note title"
                    className="w-full rounded-xl bg-neutral-900 border border-rose-900 px-4 py-3 text-lg font-semibold text-rose-50 placeholder-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-600"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold text-rose-400 mb-2">
                    Content
                  </label>
                  <textarea
                    placeholder="Write your thoughts here..."
                    className="w-full min-h-[180px] rounded-xl bg-neutral-900 border border-rose-900 px-4 py-3 text-rose-50 placeholder-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-600 resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* Action */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-rose-600 px-8 py-3 font-semibold text-white hover:bg-rose-500 active:scale-[0.98] transition disabled:opacity-60"
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
