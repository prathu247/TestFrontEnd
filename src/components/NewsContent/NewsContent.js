import Container from '@mui/material/Container';
import React from "react";
import NewsCard from "../NewsCard/NewsCards";
import "./NewsContent.css";

const NewsContent = ({ newsArray, loadMore, setLoadMore, newsResults }) => {
  return (
    <Container maxWidth="md">
      <div className="content">

        {/* First this */}
        {newsArray.map((newsItem) => (
          <NewsCard newsItem={newsItem} key={newsItem.title} />
        ))}
      </div>
    </Container>
  );
};

export default NewsContent;