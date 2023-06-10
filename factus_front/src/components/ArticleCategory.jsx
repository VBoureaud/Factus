import "./ArticleCategory.css"

const ArticleCategory = ({ category }) => {
    return (
        <div className="article-category">
            <h3>{category}</h3> 
        </div>
    )
}

export default ArticleCategory