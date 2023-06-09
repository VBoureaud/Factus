import "./HeadlineArticle.css"

const HeadlineArticle = ({ article }) => {
    return (
        <div className="headline-article">
            <img src={article.image_url} alt={article.title} />
            <div className="headline-article-title">{article.title.toUpperCase()}</div>
        </div>
    )    
}

export default HeadlineArticle