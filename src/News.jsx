//News.jsx
import { useEffect, useState } from "react";
import Card from "./Card";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import axios from "axios";

export default function News() {
  const pageSize = 20;
  const [newsData, setNewsData] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("general");
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5015/api/news"
    : "/api/news";

  const getData = async () => {
    if (search) {
      try {
        setLoading(true);
        setHasError(false);
        const controller = new AbortController();
        const timeout = setTimeout(() => {
          controller.abort(); // Abort fetch after 10 seconds
        }, 10000);

        const response = await axios.get(
          `${apiUrl}?search=${search}&pageSize=${pageSize}&page=${page}`,
          { signal: controller.signal }
        );


        clearTimeout(timeout);

        setNewsData(response.data.articles);
        setTotalResults(response.data.totalResults);
        console.log(response.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.error("Request timed out.");
        } else {
          console.error("Error fetching data:", error);
        }
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log("called getData()");
    getData();
  }, [page, search]);

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    setPage(page - 1);
  };

  return (
    <>
      <nav>
        <header>
          <h1>Trending News</h1>
          <ul>
            <li>
              <Link to="/" onClick={() => setSearch("Home")}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/world-news" onClick={() => setSearch("World News")}>
                World News
              </Link>
            </li>
            <li>
              <Link
                to="/top-headlines"
                onClick={() => setSearch("Top Headlines")}
              >
                Top Headlines
              </Link>
            </li>
          </ul>

          <div className="search-bar">
            <input type="text" id="searchInput" />
            <button
              onClick={() => setSearch(document.querySelector("input").value)}
            >
              Search
            </button>
          </div>
        </header>

        <div className="popular-searches">
          <span>Popular Searches</span>
          <Link
            className="p-searches"
            to="/technology"
            onClick={() => setSearch("Technology")}
          >
            Technology
          </Link>
          <Link
            className="p-searches"
            to="/health"
            onClick={() => setSearch("Health")}
          >
            Health
          </Link>
          <Link
            className="p-searches"
            to="/medical"
            onClick={() => setSearch("Medical")}
          >
            Medical
          </Link>
          <Link
            className="p-searches"
            to="/finance"
            onClick={() => setSearch("Finance")}
          >
            Finance
          </Link>
          <Link
            className="p-searches"
            to="/cricket"
            onClick={() => setSearch("Cricket")}
          >
            Cricket
          </Link>
          <Link
            className="p-searches"
            to="/entertainment"
            onClick={() => setSearch("Entertainment")}
          >
            Entertainment
          </Link>
          <Link
            className="p-searches"
            to="/business"
            onClick={() => setSearch("Business")}
          >
            Business
          </Link>
          <Link
            className="p-searches"
            to="/Sports"
            onClick={() => setSearch("Sports")}
          >
            Sports{" "}
          </Link>
          <Link
            className="p-searches"
            to="/Science"
            onClick={() => setSearch("Science")}
          >
            Science
          </Link>
          <Link
            className="p-searches"
            to="/Education"
            onClick={() => setSearch("Education")}
          >
            Science
          </Link>
          <Link
            className="p-searches"
            to="/Travel"
            onClick={() => setSearch("Travel")}
          >
            Travel
          </Link>
        </div>
      </nav>
      {loading && <Loading />}
      {!loading && hasError && (
        <div className="error" style={{ textAlign: "center" }}>
          <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>
            Oops! Something went wrong.
          </h2>
          {navigator.onLine ? (
            <p>Unable to fetch data. Please try again later.</p>
          ) : (
            <p>No internet connection. Please check your network and retry.</p>
          )}
        </div>
      )}
      {!loading && !hasError && <Card data={newsData} />}
      <div className=" navigate">
        <button className="prev" onClick={handlePrev} disabled={page === 1}>
          &larr; Previous{" "}
        </button>
        <button
          className="next"
          onClick={handleNext}
          disabled={
            newsData === null || page + 1 > Math.ceil(totalResults) / pageSize
          }
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
}
