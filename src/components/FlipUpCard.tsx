import * as React from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

type FlipCardProps = {
  coverSrc: string // 封面圖片
  insideSrc: string // 內頁圖片
  coverInsideSrc: string
  width?: number
  height?: number
}

export function FlipUpCard({
  coverSrc,
  insideSrc,
  coverInsideSrc,
  width = 360,
  height = 240,
}: FlipCardProps) {
  // 0 = 關，180 = 全翻開（封面翻到背面）
  const rotateX = useMotionValue(0)
  const [open, setOpen] = React.useState(false)

  const toggle = () => {
    const next = !open
    setOpen(next)
    animate(rotateX, next ? 180 : 0, {
      type: 'spring',
      stiffness: 180,
      damping: 22,
      mass: 0.9,
    })
  }

  return (
    <div
      style={{
        width,
        height,
        perspective: 1200,
        cursor: 'pointer',
      }}
      onClick={toggle}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 內頁：底下固定不動 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: 'translateZ(0px)',
          }}
        >
          <img
            src={insideSrc}
            alt='inside'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25))',
            }}
            draggable={false}
          />
        </div>

        {/* 封面：可翻起來的那片 */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 0%', // 從底邊往上翻
            rotateX,
            zIndex: 2,
          }}
        >
          {/* 封面正面 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <img
              src={coverSrc}
              alt='cover'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25))',
              }}
              draggable={false}
            />
          </div>

          {/* 封面背面（翻起來後看到的那面） */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'rotateX(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* 你可以放「內側封面圖」，或直接用 insideSrc */}
            <img
              src={coverInsideSrc}
              alt='inside-of-cover'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25))',
              }}
              draggable={false}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
