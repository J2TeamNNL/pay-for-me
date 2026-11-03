import type { Rarity } from '../types'

const SOUNDS = {
  tick: '/sounds/csgo_ui_crate_item_scroll.wav',
  open: '/sounds/csgo_ui_crate_open.wav',
  common: '/sounds/item_reveal3_rare.wav',
  rare: '/sounds/item_reveal4_mythical.wav',
  epic: '/sounds/item_reveal5_legendary.wav',
  legendary: '/sounds/item_reveal6_ancient.wav',
} as const

type SoundKey = keyof typeof SOUNDS

let ctx: AudioContext | null = null
const buffers = new Map<SoundKey, Promise<AudioBuffer>>()

function audio() {
  ctx ??= new AudioContext()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function load(key: SoundKey) {
  let buf = buffers.get(key)
  if (!buf) {
    buf = fetch(SOUNDS[key])
      .then((r) => r.arrayBuffer())
      .then((data) => audio().decodeAudioData(data))
    buffers.set(key, buf)
  }
  return buf
}

async function play(key: SoundKey, volume = 0.6) {
  try {
    const a = audio()
    const source = a.createBufferSource()
    const gain = a.createGain()
    source.buffer = await load(key)
    gain.gain.value = volume
    source.connect(gain).connect(a.destination)
    source.start()
  } catch {
    // Audio is cosmetic; ignore decode/autoplay failures.
  }
}

export const preloadSounds = () => (Object.keys(SOUNDS) as SoundKey[]).forEach(load)
export const playTick = () => play('tick', 0.35)
export const playOpen = () => play('open')
export const playReveal = (rarity: Rarity) => play(rarity)
