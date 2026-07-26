import { motion } from 'motion/react'

const fadeInProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const TheWeddingPage = () => {
  return (
    <div className='flex flex-col items-center h-screen'>
      <motion.h1
        className='text-2xl sm:text-4xl font-bold mt-12 mb-8'
        {...fadeInProps}
        transition={{ duration: 0.5 }}
      >
        The Wedding
      </motion.h1>
      <motion.h2
        className='text-lg sm:text-2xl mb-4'
        {...fadeInProps}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        開場影片
      </motion.h2>
      <motion.div
        className='mb-8'
        {...fadeInProps}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a
          href='https://youtu.be/CfaqssslD6Q'
          target='_blank'
          rel='noopener noreferrer'
          className='p-button p-button-outlined p-button-lg'
        >
          Watch the video
        </a>
      </motion.div>
      <motion.hr
        className='w-1/2 border-t-1 border-gray-400 mb-8'
        {...fadeInProps}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.h2
        className='text-lg sm:text-2xl font-bold mb-4 sm:mb-12'
        {...fadeInProps}
        transition={{ duration: 0.5 }}
      >
        Wedding Photos
      </motion.h2>
      <motion.div
        className='flex flex-col items-center gap-4 sm:flex-row'
        {...fadeInProps}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a
          href='https://photos.app.goo.gl/k17W7L5zbmNCW7qJ6'
          target='_blank'
          rel='noopener noreferrer'
          className='p-button p-button-outlined p-button-lg'
        >
          文定儀式
        </a>
        <a
          href='https://photos.app.goo.gl/NdT6e3NckdCxstP29'
          target='_blank'
          rel='noopener noreferrer'
          className='p-button p-button-outlined p-button-lg'
        >
          招待 + 一進
        </a>
        <a
          href='https://photos.app.goo.gl/XSrMgcstuTmHheQA9'
          target='_blank'
          rel='noopener noreferrer'
          className='p-button p-button-outlined p-button-lg'
        >
          二進 + 敬酒
        </a>
        <a
          href='https://photos.app.goo.gl/EkYukeuLxP3o3wJs9'
          target='_blank'
          rel='noopener noreferrer'
          className='p-button p-button-outlined p-button-lg'
        >
          送客
        </a>
      </motion.div>
      <motion.p
        className='text-sm sm:text-base mt-4 mb-8 text-center text-gray-500'
        {...fadeInProps}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Photographer:{' '}
        <a
          href='https://www.instagram.com/andykuophoto/'
          target='_blank'
          rel='noopener noreferrer'
          className='underline hover:text-gray-900'
        >
          @andykuophoto <span className='pi pi-instagram' />
        </a>
      </motion.p>
    </div>
  )
}

export default TheWeddingPage
