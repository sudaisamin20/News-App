import React, { useEffect, useState, useRef } from 'react'
import Newsitem from './Newsitem'
import InfiniteScroll from 'react-infinite-scroll-component'
import loadingImage from "./loading.gif"
import { useLocation, useTheme } from './ThemeContext'
import Footer from './Footer'

const News = (props) => {
  const [data, setData] = useState({})
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const pageRef = useRef(1)
  const articlesPerPage = 20

  const { location } = useLocation()
  const { theme } = useTheme()
  const { category, progress } = props

  const fetchInitialData = async () => {
    try {
      progress(10)
      setLoading(true)
      const response = await fetch(`https://backend-for-news-app-production.up.railway.app/news/${location.toLowerCase()}/${category}/${pageRef.current}`)

      progress(40)
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }

      let parseData = await response.json()
      progress(80)

      console.log('Initial data:', parseData)

      setData(parseData)
      setArticles(parseData.articles || [])
      setTotalResults(parseData.totalResults || 0)
      pageRef.current = 1

      // Calculate if there are more pages
      const totalPages = Math.ceil((parseData.totalResults || 0) / articlesPerPage)
      setHasMore(totalPages > 1)

      setLoading(false)
      progress(100)
    } catch (error) {
      console.error('Error fetching initial data:', error)
      setLoading(false)
      progress(100)
    }
  }

  useEffect(() => {
    // Reset everything when location changes
    setArticles([])
    setTotalResults(0)
    setHasMore(true)
    pageRef.current = 1
    fetchInitialData()
    // eslint-disable-next-line
  }, [location, category]) // Added category to dependencies

  const hasMoreData = async () => {
    try {
      // Check if we already have all articles
      if (articles.length >= totalResults) {
        setHasMore(false)
        return
      }

      pageRef.current += 1
      let response = await fetch(`https://backend-for-news-app-production.up.railway.app/news/${location.toLowerCase()}/${category}/${pageRef.current}`)

      if (!response.ok) {
        console.error('Failed to fetch moreF data')
        setHasMore(false)
        return
      }

      let parseData = await response.json()

      console.log(`Page ${pageRef.current} data:`, parseData)

      // Check if we got new articles
      if (!parseData.articles || parseData.articles.length === 0) {
        setHasMore(false)
        return
      }

      // Filter out duplicate articles based on URL or title
      const existingUrls = new Set(articles.map(article => article.url))
      const newArticles = parseData.articles.filter(article =>
        article.url && !existingUrls.has(article.url)
      )

      if (newArticles.length === 0) {
        setHasMore(false)
        return
      }

      setArticles(prevArticles => {
        const updatedArticles = [...prevArticles, ...newArticles]

        if (updatedArticles.length >= totalResults || newArticles.length < articlesPerPage) {
          setHasMore(false)
        }

        return updatedArticles
      })

      // Update totalResults if it changed
      if (parseData.totalResults && parseData.totalResults !== totalResults) {
        setTotalResults(parseData.totalResults)
      }

    } catch (error) {
      console.error('Error fetching more data:', error)
      setHasMore(false)
    }
  }

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1, word?.length)
  }

  // Calculate pagination info for debugging
  // const currentPage = pageRef.current
  // const totalPages = Math.ceil(totalResults / articlesPerPage)

  // Set document title
  document.title = `${capitalizeFirstLetter(category)} - Get News`

  return (
    <>
      <InfiniteScroll
        dataLength={articles.length}
        next={hasMoreData}
        hasMore={hasMore && articles.length < totalResults}
        loader={
          !loading && (
            <div className={`flex justify-center py-4 ${theme === "light" ? "bg-white" : "bg-black"}`}>
              <img src={loadingImage} alt="Loading..." />
            </div>
          )
        }
      >
        <div>
          <Newsitem Data={data} articles={articles} category={category} loading={loading} />
        </div>
      </InfiniteScroll>

      {loading && (
        <div className={`flex justify-center py-4 ${theme === "light" ? "bg-white" : "bg-black"}`}>
          <img src={loadingImage} alt="Loading..." />
        </div>
      )}

      {!hasMore && articles.length > 0 && <Footer />}
    </>
  )
}

export default News