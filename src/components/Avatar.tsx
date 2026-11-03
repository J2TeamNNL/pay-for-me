import { useState } from 'react'

export function Avatar({ image, emoji, size = 48 }: { image?: string; emoji: string; size?: number }) {
  const [broken, setBroken] = useState(false)
  const style = { width: size, height: size, fontSize: size * 0.6 }
  if (image && !broken) {
    return <img className="avatar" src={image} alt="" style={style} onError={() => setBroken(true)} />
  }
  return (
    <span className="avatar avatar-emoji" style={style}>
      {emoji}
    </span>
  )
}
