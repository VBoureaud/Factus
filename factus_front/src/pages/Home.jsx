import React, { useState } from 'react'
import ArticleCategory from '../components/ArticleCategory'
import HeadlineArticle from '../components/HeadlineArticle'
import "../pages/Home.css"

const Home = () => {
    const [categories, setCategories] = useState(["Politics", "Economy", "Health", "People", "Soceity", "Culture"])
    const [articles, setArticles] = useState([
        {
            title: "U.N votefavor of crypto bsdjiashjdioashdiosahdioasd dhisao dhisa hdosiahdiodhsaid haiosdh saiod haios dan", 
            image_url: "https://image.cnbcfm.com/api/v1/image/107230869-1682446793111-FLAT_CryptoQuiz_V1_1.png"
        },
        {
            title: "U.N votefavor of crypto bsdjiashjdioashdiosahdioasd dhisao dhisa hdosiahdiodhsaid haiosdh saiod haios dan", 
            image_url: "https://image.cnbcfm.com/api/v1/image/107230869-1682446793111-FLAT_CryptoQuiz_V1_1.png"
        }
        ]
        )
    return (
        <div className="home">
        <div className="categoriesContainer">
        {categories.map((category, index) => (
            <ArticleCategory key={index} category={category} />
        ))} 
        </div>
        <div className="top-container">
            {
                articles.map((article, index) => {
                    return <HeadlineArticle key={index} article={article} />
                })
            }
        </div>
    </div>
    )
}
export default Home