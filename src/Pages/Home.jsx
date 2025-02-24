import React from 'react'
import Hero from '../components/trendingmovies/Hero'
import NowPlaying from '../components/nowplaying/NowPlaying'
import TopRated from '../components/toprated/TopRated'
import Trends from '../components/trends/Trends'
import TvSeriesTopRated from '../components/TvSeriesTopRated/TvSeriesTopRated'
import AiringToday from '../components/Airingtoday/AiringToday'
import OnTheAir from '../components/Ontheair/OnTheAir'
const Home = () => {
  return (
    <>
    <Hero />
    <NowPlaying />
    <TopRated />
    <Trends />
    <TvSeriesTopRated />
    <AiringToday />
    <OnTheAir />
    </>
  )
}

export default Home