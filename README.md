# 📝 ThinkPad – Notes Application

ThinkPad is a full-stack notes application that allows users to create, view, edit, and delete notes through a clean and modern interface. The project focuses on simplicity, usability, and real-world full-stack development practices.

---

## 🚀 Features

- ✍️ Create notes  
- 📖 View all notes  
- 📝 Edit existing notes  
- 🗑️ Delete notes  
- 🎨 Responsive and modern UI  
- ⚡ Fast REST API  
- 🛡️ Rate limiting for API protection  

---

## 🧰 Tech Stack

### Frontend
- React
- Tailwind CSS
- DaisyUI
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Rate Limiter Middleware

### Deployment
- Render (Backend)
- MongoDB Atlas (Database)

---

## 📂 Project Structure

ThinkPad/
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── lib/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── index.html
│
└── README.md

yaml
Copy code

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
.env files are ignored using .gitignore.

🛠️ Installation & Setup
Clone the repository
bash
Copy code
git clone https://github.com/G-Siva/Think-Pad.git
cd Think-Pad
Backend Setup
bash
Copy code
cd backend
npm install
npm run dev
Backend runs on:

arduino
Copy code
http://localhost:5001
Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
Frontend runs on:

arduino
Copy code
http://localhost:5173
🌐 API Endpoints
Method	Endpoint	Description
GET	/api/notes	Fetch all notes
GET	/api/notes/:id	Fetch note by ID
POST	/api/notes	Create a note
PUT	/api/notes/:id	Update a note
DELETE	/api/notes/:id	Delete a note

🎯 Purpose
This project was built to practice full-stack development, RESTful API design, MongoDB integration, modern UI development, and production-style deployment.

📌 Future Enhancements
User authentication (JWT)

Note categories and tags

Search and filtering

Light/Dark mode

Progressive Web App (PWA)

👤 Author
Siva Subramanian G
GitHub: https://github.com/G-Siva

📄 License
This project is licensed under the MIT License.
