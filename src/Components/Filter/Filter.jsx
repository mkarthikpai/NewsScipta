import React, { useState, useEffect } from "react";
import Select from "react-select";
import Styles from "./filter.module.css";

const Filter = ({ articles, setFilteredArticles }) => {
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  // Collecting unique sources, categories, and authors from the fetched articles
  const uniqueSources = [
    ...new Set(articles.map((article) => article.source.name)),
  ];
  const uniqueCategories = [
    ...new Set(articles.map((article) => article.category)),
  ];
  const uniqueAuthors = [...new Set(articles.map((article) => article.author))];

  // Converting unique sources, categories, and authors into a format that react-select can use
  const sourceOptions = uniqueSources.map((source) => ({
    value: source,
    label: source,
  }));

  const categoryOptions = uniqueCategories.map((category) => ({
    value: category,
    label: category,
  }));

  const authorOptions = uniqueAuthors.map((author) => ({
    value: author,
    label: author,
  }));

  // Applying filters whenever the user selects source, category, or author
  useEffect(() => {
    let filtered = articles;

    if (selectedSource) {
      filtered = filtered.filter(
        (article) => article.source.name === selectedSource.value
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory.value
      );
    }
    if (selectedAuthor) {
      filtered = filtered.filter(
        (article) => article.author === selectedAuthor.value
      );
    }

    setFilteredArticles(filtered);
  }, [
    selectedSource,
    selectedCategory,
    selectedAuthor,
    articles,
    setFilteredArticles,
  ]);

  return (
    <div className={Styles.filter_section}>
      <h3 className={Styles.filter_heading}>Filter Articles</h3>
      <div className={Styles.filters_wrap}>
        <div className={Styles.filter}>
          <label>Source: </label>
          <Select
            options={sourceOptions}
            value={selectedSource}
            onChange={setSelectedSource}
            placeholder="All Sources"
            isClearable
            classNamePrefix="react-select"
            isDisabled={uniqueSources.length <= 1}
          />
        </div>

        <div className={Styles.filter}>
          <label>Author: </label>
          <Select
            options={authorOptions}
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            placeholder="All Authors"
            isClearable
            classNamePrefix="react-select"
            isDisabled={uniqueAuthors.length <= 1}
          />
        </div>

        <div className={Styles.filter}>
          <label>Category: </label>
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="All Categories"
            isClearable
            classNamePrefix="react-select"
            isDisabled={uniqueCategories.length <= 1}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
