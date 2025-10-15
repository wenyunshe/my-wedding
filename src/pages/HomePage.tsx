import { motion } from 'motion/react'
import HeroImageUrl from '../assets/hero.png'
import HeroMobileImageUrl from '../assets/hero-mobile.png'

const fadeInProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const HomePage = () => {
  return (
    <div className='flex lg:gap-12 md:gap-8 gap-4 md:flex-row flex-col'>
      <div className='hidden md:block'>
        <img
          className='md:h-200 md:object-cover md:object-right w-full'
          src={HeroImageUrl}
          alt='Left Decor'
        />
      </div>
      <div className='display md:hidden'>
        <img
          className='md:h-200 md:object-cover md:object-right w-full'
          src={HeroMobileImageUrl}
          alt='Left Decor'
        />
      </div>
      <div className='flex py-8 px-4 justify-center md:items-start items-center flex-col md:gap-12 gap-8 md:text-left text-center'>
        <motion.h4
          className='text-2xl md:text-3xl'
          {...fadeInProps}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          You are invited to the wedding!
        </motion.h4>
        <motion.a
          href='/rsvp'
          rel='noopener noreferrer'
          className='p-button'
          {...fadeInProps}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          填寫 RSVP
        </motion.a>
        <motion.h3
          className='text-ms/8 md:text-xl/9'
          {...fadeInProps}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className='text-2xl/10 md:text-3xl/12'>
            2026/3/28&nbsp;&nbsp;&nbsp;12:30 PM<small>（午宴）</small>
          </span>
          <br />
          <span className='pi pi-at' />
          &nbsp;高雄日航酒店
        </motion.h3>
        <motion.a
          href={import.meta.env.VITE_CALENDER_EVENT_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='p-button p-button-outlined'
          {...fadeInProps}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          點我加入 Google 行事曆
        </motion.a>
        <motion.iframe
          className='lg:size-120 md:size-100 size-80 rounded-lg shadow-lg border-0'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.1765795558445!2d120.30279087564934!3d22.609880331602284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e030004dc9165%3A0xf1c8ab02b634069b!2z6auY6ZuE5pel6Iiq6YWS5bqXIEhvdGVsIE5pa2tvIEthb2hzaXVuZw!5e0!3m2!1szh-TW!2stw!4v1751132070968!5m2!1szh-TW!2stw'
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          {...fadeInProps}
          transition={{ duration: 0.5, delay: 0.6 }}
        ></motion.iframe>
      </div>
    </div>
  )
}

export default HomePage
