import { useState } from "react";
import { Button } from "@chakra-ui/react";
import "./WriteArticle.css";

const WriteArticle = () => {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [article, setArticle] = useState(undefined);

  const handleAddSource = () => {
    // Implement the logic for adding a source here
  };

  return (
    <div className="write-article">
      <div className="write-article-header">Write an article</div>
      <div className="write-article-body">
        <div className="write-article-title-label">Title</div>
        <input
          type="text"
          className="write-article-title-input"
          onChange={(event) => setArticleTitle(event.target.value)}
        />
        <div className="write-article-description-header">Description</div>
        <input
          type="text"
          className="write-article-description-input"
          onChange={(event) => setArticleDescription(event.target.value)}
        />
        <div className="write-article-body-header">Body</div>
        <textarea
          className="write-article-body-textarea"
          onChange={(event) => setArticleBody(event.target.value)}
          type="text"
        />
        <div className="write-article-tags-header">Sources</div>
        <button
          className="write-article-add-source-button"
          onClick={handleAddSource}
        >
          Add source
        </button>
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
