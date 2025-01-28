import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import News from "./News";

function App() {
 
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<News />} />
        <Route exact path="/world-news" element={<News />} />
        <Route exact path="/top-headlines" element={<News />} />
        <Route path="/technology" element={<News />} />

        <Route path="/health" element={<News />} />

        <Route path="/medical" element={<News />} />

        <Route path="/finance" element={<News />} />
        <Route path="/cricket" element={<News />} />
        <Route path="/entertainment" element={<News />} />
        <Route path="/business" element={<News />} />
        <Route path="/Sports" element={<News />} />
        <Route path="/Science" element={<News />} />
        <Route path="/Education" element={<News />} />
        <Route path="/Travel" element={<News />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
