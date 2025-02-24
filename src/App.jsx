import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home'
import ViewMore from './components/nowplaying/ViewMore'
import {Routes, Route } from 'react-router-dom'
import ExploreAll from './components/toprated/ExploreAll'
import BrowseMore from './components/trends/BrowseMore'
import TopPicks from './components/TvSeriesTopRated/TopPicks'
import DiscoverMore from './components/Airingtoday/DiscoverMore'
import SeeAll from './components/Ontheair/SeeAll'
import AiringTodayDetails from './components/Airingtoday/AiringTodayDetails'
import NowPlayingDetails from './components/nowplaying/NowPlayingDetails'
// import MovieFooter from './components/MovieFooter/MovieFooter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/viewmore' element={<ViewMore />} />
        <Route path='/exploreall' element={<ExploreAll />} />
        <Route path='/browsemore' element={<BrowseMore />} />
        <Route path='/toppicks' element={<TopPicks />}/>
        <Route path='/movie/:id' element={<AiringTodayDetails />} />
        {/* <Route path='/movie/:id' element={<AiringTodayDetails />} /> */}
        <Route path='/movie/:id'element={<NowPlayingDetails />}/>
        <Route path='/discovermore' element={<DiscoverMore />}/>
        <Route path='/seeall' element={<SeeAll />}/>
      </Routes>
      {/* <MovieFooter /> */}
    </>
  )
}

export default App
