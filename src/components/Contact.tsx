import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, CheckCircle, AlertCircle, Send, MessageSquare } from 'lucide-react';
import { contactAPI } from '../utils/api.js';
import { useAnalytics } from '../hooks/useAnalytics.js';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const { trackContactForm } = useAnalytics();

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "lavindunadungamuwa@gmail.com",
      href: "mailto:lavindunadungamuwa@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+94769133291",
      href: "tel:+94769133291",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "10, Nadungamuwa, Rajawaka, Balangooda, Sri Lanka",
      href: "#",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/lavindu-nadungamuwa-007855263",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
      bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20"
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      href: "https://github.com/LavinduNadungamuwa",
      color: "hover:text-gray-900 dark:hover:text-gray-100",
      bgColor: "hover:bg-gray-50 dark:hover:bg-gray-700"
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      label: "Twitter",
      href: "https://twitter.com/johnsmith",
      color: "hover:text-blue-400 dark:hover:text-blue-300",
      bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await contactAPI.submit(formData);
      
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: response.message
        });
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        trackContactForm();
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string')
          ? (error as any).message
          : 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 gradient-bg-primary transition-all duration-500 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="w-full">
          <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-blue-500 animate-pulse" />
            <span className="text-sm font-semibold text-muted uppercase tracking-widest">
              Let's Connect
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Get In Touch
          </h2>
          <div className="section-divider mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              Let's Connect
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed font-medium">
              Looking for a software engineering intern or want to collaborate? I'd love to hear from you.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="group flex items-center gap-4 card-elevated p-4 hover:scale-105 transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white shadow-xl group-hover:shadow-2xl transition-shadow animate-glow`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted font-medium uppercase tracking-wider">{item.label}</p>
                    <a 
                      href={item.href}
                      className="text-gray-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 glass-card rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 ${link.color} ${link.bgColor} transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 focus-ring`}
                    aria-label={link.label}
                  >
                    <div className="w-5 h-5">{link.icon}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card-strong rounded-2xl shadow-2xl p-6">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              Send a Message
            </h3>
            
            {submitStatus && (
              <div className={`mb-4 p-3 rounded-lg flex items-center gap-3 ${
                submitStatus.type === 'success' 
                  ? 'glass-card bg-green-50/50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700' 
                  : 'glass-card bg-red-50/50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700'
              }`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm font-medium">{submitStatus.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass-card border border-gray-300 dark:border-gray-600 rounded-xl focus-ring transition-all duration-300 text-gray-900 dark:text-white font-medium"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass-card border border-gray-300 dark:border-gray-600 rounded-xl focus-ring transition-all duration-300 text-gray-900 dark:text-white font-medium"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 glass-card border border-gray-300 dark:border-gray-600 rounded-xl focus-ring transition-all duration-300 text-gray-900 dark:text-white font-medium"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 glass-card border border-gray-300 dark:border-gray-600 rounded-xl focus-ring transition-all duration-300 resize-none text-gray-900 dark:text-white font-medium"
                  placeholder="Tell me about your project or just say hello!"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="group w-full btn-primary disabled:from-blue-400 disabled:to-indigo-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 focus-ring"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin shadow-lg"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;