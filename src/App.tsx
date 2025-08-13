import { PrimeReactProvider } from 'primereact/api'
// import { Menubar } from 'primereact/menubar'
import './assets/theme.css'
import { Outlet } from 'react-router'

function App() {
  return (
    <PrimeReactProvider>
      {/* <Menubar
        model={[
          { label: 'Home', url: '/' },
          { label: 'Our story', url: '/our-story' },
          { label: 'Gallery', url: '/gallery' },
        ]}
      /> */}
      <div className='bg-[#f0E9E5] min-h-screen'>
        <Outlet />
      </div>
    </PrimeReactProvider>
  )
}

export default App
