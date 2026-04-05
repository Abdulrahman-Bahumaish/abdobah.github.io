import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, ExternalLink, Database, ShoppingCart, BarChart3, Users } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const Software = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const products = [
    {
      key: 'crm',
      icon: Users,
      color: '#00d4ff',
      gradient: 'from-[#00d4ff] to-[#0099cc]',
    },
    {
      key: 'erp',
      icon: Database,
      color: '#ff6b6b',
      gradient: 'from-[#ff6b6b] to-[#ee5a5a]',
    },
    {
      key: 'ecommerce',
      icon: ShoppingCart,
      color: '#4ecdc4',
      gradient: 'from-[#4ecdc4] to-[#3dbbb4]',
    },
    {
      key: 'analytics',
      icon: BarChart3,
      color: '#ffe66d',
      gradient: 'from-[#ffe66d] to-[#f7d794]',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              x: isRTL ? 100 : -100,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: index * 0.15,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section
      id="software"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00d4ff]/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00d4ff]/30 mb-6">
            <Database className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-sm text-gray-300">Software Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Orbitron'] font-bold text-white mb-6">
            <span className="gradient-text">{t('software.title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('software.subtitle')}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            const features = t(`software.products.${product.key}.features`, { returnObjects: true }) as string[];
            const isActive = activeCard === index;

            return (
              <div
                key={product.key}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative"
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`relative overflow-hidden rounded-2xl glass transition-all duration-500 ${
                  isActive ? 'scale-[1.02]' : ''
                }`}>
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300"
                          style={{ 
                            background: `linear-gradient(135deg, ${product.color}20, ${product.color}10)`,
                            boxShadow: isActive ? `0 0 30px ${product.color}40` : 'none'
                          }}
                        >
                          <Icon className="w-8 h-8" style={{ color: product.color }} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-['Orbitron'] font-bold text-white mb-1">
                            {t(`software.products.${product.key}.name`)}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ background: product.color }} />
                            <span className="text-sm text-gray-400">Enterprise Solution</span>
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {t(`software.products.${product.key}.description`)}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {features.map((feature, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                          style={{ 
                            background: `${product.color}15`,
                            color: product.color
                          }}
                        >
                          <Check className="w-3 h-3" />
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <button 
                      className="w-full py-3 rounded-xl font-['Orbitron'] font-semibold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                      style={{ 
                        background: `linear-gradient(135deg, ${product.color}20, ${product.color}10)`,
                        color: product.color,
                        border: `1px solid ${product.color}40`
                      }}
                    >
                      {t('software.cta')}
                      <ArrowRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${isRTL ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                    </button>
                  </div>

                  {/* Corner Decoration */}
                  <div 
                    className="absolute top-0 right-0 w-24 h-24 opacity-20"
                    style={{
                      background: `linear-gradient(135deg, ${product.color}40, transparent)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Looking for a custom software solution?
          </p>
          <a href="#contact" className="cyber-btn text-[#00d4ff] inline-flex items-center gap-2">
            Discuss Your Project
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Software;
