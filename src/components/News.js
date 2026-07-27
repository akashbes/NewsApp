import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export class News extends Component {
    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            pageSize: 9
        }
    }

    static defaultProps = {
        country: 'us',
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
        
    }

    async componentDidMount(){
        console.log("Fetching news data once...");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72d9cd74446d48cdbd93e8acee117736`;
        let data = await fetch(url);
        let parsedData = await data.json();
         console.log(parsedData);
        this.setState({ 
            articles: parsedData.articles || [] 
        });
    }

    handlePrevBtn = () => {
        this.setState(prevState => ({ page: prevState.page - 1 }));
    }

    handleNextBtn = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }));
    }

    render() {
        const { articles, page, pageSize } = this.state;

        // Calculate the slice bounds on every render based on current state
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const currentPageElements = articles.slice(startIndex, endIndex);

        const totalPages = Math.ceil(articles.length / pageSize);

        return (
            <div className='container my-3'>
                <h1>NewsApp -- Top Headlines</h1>
                <div className='row'>
                    {currentPageElements.map((element) => {
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
                        disabled={page <= 1} 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={this.handlePrevBtn}
                    >
                        &larr; Previous
                    </button>
                    <button 
                        disabled={page >= totalPages} 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={this.handleNextBtn}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        )
    }
}

export default News