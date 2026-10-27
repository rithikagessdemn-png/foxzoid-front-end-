import { useState, useRef } from 'react';
import { Send, MessageCircle, Phone, Mail, User, Gamepad2, Sparkles, MapPin } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    emailPhone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const particlesRef = useRef([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ name: '', emailPhone: '', message: '' });
        alert('Message sent successfully! We\'ll get back to you soon. 🎮');
      } else {
        alert(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error("Contact Form Error:", error);
      alert('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleWhatsAppClick = () => {
    const message = `Hello! I'd like to get in touch regarding: ${formData.message || 'general inquiry'}`;
    const whatsappUrl = `https://wa.me/917708356728?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  // Generate particles for gaming effect
  const renderParticles = () => {
    return Array.from({ length: 15 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          opacity: Math.random() * 0.7 + 0.3
        }}
      />
    ));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-8">
      {/* Gaming Header */}
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Gamepad2 className="w-12 h-12 text-cyan-400 animate-pulse" />
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse">
              CONTACT US
            </h1>
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <Gamepad2 className="w-12 h-12 text-purple-500 animate-pulse" />
          </div>
          <p className="text-xl text-gray-300 font-mono">Level up your conversation with us!</p>
        </div>
        
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm border-2 border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl shadow-cyan-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-8 bg-cyan-400 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold text-white font-mono">SEND MESSAGE</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500 to-transparent"></div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative flex items-center bg-gray-800/50 rounded-lg border border-gray-700 focus-within:border-cyan-400 transition-colors">
                    <User className="w-5 h-5 text-cyan-400 ml-4" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full bg-transparent px-4 py-4 text-white placeholder-gray-400 outline-none"
                      required
                    />
                  </div>
                </div>
                
                {/* Email/Phone Field */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative flex items-center bg-gray-800/50 rounded-lg border border-gray-700 focus-within:border-purple-400 transition-colors">
                    <Mail className="w-5 h-5 text-purple-400 ml-4" />
                    <input
                      type="text"
                      name="emailPhone"
                      value={formData.emailPhone}
                      onChange={handleChange}
                      placeholder="Email or Phone number"
                      className="w-full bg-transparent px-4 py-4 text-white placeholder-gray-400 outline-none"
                      required
                    />
                  </div>
                </div>
                
                {/* Message Field */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative bg-gray-800/50 rounded-lg border border-gray-700 focus-within:border-blue-400 transition-colors">
                    <MessageCircle className="w-5 h-5 text-blue-400 ml-4 mt-4" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here..."
                      rows="5"
                      className="w-full bg-transparent px-4 py-4 text-white placeholder-gray-400 outline-none resize-none"
                      required
                    />
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
            
            {/* Floating particles */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              {renderParticles()}
            </div>
          </div>
          
          {/* WhatsApp Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl p-6 md:p-8 h-full shadow-2xl shadow-green-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-8 bg-green-400 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold text-white font-mono">WHATSAPP DIRECT</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent"></div>
              </div>
              
              <div className="flex flex-col items-center justify-center h-[calc(100%-120px)]">
                {/* WhatsApp Icon */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30">
                    <MessageCircle className="w-20 h-20 text-white" />
                  </div>
                  
                  {/* Pulsing ring effect */}
                  <div className="absolute inset-0 border-4 border-green-400 rounded-full animate-ping opacity-20"></div>
                </div>
                
                {/* WhatsApp Button */}
                <button
                  onClick={handleWhatsAppClick}
                  className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.03] active:scale-95 w-full max-w-md"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold">Chat on WhatsApp</div>
                      <div className="text-sm font-normal opacity-90">Instant response guaranteed</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Animated dots */}
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex gap-1">
                    {[1, 2, 3].map((dot) => (
                      <div
                        key={dot}
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: `${dot * 0.1}s` }}
                      />
                    ))}
                  </div>
                </button>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-md">
                  <div className="text-center p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div className="text-green-400 font-bold">⚡ Instant</div>
                    <div className="text-sm text-gray-300">Quick Replies</div>
                  </div>
                  <div className="text-center p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div className="text-green-400 font-bold">🎯 Direct</div>
                    <div className="text-sm text-gray-300">One-on-One Chat</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Integration Section - Added below the main content */}
        <div className="w-full mt-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm border-2 border-orange-500/30 rounded-2xl p-6 md:p-8 shadow-2xl shadow-orange-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-8 bg-orange-400 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
                  <MapPin className="w-6 h-6" /> FIND OUR LOCATION
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Map Container */}
                <div className="md:col-span-3">
                  <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden border-2 border-cyan-500/30">
                    {/* Replace with your actual Google Maps embed code */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.366269801896!2d77.06526801508234!3d28.617291382425212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0522ddd39a51%3A0x2e6c8b7b9d6b3b6f!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1649687266783!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                      title="Google Maps Location"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-mono">
                      🎮 Game Zone
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;