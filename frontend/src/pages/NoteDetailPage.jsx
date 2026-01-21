import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-950 via-rose-900 to-neutral-900 text-rose-50">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-rose-300 hover:text-rose-200 transition"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Back to Notes</span>
            </Link>

            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-lg border border-rose-700 px-4 py-2 text-rose-300 hover:bg-rose-900 hover:text-rose-200 transition"
            >
              <Trash2Icon className="h-4 w-4" />
              Delete
            </button>
          </div>

          {/* Card */}
          <div className="rounded-2xl bg-neutral-950/70 backdrop-blur shadow-xl border border-rose-900/50">
            <div className="p-8 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-rose-400 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="w-full rounded-xl bg-neutral-900 border border-rose-900 px-4 py-3 text-lg font-semibold text-rose-50 placeholder-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-600"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-rose-400 mb-2">
                  Content
                </label>
                <textarea
                  placeholder="Write your thoughts here..."
                  className="w-full min-h-45 rounded-xl bg-neutral-900 border border-rose-900 px-4 py-3 text-rose-50 placeholder-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-600 resize-none"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-xl bg-rose-600 px-8 py-3 font-semibold text-white hover:bg-rose-500 active:scale-[0.98] transition disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoteDetailPage;
