import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import axios from "axios";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { UserContextProvider } from "../context/userContext";
import WikipediaPage from "./pages/WikipediaPage";

//axios.defaults.baseURL = "http://localhost:8000";
//axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wiki" element={<WikipediaPage title="Clown" />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
