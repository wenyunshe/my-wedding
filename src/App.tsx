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
            {
              label: 'Pre-wedding photos',
              target: '_blank',
              template: (item) => (
                <a
                  href={item.url}
                  target={item.target}
                  className='p-menuitem-link'
                  rel='noopener noreferrer'
                >
                  <span className='p-menuitem-text'>{item.label}</span>&nbsp;
                  <span className='pi pi-external-link' />
                </a>
              ),
              url: 'https://photos.app.goo.gl/eqndz8NFGqiiToTDA',
            },
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
