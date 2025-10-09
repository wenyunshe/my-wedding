import { PrimeReactProvider } from 'primereact/api'
import { Menubar } from 'primereact/menubar'
import './assets/theme.css'
import { Outlet } from 'react-router'

function App() {
  return (
    <PrimeReactProvider>
      <div className='bg-[#f0E9E5] min-h-screen'>
        <Menubar
          model={[
            { label: 'Home', url: '/' },
            { label: 'RSVP', url: '/rsvp' },
            // { label: 'Our story', url: '/our-story' },
            // { label: 'Gallery', url: '/gallery' },
          ]}
        />
        <Outlet />
      </div>
    </PrimeReactProvider>
  )
}

export default App
