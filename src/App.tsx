import { PrimeReactProvider } from 'primereact/api'
import { Menubar } from 'primereact/menubar'
import 'primereact/resources/themes/fluent-light/theme.css'
import { Outlet } from 'react-router'

function App() {
  return (
    <PrimeReactProvider>
      <Menubar
        model={[
          { label: 'Home', url: '/' },
          { label: 'Our story', url: '/our-story' },
          { label: 'Gallery', url: '/gallery' },
        ]}
      />
      <Outlet />
    </PrimeReactProvider>
  )
}

export default App
