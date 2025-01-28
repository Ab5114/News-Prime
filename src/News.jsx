//News.jsx
import { useEffect, useState } from "react";
import Card from "./Card";
import Loading from "./Loading";
import { Link } from "react-router-dom";
 
export default function News() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  console.log(API_KEY);
  const pageSize = 20;
  const [newsData, setNewsData] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("general");
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getData = async () => {
    if (search) {
      try {
        setLoading(true);
        setHasError(false);
        const controller = new AbortController();
        const timeout = setTimeout(() => {
          controller.abort(); // Abort fetch after 10 seconds
        }, 5000);

        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`,
          { signal: controller.signal }
        );

        const data = await response.json();
        clearTimeout(timeout);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        setNewsData(data.articles);
        setTotalResults(data.totalResults);
        console.log(data);
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

          <div class="search-bar">
            <input type="text" id="searchInput" />
            <button
              onClick={() => setSearch(document.querySelector("input").value)}
            >
              Search
            </button>
          </div>
        </header>

        <div class="popular-searches">
          <span>Popular Searches</span>
          <Link
            class="p-searches"
            to="/technology"
            onClick={() => setSearch("Technology")}
          >
            Technology
          </Link>
          <Link
            class="p-searches"
            to="/health"
            onClick={() => setSearch("Health")}
          >
            Health
          </Link>
          <Link
            class="p-searches"
            to="/medical"
            onClick={() => setSearch("Medical")}
          >
            Medical
          </Link>
          <Link
            class="p-searches"
            to="/finance"
            onClick={() => setSearch("Finance")}
          >
            Finance
          </Link>
          <Link
            class="p-searches"
            to="/cricket"
            onClick={() => setSearch("Cricket")}
          >
            Cricket
          </Link>
          <Link
            class="p-searches"
            to="/entertainment"
            onClick={() => setSearch("Entertainment")}
          >
            Entertainment
          </Link>
          <Link
            class="p-searches"
            to="/business"
            onClick={() => setSearch("Business")}
          >
            Business
          </Link>
          <Link
            class="p-searches"
            to="/Sports"
            onClick={() => setSearch("Sports")}
          >
            Sports{" "}
          </Link>
          <Link
            class="p-searches"
            to="/Science"
            onClick={() => setSearch("Science")}
          >
            Science
          </Link>
          <Link
            class="p-searches"
            to="/Education"
            onClick={() => setSearch("Education")}
          >
            Science
          </Link>
          <Link
            class="p-searches"
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
      <div class=" navigate">
        <button className="prev" onClick={handlePrev} disabled={page === 1}>
          &larr; Previous{" "}
        </button>
        <button
          class="next"
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
