import React, { useState } from "react";
import ArticleCategory from "../components/ArticleCategory";
import Article from "../components/Article";
import { useNavigate } from "react-router-dom";
import "../pages/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    "Politics",
    "Economy",
    "Health",
    "People",
    "Soceity",
    "Culture",
  ]);
  const [articles, setArticles] = useState([
    {
      title: "U.N Voted in Favor of Cryptoban",
      description:
        "Discover the latest development at the United Nations where a vote was held in favor of implementing a ban on cryptocurrencies.",
      body: "In a surprising turn of events, the United Nations (U.N) recently conducted a vote regarding the future of cryptocurrencies. The outcome was a majority decision in favor of implementing a ban on cryptocurrencies, sending shockwaves throughout the global financial and technological communities. This article delves into the reasons behind this unprecedented move, the potential implications for the cryptocurrency market, and the reactions from various stakeholders. Explore the debates surrounding the U.N's decision and gain insights into the possible future of cryptocurrencies in a regulated world.",
      sourceUrls: [
        "https://en.wikipedia.org/wiki/United_Nations",
        "https://en.wikipedia.org/wiki/Cryptocurrency",
      ],
    },
    {
      title:
        "SpaceX's Mission to Mars: The Future of Interplanetary Exploration",
      description:
        "Learn about SpaceX's ambitious plans to send humans to Mars and the technological advancements driving the next phase of space exploration.",
      body: "SpaceX, founded by Elon Musk, is at the forefront of space exploration with its visionary mission to establish a human presence on Mars. This article delves into the groundbreaking technologies and innovations developed by SpaceX, including the Starship spacecraft and the Super Heavy rocket. Explore the challenges and opportunities associated with interplanetary travel and gain insights into the future of space exploration.",
      sourceUrls: [
        "https://en.wikipedia.org/wiki/SpaceX",
        "https://en.wikipedia.org/wiki/Mars",
        "https://en.wikipedia.org/wiki/Interplanetary_spaceflight",
      ],
    },
    {
      title:
        "The Future of Work: Adapting to Automation and Artificial Intelligence",
      description:
        "Discover how automation and AI technologies are reshaping industries and the implications for the future of employment and skills.",
      body: "As automation and artificial intelligence continue to advance, they are transforming the landscape of work across various industries. This article explores the potential impact of automation and AI on jobs, skills, and the workforce. Gain an understanding of the challenges and opportunities presented by these technologies and learn about strategies for adapting to the changing nature of work in the future.",
      sourceUrls: [
        "https://en.wikipedia.org/wiki/Automation",
        "https://en.wikipedia.org/wiki/Artificial_intelligence",
      ],
    },
    {
      title:
        "Blockchain and Cryptocurrency: Disrupting Traditional Financial Systems",
      description:
        "Uncover the potential of blockchain technology and cryptocurrencies to transform finance, banking, and the global economy.",
      body: "Blockchain technology and cryptocurrencies like Bitcoin have emerged as disruptive forces in the world of finance. This article provides an overview of blockchain technology, its decentralized nature, and its potential applications beyond cryptocurrencies. Explore how blockchain is revolutionizing financial systems, improving transparency, and enabling secure peer-to-peer transactions. Dive into the exciting world of cryptocurrencies and their impact on the global economy.",
      sourceUrls: [
        "https://en.wikipedia.org/wiki/Blockchain",
        "https://en.wikipedia.org/wiki/Cryptocurrency",
        "https://en.wikipedia.org/wiki/Financial_system",
      ],
    }
  ]);

  const onArticleClick = (article) => {
    navigate("/article", {state: {article: article}});
  };

  return (
    <div className="home">
      {articles.map((article, index) => {
        return (
          <Article
            key={index}
            article={article}
            onArticleClick={() => onArticleClick(article)}
          />
        );
      })}
    </div>
  );
};
export default Home;
