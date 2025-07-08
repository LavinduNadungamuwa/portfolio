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
    <section id="contact" className="py-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Let's Connect
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Let's Connect
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Looking for a software engineering intern or want to collaborate? I'd love to hear from you.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="group flex items-center gap-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                    <a 
                      href={item.href}
                      className="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 ${link.color} ${link.bgColor} transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                    aria-label={link.label}
                  >
                    <div className="w-5 h-5">{link.icon}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Send a Message
            </h3>
            
            {submitStatus && (
              <div className={`mb-4 p-3 rounded-lg flex items-center gap-3 ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700' 
                  : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700'
              }`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm">{submitStatus.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Tell me about your project or just say hello!"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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