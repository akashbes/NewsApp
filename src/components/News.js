import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

// Use ES6 default parameters instead of defaultProps
const News = ({ country = 'us', category = 'general' }) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const pageSize = 9

    const updateNews = async () => {
        setLoading(true)
        // Pass page and pageSize directly to the API for proper server-side pagination
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=72d9cd74446d48cdbd93e8acee117736&page=${page}&pageSize=${pageSize}`
        
        try {
            const response = await fetch(url)
            const parsedData = await response.json()
            
            // Check if the API request succeeded
            if (parsedData.status === "ok") {
                setArticles(parsedData.articles || [])
                setTotalResults(parsedData.totalResults || 0)
            } else {
                console.error("News API Error:", parsedData.message)
                setArticles([])
            }
        } catch (error) {
            console.error("Failed to fetch news:", error)
            setArticles([])
        } finally {
            setLoading(false)
        }
    }

    // Reset page to 1 when category or country changes
    useEffect(() => {
        setPage(1)
    }, [country, category])

    // Re-fetch news whenever country, category, or page changes
    useEffect(() => {
        updateNews()
    }, [country, category, page])

    const handlePrevBtn = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1))
    }

    const handleNextBtn = () => {
        setPage(prevPage => prevPage + 1)
    }

    const totalPages = Math.ceil(totalResults / pageSize)

    return (
        <div className='container my-3'>
            <h1 className="text-center my-4" style={{margin: '35px 0px', marginTop: '190px'}}>NewsApp -- Top Headlines</h1>
            
            {loading && <div className="text-center my-3"><h4>Loading headlines...</h4></div>}

            <div className='row'>
                {!loading && articles && articles.map((element) => {
                    return (
                        <div className="col-md-4 my-2" key={element.url}>
                            <NewsItem 
                                title={element.title ? element.title.slice(0, 45) : "No Title"} 
                                description={element.description ? element.description.slice(0, 88) : "No Description available"} 
                                imageUrl={element.urlToImage} 
                                newsUrl={element.url}
                                author={element.author}
                                date={element.publishedAt}
                            />
                        </div>
                    )
                })}
            </div>

            <div className="d-flex justify-content-between my-3">
                <button 
                    disabled={page <= 1 || loading} 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handlePrevBtn}
                >
                    &larr; Previous
                </button>
                <button 
                    disabled={page >= totalPages || loading} 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleNextBtn}
                >
                    Next &rarr;
                </button>
            </div>
        </div>
    )
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
}

export default News