import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import LandingPage from "../LandingPage/LandingPage";
import * as homeAPI from "../../utilities/home-api";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    // Update the document title using the browser API
    async function getData() {
      let data = await homeAPI.getHomeData();
      console.log("data from api", data);

      setSubmissions(data);
    }
    getData();
    console.log(submissions);
  }, [user]);

  return (
    <>
      <main className="App">
        {user ? (
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route
                path="/"
                element={
                  <LandingPage
                    user={user}
                    setUser={setUser}
                    submissions={submissions}
                    setSubmissions={setSubmissions}
                  />
                }
              />
            </Routes>
          </>
        ) : (
          <AuthPage setUser={setUser} />
        )}
      </main>
    </>
  );
}
