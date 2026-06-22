# 🎬 Movifi

A modern movie discovery application built with **React**, **Vite**, **TMDB API**, and **Appwrite**. Search for your favorite movies, explore trending titles, and discover detailed information through a fast and responsive interface.

---

## ✨ Features

* 🔍 Search movies in real-time
* 📈 Trending Movies section
* ⚡ Debounced search for fewer API requests
* 🎥 Movie cards with posters, ratings, release dates, and language
* 📱 Responsive UI
* ☁️ Appwrite backend integration
* 🔄 Loading and error handling
* 🎨 Clean and modern interface

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend & APIs

* TMDB API
* Appwrite

### Libraries

* react-use

---

## 📂 Project Structure

```text
Movifi/
│
├── public/
├── src/
│   ├── Components/
│   │   ├── MovieCard.jsx
│   │   ├── Search.jsx
│   │   └── Spinner.jsx
│   │
│   ├── appwrite.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/darkcoder2003/Movifi.git
```

### 2. Navigate into the project

```bash
cd Movifi
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

```env
VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY

VITE_APPWRITE_PROJECT_ID=YOUR_PROJECT_ID
VITE_APPWRITE_DATABASE_ID=YOUR_DATABASE_ID
VITE_APPWRITE_COLLECTION_ID=YOUR_COLLECTION_ID
VITE_APPWRITE_ENDPOINT=YOUR_APPWRITE_ENDPOINT
```

### 5. Start the development server

```bash
npm run dev
```

## 📖 How It Works

* The application fetches movie data from the TMDB API.
* Users can search for movies instantly.
* Search requests are debounced to reduce unnecessary API calls.
* Frequently searched movies are stored in Appwrite.
* Trending movies are displayed based on search analytics.

---

## 👨‍💻 Author

**Vineet Singh**

GitHub: https://github.com/darkcoder2003
