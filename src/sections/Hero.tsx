import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles, Code2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Hero = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      frameCount++;
      if (frameCount % 2 !== 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${particle.alpha})`;
        ctx.fill();

        // Draw connections
        if (i % 3 === 0) {
          particles.slice(i + 1, i + 5).forEach((other) => {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 100)})`;
              ctx.stroke();
            }
          });
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Title animation - character by character
      if (titleRef.current) {
        const chars = titleRef.current.innerText.split('');
        titleRef.current.innerHTML = chars
          .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');

        tl.fromTo(
          titleRef.current.querySelectorAll('span'),
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.03 },
          0.2
        );
      }

      // Subtitle animation
      tl.fromTo(
        subtitleRef.current,
        { x: isRTL ? 50 : -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        0.6
      );

      // Description animation
      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.8
      );

      // CTA buttons animation
      tl.fromTo(
        ctaRef.current?.children || [],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
        1
      );

      // Image animation
      tl.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0, filter: 'blur(20px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5 },
        0
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isRTL]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      gsap.to(imageRef.current, {
        rotateY: xPercent * 5,
        rotateX: -yPercent * 5,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50 z-[1]" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff]/10 rounded-full blur-[100px] animate-pulse z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#0099cc]/10 rounded-full blur-[80px] animate-pulse z-[1]" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isRTL ? 'lg:order-2' : ''}`}>
            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00d4ff]/30">
                <Sparkles className="w-4 h-4 text-[#00d4ff]" />
                <span className="text-sm text-gray-300">{t('hero.badge_software')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00d4ff]/30">
                <Code2 className="w-4 h-4 text-[#00d4ff]" />
                <span className="text-sm text-gray-300">{t('hero.badge_web')}</span>
              </div>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-['Orbitron'] font-bold text-white leading-tight glitch"
              data-text={t('hero.title')}
            >
              {t('hero.title')}
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl text-[#00d4ff] font-['Orbitron']"
            >
              {t('hero.subtitle')}
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="text-lg text-gray-400 max-w-xl leading-relaxed"
            >
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <a
                href="#portfolio"
                className="group cyber-btn text-[#00d4ff] flex items-center gap-2"
              >
                {t('hero.cta_primary')}
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-white/20 text-white font-['Orbitron'] font-semibold text-sm tracking-wider uppercase hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all"
              >
                {t('hero.cta_secondary')}
              </a>
            </div>
          </div>

          {/* Right Content - 3D Image */}
          <div className={`relative ${isRTL ? 'lg:order-1' : ''}`} style={{ perspective: '1000px' }}>
            <div
              ref={imageRef}
              className="relative transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden neon-border">
                <img
                  src="/images/hero-image.jpg"
                  alt="Digital Experience"
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                
                {/* Animated Border */}
                <div className="absolute inset-0 border-2 border-[#00d4ff]/30 rounded-2xl" />
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00d4ff]" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00d4ff]" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00d4ff]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00d4ff]" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 glass rounded-xl flex items-center justify-center float" style={{ animationDelay: '0s' }}>
                <div className="text-center">
                  <div className="text-2xl font-['Orbitron'] font-bold text-[#00d4ff]">150+</div>
                  <div className="text-xs text-gray-400">{t('about.stats.projects')}</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 w-28 h-28 glass rounded-xl flex items-center justify-center float" style={{ animationDelay: '1s' }}>
                <div className="text-center">
                  <div className="text-2xl font-['Orbitron'] font-bold text-[#00d4ff]">50+</div>
                  <div className="text-xs text-gray-400">{t('about.stats.clients')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[2]" />
    </section>
  );
};

export default Hero;
