import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of the navigation behaviour

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of the deleted one
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group relative block rounded-2xl 
               bg-neutral-950/70 backdrop-blur 
               border border-rose-900/40 
               p-6 shadow-lg
               hover:-translate-y-1 hover:shadow-rose-900/30
               transition-all duration-200"
    >
      {/* Accent strip */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-rose-600" />

      <div className="space-y-3">
        {/* Title */}
        <h3 className="text-lg font-semibold text-rose-100 group-hover:text-rose-300 transition">
          {note.title}
        </h3>

        {/* Content */}
        <p className="text-sm text-rose-200/70 line-clamp-3">{note.content}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4">
          <span className="text-xs text-rose-400/70">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-2">
            <PenSquareIcon className="size-4 text-rose-400" />

            <button
              onClick={(e) => handleDelete(e, note._id)}
              className="rounded-md p-1 text-rose-400 hover:text-red-400 transition"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;
