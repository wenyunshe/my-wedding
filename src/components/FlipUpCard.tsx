import * as React from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

type FlipCardProps = {
  coverSrc: string // 封面圖片
  insideSrc: string // 內頁圖片
  coverInsideSrc: string
  maxWidth?: number
  ratio?: number
}

export function FlipUpCard({
  coverSrc,
  insideSrc,
  coverInsideSrc,
  maxWidth = 640,
  ratio = 240 / 360,
}: FlipCardProps) {
  // 0 = 關，180 = 全翻開（封面翻到背面）
  const rotateX = useMotionValue(0)
  const [open, setOpen] = React.useState(false)
  const [coverGuard, setCoverGuard] = React.useState(false)

  // ✅ 預載，避免某些裝置/情況 decode 造成一閃
  React.useEffect(() => {
    ;[coverSrc, insideSrc, coverInsideSrc].forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [coverSrc, insideSrc, coverInsideSrc])

  const toggle = async () => {
    const next = !open

    // 要打開：不用 guard
    if (next) {
      setOpen(true)
      await animate(rotateX, 179.9, {
        type: 'spring',
        stiffness: 180,
        damping: 22,
        mass: 0.9,
      }).finished
      return
    }

    // 要關起來：延後才顯示 guard
    setOpen(false)

    const controls = animate(rotateX, 0.1, {
      type: 'spring',
      stiffness: 180,
      damping: 22,
      mass: 0.9,
    })

    // ✅ 在最後一小段才蓋上封面，避免「太早出現」的怪感
    // 這裡用 setTimeout 是因為 spring 的 duration 不固定；抓一個保守值即可
    const guardTimer = window.setTimeout(() => {
      setCoverGuard(true)
    }, 120) // 你可以調 80~180，越小越晚出現

    await controls.finished

    window.clearTimeout(guardTimer)
    setCoverGuard(false)
  }

  return (
    <div
      style={{
        width: `min(${maxWidth}px, calc(100vw - 32px))`,
        aspectRatio: `${1 / ratio}`,
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
        {/* ✅ 靜態封面保護層：只在「蓋回去」動畫期間顯示，避免閃 */}
        {coverGuard && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 999,
              pointerEvents: 'none',
              transform: 'none',
            }}
          >
            <img
              src={coverSrc}
              alt='cover-guard'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25))',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translateZ(0.01px)',
              }}
              draggable={false}
            />
          </div>
        )}

        {/* 內頁：底下固定不動 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
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
              display: 'block',
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25))',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translateZ(0.01px)',
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
            transformOrigin: '50% 0%', // 從上邊翻（往上掀）
            rotateX,
            zIndex: 10,
            transform: 'translateZ(2px)',
            willChange: 'transform',
          }}
        >
          {/* 封面正面 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translateZ(1px)',
              pointerEvents: 'none',
            }}
          >
            <img
              src={coverSrc}
              alt='cover'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25))',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translateZ(0.01px)',
              }}
              draggable={false}
            />
          </div>

          {/* 封面背面（翻起來後看到的那面） */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'rotateX(180deg) translateZ(1px)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <img
              src={coverInsideSrc}
              alt='inside-of-cover'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25))',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translateZ(0.01px)',
              }}
              draggable={false}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
