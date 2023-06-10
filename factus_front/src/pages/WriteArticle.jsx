import { useState } from "react";
import { Button } from "@chakra-ui/react";
import "./WriteArticle.css";

const WriteArticle = () => {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [article, setArticle] = useState(undefined);

  return (
    <div className="write-article">
      <div className="write-article-header">Write an article</div>
      <div className="write-article-body">
        <div className="write-article-title-label">Title</div>
        <input
          type="text"
          className="write-article-title-input"
          onChange={() => setArticleTitle(event.target.value)}
        />
        <div className="write-article-description-header">Description</div>
        <input
          type="text"
          className="write-article-description-input"
          onChange={() => setArticleDescription(event.target.value)}
        />
        <div className="write-article-body-header">Body</div>
        <textarea
          className="write-article-body-textarea"
          onChange={() => setArticleBody(event.target.value)}
          type="text"
        />
      </div>
      <div className="write-article-submit">
        <Button
          isDisabled={
            articleTitle === "" ||
            articleDescription === "" ||
            articleBody === ""
          }
          onClick={() =>
            setArticle({
              title: articleTitle,
              description: articleDescription,
              body: articleBody,
            })
          }
          colorScheme="green"
          size="sm"
          className="article-submit-comment-button"
        >
          Submit article
        </Button>
      </div>
    </div>
  );
};

export default WriteArticle;
