import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    { key: 'testimonial1', image: '/images/testimonial-1.jpg' },
    { key: 'testimonial2', image: '/images/testimonial-2.jpg' },
    { key: 'testimonial3', image: '/images/testimonial-3.jpg' },
    { key: 'testimonial4', image: '/images/testimonial-4.jpg' },
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-container',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00d4ff]/5 via-transparent to-[#00d4ff]/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00d4ff]/5 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Orbitron'] font-bold text-white mb-6">
            <span className="gradient-text">{t('testimonials.title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="testimonial-container relative">
          {/* Main Card */}
          <div className="relative glass rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-24 h-24 text-[#00d4ff]" />
            </div>

            {/* Content */}
            <div className="relative grid md:grid-cols-[200px_1fr] gap-8 items-center">
              {/* Avatar Section */}
              <div className="relative">
                <div className="relative w-40 h-40 mx-auto">
                  {/* Orbit Rings */}
                  <div className="absolute inset-0 rounded-full border border-[#00d4ff]/20 animate-spin" style={{ animationDuration: '10s' }} />
                  <div className="absolute inset-2 rounded-full border border-[#00d4ff]/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                  
                  {/* Avatar */}
                  <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-[#00d4ff]">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={t(`testimonials.items.${testimonials[activeIndex].key}.author`)}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-full bg-[#00d4ff]/20 blur-xl animate-pulse" />
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (!isAnimating) {
                          setIsAnimating(true);
                          setActiveIndex(index);
                          setTimeout(() => setIsAnimating(false), 500);
                        }
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? 'w-8 bg-[#00d4ff]'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center md:text-left">
                {/* Stars */}
                <div className={`flex gap-1 mb-6 ${isRTL ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#00d4ff] text-[#00d4ff]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 transition-all duration-500">
                  "{t(`testimonials.items.${testimonials[activeIndex].key}.text`)}"
                </blockquote>

                {/* Author */}
                <div className={isRTL ? 'md:text-right' : 'md:text-left'}>
                  <div className="text-lg font-['Orbitron'] font-semibold text-[#00d4ff]">
                    {t(`testimonials.items.${testimonials[activeIndex].key}.author`)}
                  </div>
                  <div className="text-gray-400">
                    {t(`testimonials.items.${testimonials[activeIndex].key}.role`)}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className={`absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all ${
                isRTL ? 'right-4' : 'left-4'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className={`absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all ${
                isRTL ? 'left-4' : 'right-4'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnail Previews */}
          <div className="flex justify-center gap-4 mt-8">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setActiveIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                  index === activeIndex
                    ? 'border-[#00d4ff] scale-110'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={testimonial.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
