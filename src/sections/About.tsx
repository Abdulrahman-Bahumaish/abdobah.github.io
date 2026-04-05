import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Globe, Rocket } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useTranslation();
  useLanguage(); // Initialize language direction
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  const cards = [
    {
      key: 'innovation',
      icon: Lightbulb,
      image: '/images/about-1.jpg',
    },
    {
      key: 'global',
      icon: Globe,
      image: '/images/about-2.jpg',
    },
    {
      key: 'future',
      icon: Rocket,
      image: '/images/about-3.jpg',
    },
  ];

  const stats = [
    { key: 'projects', value: '150+' },
    { key: 'clients', value: '50+' },
    { key: 'experience', value: '8+' },
    { key: 'team', value: '25+' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards animation with 3D flip
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              rotateX: 90,
              opacity: 0,
              transformOrigin: 'center top',
            },
            {
              rotateX: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: index * 0.2,
            }
          );
        }
      });

      // Stats counter animation
      statsRef.current.forEach((stat) => {
        if (stat) {
          gsap.fromTo(
            stat,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: stat,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      // Parallax effect for columns
      const columns = sectionRef.current?.querySelectorAll('.parallax-col');
      columns?.forEach((col, index) => {
        const speed = index === 1 ? -50 : index === 2 ? 50 : 0;
        gsap.to(col, {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#00d4ff]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0099cc]/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Orbitron'] font-bold text-white mb-6">
            <span className="gradient-text">{t('about.title')}</span>
          </h2>
          <p className="text-xl text-[#00d4ff] font-['Orbitron'] mb-4">
            {t('about.subtitle')}
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.key}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`parallax-col group relative ${
                  index === 1 ? 'md:mt-12' : index === 2 ? 'md:mt-24' : ''
                }`}
                style={{ perspective: '1000px' }}
              >
                <div className="relative overflow-hidden rounded-2xl glass card-hover">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={card.image}
                      alt={t(`about.cards.${card.key}.title`)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                    
                    {/* Glitch overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-[#00d4ff]/10 mix-blend-overlay" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center group-hover:bg-[#00d4ff]/20 transition-colors">
                        <Icon className="w-6 h-6 text-[#00d4ff]" />
                      </div>
                      <h3 className="text-xl font-['Orbitron'] font-semibold text-white">
                        {t(`about.cards.${card.key}.title`)}
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      {t(`about.cards.${card.key}.description`)}
                    </p>
                  </div>

                  {/* Neon border on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#00d4ff]/50 transition-colors pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              ref={(el) => { statsRef.current[index] = el; }}
              className="glass rounded-xl p-6 text-center group hover:border-[#00d4ff]/50 transition-all duration-300 border border-transparent"
            >
              <div className="text-4xl md:text-5xl font-['Orbitron'] font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">
                {t(`about.stats.${stat.key}`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
