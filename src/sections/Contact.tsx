import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-content',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    { icon: Mail, label: t('contact.info.email'), value: 'hello@nexgen.com' },
    { icon: Phone, label: t('contact.info.phone'), value: '+1 (555) 123-4567' },
    { icon: MapPin, label: t('contact.info.address'), value: t('contact.info.address_value') },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#00d4ff]/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Orbitron'] font-bold text-white mb-6">
            <span className="gradient-text">{t('contact.title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="contact-content grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="relative">
            <div className="glass-strong rounded-2xl p-8">
              {/* Form Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-['Orbitron'] font-bold text-white mb-2">
                  {t('contact.info.title')}
                </h3>
                <p className="text-gray-400">
                  {t('contact.info.description')}
                </p>
              </div>

              {/* Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'name' || formData.name
                        ? '-top-2 text-xs text-[#00d4ff] bg-[#0a0a0a] px-2'
                        : 'top-4 text-gray-500'
                    }`}
                  >
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-transparent border border-white/20 rounded-xl text-white focus:border-[#00d4ff] focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'email' || formData.email
                        ? '-top-2 text-xs text-[#00d4ff] bg-[#0a0a0a] px-2'
                        : 'top-4 text-gray-500'
                    }`}
                  >
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-transparent border border-white/20 rounded-xl text-white focus:border-[#00d4ff] focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'phone' || formData.phone
                        ? '-top-2 text-xs text-[#00d4ff] bg-[#0a0a0a] px-2'
                        : 'top-4 text-gray-500'
                    }`}
                  >
                    {t('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-transparent border border-white/20 rounded-xl text-white focus:border-[#00d4ff] focus:outline-none transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'message' || formData.message
                        ? '-top-2 text-xs text-[#00d4ff] bg-[#0a0a0a] px-2'
                        : 'top-4 text-gray-500'
                    }`}
                  >
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className="w-full px-4 py-4 bg-transparent border border-white/20 rounded-xl text-white focus:border-[#00d4ff] focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-4 rounded-xl font-['Orbitron'] font-semibold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitted
                      ? 'bg-green-500 text-white'
                      : 'bg-[#00d4ff] text-black hover:bg-[#00b8db]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('contact.form.sending')}
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      {t('contact.form.success')}
                    </>
                  ) : (
                    <>
                      <Send className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                      {t('contact.form.submit')}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#00d4ff]/30 rounded-tr-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#00d4ff]/30 rounded-bl-2xl" />
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="glass rounded-xl p-6 flex items-center gap-4 group hover:border-[#00d4ff]/50 transition-all border border-transparent"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center group-hover:bg-[#00d4ff]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#00d4ff]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                      <div className="text-white font-medium">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <div className="relative rounded-2xl overflow-hidden h-64 glass">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/10 to-[#0099cc]/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#00d4ff] mx-auto mb-4 animate-bounce" />
                  <p className="text-white font-['Orbitron']">Our Location</p>
                  <p className="text-gray-400 text-sm mt-2">{t('contact.info.address_value')}</p>
                </div>
              </div>
              {/* Grid Overlay */}
              <div className="absolute inset-0 grid-pattern opacity-30" />
            </div>

            {/* CTA */}
            <div className="glass rounded-xl p-6 text-center">
              <h4 className="text-xl font-['Orbitron'] font-bold text-white mb-2">
                {t('contact.cta')}
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Let's discuss your project and bring your ideas to life.
              </p>
              <div className="flex justify-center gap-4">
                <a href="mailto:hello@nexgen.com" className="w-10 h-10 rounded-full bg-[#00d4ff]/10 flex items-center justify-center hover:bg-[#00d4ff]/20 transition-colors">
                  <Mail className="w-5 h-5 text-[#00d4ff]" />
                </a>
                <a href="tel:+15551234567" className="w-10 h-10 rounded-full bg-[#00d4ff]/10 flex items-center justify-center hover:bg-[#00d4ff]/20 transition-colors">
                  <Phone className="w-5 h-5 text-[#00d4ff]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
