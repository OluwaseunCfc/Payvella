import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const PROMOS = [
  {
    id: 'flash-data',
    label: 'FLASH OFFER',
    title: 'Fast Data, Better Prices',
    description: 'Get up to 10% instant discount on MTN & Airtel bundles today.',
    cta: 'Buy Now',
    to: '/data',
  },
  {
    id: 'referral',
    label: 'EARN MORE',
    title: 'Invite Friends, Earn Rewards',
    description: 'Get ₦500 for every friend who joins and funds their wallet.',
    cta: 'Refer Now',
    to: '/rewards',
  },
]

export default function PromoCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % PROMOS.length)
    }, 5000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const goToSlide = (index) => {
    clearInterval(intervalRef.current)
    setActiveSlide(index)
  }

  return (
    <section className="flex flex-col gap-2">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {PROMOS.map((promo) => (
            <div
              key={promo.id}
              className="w-full shrink-0 bg-tangerine-light rounded-xl p-5 flex flex-col gap-2"
            >
              <span className="text-label-sm text-brand-dark font-bold tracking-wider">{promo.label}</span>
              <h3 className="text-headline-sm text-text-primary">{promo.title}</h3>
              <p className="text-body-sm text-text-secondary">{promo.description}</p>
              <Link to={promo.to} className="text-label-lg text-brand font-semibold mt-1">
                {promo.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5">
        {PROMOS.map((promo, index) => (
          <button
            key={promo.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              activeSlide === index ? 'w-6 bg-brand' : 'w-2 bg-border'
            }`}
          />
        ))}
      </div>
    </section>
  )
}