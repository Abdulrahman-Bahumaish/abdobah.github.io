import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Palette, 
  Code2, 
  Fingerprint, 
  TrendingUp, 
  Target,
  Atom,
  Server,
  Database,
  Cloud,
  Smartphone
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState(0);

  const services = [
    { key: 'web_design', icon: Palette },
    { key: 'development', icon: Code2 },
    { key: 'branding', icon: Fingerprint },
    { key: 'marketing', icon: TrendingUp },
    { key: 'strategy', icon: Target },
  ];

  const technologies = [
    { name: 'React', icon: Atom },
    { name: 'Node.js', icon: Server },
    { name: 'PostgreSQL', icon: Database },
    { name: 'AWS', icon: Cloud },
    { name: 'React Native', icon: Smartphone },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-item',
        { x: isRTL ? 100 : -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
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
  }, [isRTL]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00d4ff]/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Orbitron'] font-bold text-white mb-6">
            <span className="gradient-text">{t('services.title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Accordion */}
        <div className="flex flex-col lg:flex-row gap-4 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeService === index;

            return (
              <div
                key={service.key}
                className={`service-item relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${
                  isActive ? 'lg:flex-[3]' : 'lg:flex-1'
                }`}
                onClick={() => setActiveService(index)}
                onMouseEnter={() => setActiveService(index)}
              >
                <div className={`h-full min-h-[300px] lg:min-h-[400px] p-6 transition-all duration-500 ${
                  isActive 
                    ? 'bg-gradient-to-br from-[#00d4ff]/20 to-[#0099cc]/10' 
                    : 'glass hover:bg-white/5'
                }`}>
                  {/* Number */}
                  <div className="absolute top-4 right-4 text-6xl font-['Orbitron'] font-bold text-white/5">
                    0{index + 1}
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      isActive ? 'bg-[#00d4ff]' : 'bg-[#00d4ff]/10'
                    }`}>
                      <Icon className={`w-7 h-7 transition-colors ${
                        isActive ? 'text-black' : 'text-[#00d4ff]'
                      }`} />
                    </div>

                    {/* Title - Vertical when collapsed on desktop */}
                    <h3 className={`font-['Orbitron'] font-bold text-white mb-4 transition-all duration-500 ${
                      isActive 
                        ? 'text-2xl' 
                        : 'lg:text-lg lg:writing-mode-vertical lg:rotate-180'
                    }`}
                    style={{ writingMode: !isActive ? 'vertical-rl' : 'horizontal-tb' }}
                    >
                      {t(`services.items.${service.key}.title`)}
                    </h3>

                    {/* Description - Only visible when active */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      isActive ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 lg:max-h-0'
                    }`}>
                      <p className="text-gray-400 leading-relaxed mb-6">
                        {t(`services.items.${service.key}.description`)}
                      </p>
                      <a 
                        href="#contact" 
                        className="inline-flex items-center gap-2 text-[#00d4ff] hover:underline"
                      >
                        Learn More
                        <span className="text-lg">→</span>
                      </a>
                    </div>
                  </div>

                  {/* Border */}
                  <div className={`absolute inset-0 rounded-2xl border transition-colors duration-300 pointer-events-none ${
                    isActive ? 'border-[#00d4ff]' : 'border-white/10'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Technologies Section */}
        <div className="glass rounded-2xl p-8">
          <h3 className="text-2xl font-['Orbitron'] font-bold text-white text-center mb-8">
            {t('services.technologies')}
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <div 
                  key={tech.name}
                  className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="w-16 h-16 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center group-hover:bg-[#00d4ff]/20 group-hover:scale-110 transition-all">
                    <Icon className="w-8 h-8 text-[#00d4ff]" />
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a href="#contact" className="cyber-btn text-[#00d4ff]">
            {t('services.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
