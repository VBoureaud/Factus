import "./Article.css"
import { Badge } from '@chakra-ui/react'

const Article = ({ article, onArticleClick }) => {
    return (
        <div className="headline-article" onClick={() => onArticleClick(article)}>
            <div className="article-title">{article.title.toUpperCase()}</div>
            <div className="article-description">{article.description}</div>
            <Badge colorScheme="green">250 contributions</Badge>
        </div>
    )
}

export default Article