import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Styles from "./search.module.css";
import Filter from "../Filter/Filter";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  // API Key
  const API_KEY = "7121b697575648978c2e5bf222438dcc";

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const url = `https://newsapi.org/v2/everything?q=${keyword}&from=${fromDate}&to=${toDate}&category=${category}&sources=${source}&apiKey=${API_KEY}`;
      const response = await axios.get(url);

      if (response.data.articles && response.data.articles.length > 0) {
        setLoading(false);
        setAllArticles(response.data.articles); // Storing all articles
        setFilteredArticles(response.data.articles); // Initially, no filters, showing all
      } else {
        setLoading(false);
        setError("No articles found.Modify your search.");
      }
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch articles. Please refresh and try again later.");
    }
  };

  return (
    <div>
      <div className={Styles.heading_wrap}>
        <div className={Styles.heading}>
          <img
            className={Styles.image}
            src="src\assets\NewsIcon.png"
            alt="icon"
          />
          <h1>News Scripta</h1>
          <p>Place to get your news feed...</p>
        </div>
      </div>
      <h1 className={Styles.search_heading}>Search Your Favourite News</h1>
      {/* Form to search*/}
      <form className={Styles.form} onSubmit={handleSearch}>
        {loading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className={Styles.form_wrap}>
            <div className={Styles.form_wrap_left}>
              <div>
                <div className={Styles.form_row}>
                  <p className={Styles.keyword_label}>Keyword:</p>
                  <input
                    type="text"
                    placeholder="Enter a Keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    required
                  />
                </div>
                <p className={Styles.example_text}>
                  Eg: Gadgets,Sports, Fruits etc...
                </p>
              </div>
              <div className={Styles.date_section}>
                <div className={Styles.form_row}>
                  <p>From Date:</p>
                  <input
                    type="date"
                    placeholder="From Date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className={Styles.form_row}>
                  <p>To Date:</p>{" "}
                  <input
                    type="date"
                    placeholder="To Date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
              <div className={Styles.categorynsource_section}>
                <div className={Styles.form_row}>
                  <p>Category:</p>
                  <input
                    type="text"
                    placeholder="Enter Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className={Styles.form_row}>
                  <p>Source:</p>
                  <input
                    type="text"
                    placeholder="Enter Source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={Styles.form_wrap_right}>
              <button type="submit">Search</button>

              <button className={Styles.reload_btn} onClick={handleRefresh}>
                Refresh
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Display the error message if exists */}
      {error && <p className={Styles.error_msg}>{error}</p>}

      {/* Filter component, only shown if articles are fetched */}
      {allArticles.length > 0 && (
        <Filter
          articles={allArticles}
          setFilteredArticles={setFilteredArticles}
        />
      )}

      {/* Displaying filtered articles */}
      <div className={Styles.filtered_data_section}>
        {filteredArticles.map((article) => (
          <div className={Styles.article_card} key={uuidv4()}>
            <div className={Styles.img_wrap}>
              <img
                className={Styles.article_image}
                src={article.urlToImage}
                alt={article.title}
              />
            </div>
            <h2 className={Styles.article_title}>{article.title}</h2>
            <p className={Styles.article_description}>{article.description}</p>
            <p>
              <strong>Source:</strong> {article.source.name}
            </p>
            <p>
              <strong>Author:</strong> {article.author}
            </p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
