import React, { useState } from 'react'
import { useLocation, useTheme } from './ThemeContext'
import { CiSearch } from "react-icons/ci"

const Newitem = (props) => {
  const { articles, category, loading } = props
  const [inputText, setInputText] = useState("")
  const { theme } = useTheme()
  const { location, updateLocation } = useLocation()
  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1, word.lenght)
  }
  const [countryName, setcountryName] = useState(location)
  let countries = [
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Austria', code: 'AT' },
    { name: 'Australia', code: 'AU' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Canada', code: 'CA' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'China', code: 'CN' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Germany', code: 'DE' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'Greece', code: 'GR' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Israel', code: 'IL' },
    { name: 'India', code: 'IN' },
    { name: 'Italy', code: 'IT' },
    { name: 'Japan', code: 'JP' },
    { name: 'South Korea', code: 'KR' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Norway', code: 'NO' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Romania', code: 'RO' },
    { name: 'Serbia', code: 'RS' },
    { name: 'Russia', code: 'RU' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Taiwan', code: 'TW' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United States', code: 'US' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'South Africa', code: 'ZA' }
  ]
  const handleInput = (e) => {
    for (let i = 0; i < countries.length; i++) {
      if (e.target.value.toLowerCase() === countries[i].name.toLowerCase() || e.target.value.toLowerCase() === countries[i].code.toLowerCase()) {
        setInputText(countries[i].code)
      }
    }
  }
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      updateLocation(inputText)
      for (let i = 0; i < countries.length; i++) {
        if (e.target.value.toLowerCase() === countries[i].name.toLowerCase() || e.target.value.toLowerCase() === countries[i].code.toLowerCase()) {
          setcountryName(countries[i].name)
          console.log(countryName);
        }
      }
    }
  }
  const handleClick = (e) => {
    updateLocation(inputText)
    for (let i = 0; i < countries.length; i++) {
      if (inputText.toLowerCase() === countries[i].code.toLowerCase()) {
        setcountryName(countries[i].name)
      }
    }
    console.log(inputText)
  }
  return (
    <div className={`pt-20 pb-6 ${theme === "light" ? "bg-white" : "bg-gradient-to-b from-gray-950 to-black"}`}>
      <div>
        <div className='my-3 flex justify-center items-center'>
          <input type="search" name="search" id="search" className=' border-[1px] transition-all text-black px-5 p-1 outline-none border-black rounded-l-3xl' onChange={handleInput} onKeyPress={onKeyPress} placeholder='Search Here' />
          <button className={`transition-all text-black rounded-r-3xl px-2 border-black border-[1px] border-l-0 ${theme === "light" ? "bg-white" : "bg-white"}`} onClick={handleClick}><CiSearch size={32} /></button>
        </div>
        <h1 className={`font-bold text-3xl text-center ${theme === "light" ? "text-black" : "text-white"} pb-7`}>{`Get News - Top ${countryName} ${capitalizeFirstLetter(category)} Headlines`}</h1>
        <div className='grid max-[599px]:grid-cols-1 min-[600px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-3'>
          {articles?.map((e, i) => {
            return <div key={i} className={`rounded-md shadow-md ${theme === "dark" ? "shadow-white shadow-lg" : "shadow-black shadow-lg"} overflow-hidden ${theme === "light" ? "bg-white" : "bg-gradient-to-b from-gray-950 to-black"}`}>
              <div className='absolute z-10 bg-red-500 rounded-tl-md px-2 flex justify-end'>
                <span className='text-white'>{e.source.name}</span>
              </div>
              <img src={e.urlToImage ? e.urlToImage : "https://www.reuters.com/resizer/bv163XLndq0LU7Tw-9B6JrZXK1A=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/ZN7LA3W5GJD6HNTGVQEYLU4ANQ.JPG"} className='rounded-t-md hover:scale-105 duration-300 transition-all ease-in-out' alt="" />
              <div className='text-white p-2'>
                <h1 className='text-2xl font-bold text text-yellow-400'>{e.title}</h1>
                <p className={`${theme === "dark" ? "text-white" : "text-black"}`}>{e.description ? e.description.slice(0, 80) + "..." : e.description}</p>
                <p className={`${theme === "light" ? "text-black" : "text-white"}`}><small>Published by {e.author ? e.author : "Unknown"} on {new Date(e.publishedAt).toGMTString()}</small></p>
                <small className={`${theme === "light" ? "text-black" : "text-white"} block`}>Watch/Read details of this news by clicking the Read More button</small>
                <button className={`p-2 hover:bg-gray-900 duration-300 ease-in-out mt-4 border border-white rounded-md ${theme === "light" ? "bg-gray-700" : ""}`}><a href={e.url} target='_blank' rel='noreferrer'>Read Detail News</a></button>
              </div>
            </div>
          })}
        </div>
        <div className='mt-5'>
          {!loading && articles.length === 0 && (
            <div className={`text-center py-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              <p>No articles found for this category in {countryName}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Newitem
