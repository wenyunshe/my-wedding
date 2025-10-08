import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import 'primeicons/primeicons.css'
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx'
import OurStoryPage from './pages/OurStoryPage.tsx'
import GalleryPage from './pages/GalleryPage.tsx'
import RsvpPage from './pages/RsvpPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/our-story' element={<OurStoryPage />} />
          <Route path='/gallery' element={<GalleryPage />} />
          <Route path='/rsvp' element={<RsvpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
