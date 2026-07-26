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
          Thanks for comming to our wedding!
        </motion.h4>
        <motion.div
          className='flex gap-2 md:flex-row flex-wrap md:items-center justify-center'
          {...fadeInProps}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href='/the-wedding' rel='noopener noreferrer' className='p-button'>
            回顧婚禮
          </a>
          <div className='flex gap-2 md:flex-row md:items-center'>
            <a
              href='https://lin.ee/tBAIooS'
              target='_blank'
              rel='noopener noreferrer'
              className='p-button p-button-outlined'
            >
              加入 LINE 好友
            </a>
          </div>
        </motion.div>

        <motion.div {...fadeInProps} transition={{ duration: 0.5, delay: 0.6 }}>
          <ul className='list-none list-inside'>
            <li>
              Host{' '}
              <a
                href='https://www.instagram.com/wedding_mk/'
                target='_blank'
                rel='noopener noreferrer'
                className='underline hover:text-gray-900'
              >
                @wedding_mk
              </a>
            </li>
            <li>
              Wedding photographer{' '}
              <a
                href='https://www.instagram.com/andykuophoto/'
                target='_blank'
                rel='noopener noreferrer'
                className='underline hover:text-gray-900'
              >
                @andykuophoto
              </a>
            </li>
            <li>
              Pre-wedding photographer{' '}
              <a
                href='https://www.instagram.com/dahaomoment/'
                target='_blank'
                rel='noopener noreferrer'
                className='underline hover:text-gray-900'
              >
                大好良晨攝影工作室
              </a>
            </li>
            <li>
              Wedding decoration{' '}
              <a
                href='https://www.instagram.com/asideflower/'
                target='_blank'
                rel='noopener noreferrer'
                className='underline hover:text-gray-900'
              >
                Aside Flower 花森禾室
              </a>
            </li>
            <li>
              Makeup{' '}
              <a
                href='https://www.instagram.com/bonnietsai1390makeup/'
                target='_blank'
                rel='noopener noreferrer'
                className='underline hover:text-gray-900'
              >
                蔡邦妮 Bonnie Tsai
              </a>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage
