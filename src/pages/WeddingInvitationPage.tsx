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

const WeddingInvitationPage = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const galleria = useRef<Galleria>(null)
  const trafficGuideImages = [
    {
      itemImageSrc: TrafficGuideImage1,
      alt: '交通指南 1',
      thumbnailAlt: '交通指南 1 縮圖',
      thumbnailImageSrc: TrafficGuideThumbnailImage1,
    },
    {
      itemImageSrc: TrafficGuideImage2,
      alt: '交通指南 2',
      thumbnailAlt: '交通指南 2 縮圖',
      thumbnailImageSrc: TrafficGuideThumbnailImage2,
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
      <h1 className='text-2xl sm:text-4xl font-bold mt-14 mb-18'>
        Wedding Invitation
      </h1>
      <div>
        <FlipUpCard
          coverSrc={InvitationCoverImage}
          insideSrc={InvitationContentImage}
          coverInsideSrc={InvitationCoverInsideImage}
        />
      </div>
      <small className='text-sm mt-12 text-center text-gray-500'>
        * 點擊卡片翻開 / 關起
      </small>
      <h3 className='text-xl font-bold mt-12 mb-4'>交通資訊</h3>
      <div>
        <div className='card flex justify-content-center'>
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
        </div>
      </div>
    </div>
  )
}

export default WeddingInvitationPage
