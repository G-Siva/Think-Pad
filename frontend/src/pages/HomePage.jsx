import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-950 via-rose-900 to-neutral-900 text-rose-50">
      <Navbar />

      {isRateLimited && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <RateLimitedUI />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <span className="text-rose-300 text-sm tracking-wide">
              Loading notes…
            </span>
          </div>
        )}

        {/* Empty State */}
        {!loading && notes.length === 0 && !isRateLimited && (
          <div className="flex justify-center py-20">
            <NotesNotFound />
          </div>
        )}

        {/* Notes Grid */}
        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {notes.map((note) => (
              <div
                key={note._id}
                className="rounded-2xl bg-neutral-950/70 backdrop-blur border border-rose-900/40 shadow-lg hover:shadow-rose-900/20 transition"
              >
                <NoteCard note={note} setNotes={setNotes} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
