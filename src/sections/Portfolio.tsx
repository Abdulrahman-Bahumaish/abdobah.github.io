import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Eye } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      key: 'project1',
      image: '/images/portfolio-1.jpg',
      tags: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      key: 'project2',
      image: '/images/portfolio-2.jpg',
      tags: ['Next.js', 'Stripe', 'Tailwind'],
    },
    {
      key: 'project3',
      image: '/images/portfolio-3.jpg',
      tags: ['React', 'WebRTC', 'MongoDB'],
    },
    {
      key: 'project4',
      image: '/images/portfolio-4.jpg',
      tags: ['Vue.js', 'D3.js', 'Python'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectsRef.current.forEach((project) => {
        if (project) {
          // Image reveal animation
          gsap.fromTo(
            project.querySelector('.project-image'),
            { 
              scale: 1.2,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: project,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );

          // Content animation
          gsap.fromTo(
            project.querySelector('.project-content'),
            { 
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: project,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
              delay: 0.2,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Orbitron'] font-bold text-white mb-6">
            <span className="gradient-text">{t('portfolio.title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const isHovered = hoveredProject === index;

            return (
              <div
                key={project.key}
                ref={(el) => { projectsRef.current[index] = el; }}
                className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image */}
                <div className={`relative group ${isEven ? '' : 'lg:col-start-2'}`}>
                  <div className="relative overflow-hidden rounded-2xl">
                    {/* Main Image */}
                    <div className="project-image relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={t(`portfolio.projects.${project.key}.name`)}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          isHovered ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      
                      {/* Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent transition-opacity duration-300 ${
                        isHovered ? 'opacity-70' : 'opacity-50'
                      }`} />
                      
                      {/* RGB Split Effect on Hover */}
                      {isHovered && (
                        <>
                          <div 
                            className="absolute inset-0 mix-blend-screen opacity-30"
                            style={{
                              backgroundImage: `url(${project.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              transform: 'translate(-3px, 0)',
                              filter: 'url(#redChannel)'
                            }}
                          />
                          <div 
                            className="absolute inset-0 mix-blend-screen opacity-30"
                            style={{
                              backgroundImage: `url(${project.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              transform: 'translate(3px, 0)',
                              filter: 'url(#blueChannel)'
                            }}
                          />
                        </>
                      )}

                      {/* View Button */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="w-20 h-20 rounded-full bg-[#00d4ff] flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                          <Eye className="w-8 h-8 text-black" />
                        </div>
                      </div>
                    </div>

                    {/* Border Frame */}
                    <div className={`absolute inset-0 rounded-2xl border transition-colors duration-300 pointer-events-none ${
                      isHovered ? 'border-[#00d4ff]' : 'border-white/10'
                    }`} />
                    
                    {/* Corner Accents */}
                    <div className={`absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 transition-colors duration-300 ${
                      isHovered ? 'border-[#00d4ff]' : 'border-white/30'
                    }`} />
                    <div className={`absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 transition-colors duration-300 ${
                      isHovered ? 'border-[#00d4ff]' : 'border-white/30'
                    }`} />
                  </div>
                </div>

                {/* Content */}
                <div className={`project-content space-y-6 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                  {/* Category */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00d4ff]/30">
                    <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
                    <span className="text-sm text-[#00d4ff]">
                      {t(`portfolio.projects.${project.key}.category`)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-['Orbitron'] font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                    {t(`portfolio.projects.${project.key}.name`)}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {t(`portfolio.projects.${project.key}.description`)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-sm bg-white/5 text-gray-400 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-[#00d4ff] font-['Orbitron'] font-semibold group/link"
                  >
                    {t('portfolio.view_project')}
                    <ArrowUpRight className={`w-5 h-5 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 ${
                      isRTL ? 'rotate-90' : ''
                    }`} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SVG Filters for RGB Effect */}
      <svg className="hidden">
        <defs>
          <filter id="redChannel">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="blueChannel">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </section>
  );
};

export default Portfolio;
