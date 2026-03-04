import { motion } from 'motion/react'
import InvitationContentImage from '../assets/invitation-content.png'
import InvitationCoverImage from '../assets/invitation-cover.png'
import InvitationCoverInsideImage from '../assets/invitation-cover-under.png'
import TrafficGuideImage1 from '../assets/traffic-guide-1.jpg'
import TrafficGuideImage2 from '../assets/traffic-guide-2.jpg'
import TrafficGuideThumbnailImage1 from '../assets/traffic-guide-1-thumbnail.jpg'
import TrafficGuideThumbnailImage2 from '../assets/traffic-guide-2-thumbnail.jpg'
import { FlipUpCard } from '../components/FlipUpCard'
import { useRef, useState } from 'react'
import { Galleria } from 'primereact/galleria'

const fadeInProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const WeddingInvitationPage = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const galleria = useRef<Galleria>(null)
  const trafficGuideImages = [
    {
      itemImageSrc: TrafficGuideImage2,
      alt: '交通指南 2',
      thumbnailAlt: '交通指南 2 縮圖',
      thumbnailImageSrc: TrafficGuideThumbnailImage2,
    },
    {
      itemImageSrc: TrafficGuideImage1,
      alt: '交通指南 1',
      thumbnailAlt: '交通指南 1 縮圖',
      thumbnailImageSrc: TrafficGuideThumbnailImage1,
    },
  ]

  const itemTemplate = (item: { itemImageSrc: string; alt: string }) => {
    return (
      <div
        style={{
          width: '100%',
          height: 'min(80dvh, 900px)', // 你可調：全螢幕也不會超過視窗
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={item.itemImageSrc}
          alt={item.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    )
  }

  const thumbnailTemplate = (item: {
    thumbnailImageSrc: string
    alt: string
  }) => {
    return (
      <img
        src={item.thumbnailImageSrc}
        alt={item.alt}
        style={{ display: 'block', width: '80%' }}
      />
    )
  }

  return (
    <div className='flex flex-col items-center h-screen p-12'>
      <motion.h1
        className='text-2xl sm:text-4xl font-bold mt-14 mb-18'
        {...fadeInProps}
        transition={{ duration: 0.5 }}
      >
        Wedding Invitation
      </motion.h1>
      <motion.div {...fadeInProps} transition={{ duration: 0.5, delay: 0.2 }}>
        <FlipUpCard
          coverSrc={InvitationCoverImage}
          insideSrc={InvitationContentImage}
          coverInsideSrc={InvitationCoverInsideImage}
        />
        <div className='flex justify-center'>
          <small className='text-sm mt-4 text-gray-500'>
            * 點擊卡片翻開 / 關起
          </small>
        </div>
      </motion.div>
      <motion.h3
        {...fadeInProps}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='text-xl font-bold mt-12 mb-4'
      >
        交通資訊
      </motion.h3>
      <div>
        <motion.div
          className='card flex justify-content-center'
          {...fadeInProps}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Galleria
            ref={galleria}
            value={trafficGuideImages}
            numVisible={2}
            style={{ maxWidth: '850px' }}
            activeIndex={activeIndex}
            onItemChange={(e) => setActiveIndex(e.index)}
            circular
            fullScreen
            showItemNavigators
            showThumbnails={false}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
          />
          <div className='flex gap-2' style={{ maxWidth: '800px' }}>
            {trafficGuideImages.map((image, index) => {
              const imgEl = (
                <img
                  src={image.thumbnailImageSrc}
                  alt={image.alt}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setActiveIndex(index)
                    if (galleria.current) {
                      galleria.current.show()
                    }
                  }}
                />
              )
              return (
                <div className='col-3' key={index}>
                  {imgEl}
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
      <div className='pb-20 px-4 flex flex-col items-center gap-8'>
        <motion.iframe
          className='lg:size-120 md:size-100 size-80 rounded-lg shadow-lg border-0 mt-8'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.1765795558445!2d120.30279087564934!3d22.609880331602284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e030004dc9165%3A0xf1c8ab02b634069b!2z6auY6ZuE5pel6Iiq6YWS5bqXIEhvdGVsIE5pa2tvIEthb2hzaXVuZw!5e0!3m2!1szh-TW!2stw!4v1751132070968!5m2!1szh-TW!2stw'
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          {...fadeInProps}
          transition={{ duration: 0.5, delay: 0.8 }}
        ></motion.iframe>
        <motion.ul
          className='text-left max-w-xl mx-auto gap-4 flex flex-col'
          {...fadeInProps}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <li>
            <div className='font-bold'>🚉 捷運</div>
            <div>三多商圈捷運站 2 號出口，步行約 5 分鐘</div>
          </li>
          <li>
            <div className='font-bold'>🚌 公車</div>
            <div>中山二路站-12、12延駛飛機路、9117、9117A、綠1</div>
          </li>
          <li>
            <div className='font-bold'>🚗 開車</div>
            <div>
              國道一號中山四路出口（高雄）下交流道 → 沿中山四路直行 →
              左轉進入林森四路
            </div>
          </li>
        </motion.ul>
      </div>
    </div>
  )
}

export default WeddingInvitationPage
