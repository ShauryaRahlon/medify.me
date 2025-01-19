import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    content: "This health tracking app has completely transformed my fitness journey. The real-time monitoring and AI insights are incredible!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    name: "Dr. Michael Chen",
    role: "Healthcare Professional",
    content: "As a healthcare provider, I'm impressed by the accuracy and comprehensive nature of the health monitoring features.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    name: "Emma Williams",
    role: "Wellness Coach",
    content: "The intuitive interface and detailed health insights make it easy for my clients to stay on track with their wellness goals.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/3.jpg"
  }
];

const Testimonials = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(384);
  const [isResetting, setIsResetting] = useState(false);

  // Create array with 5 sets of testimonials for smoother looping
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const updateCardWidth = () => {
      if (window.innerWidth < 640) {
        setCardWidth(window.innerWidth - 32);
      } else if (window.innerWidth < 1024) {
        setCardWidth((window.innerWidth - 64) / 2);
      } else {
        setCardWidth(384);
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  useEffect(() => {
    let animationFrameId: number | null = null;
    let lastTimestamp = 0;
    const speed = 0.1;

    const animate = (timestamp: number) => {
      if (!isHovered && scrollRef.current && !isResetting) {
        if (lastTimestamp) {
          const delta = timestamp - lastTimestamp;
          const newPosition = scrollPosition + speed * delta;
          
          // Get the width of one complete set of testimonials
          const singleSetWidth = (cardWidth + 32) * testimonials.length; // Including gap
          
          // When we reach the end of the third set (middle)
          if (newPosition >= singleSetWidth * 3) {
            // Reset to the position equivalent to the end of the first set
            setScrollPosition(singleSetWidth);
          } else {
            setScrollPosition(newPosition);
          }
        }
        lastTimestamp = timestamp;
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    // Start from the second set of testimonials
    if (scrollPosition === 0) {
      setScrollPosition((cardWidth + 32) * testimonials.length);
    }

    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered, scrollPosition, cardWidth, isResetting]);

  return (
    <div id="Feedbacks" className="py-12 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-500/10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500">
            What Our Users Say
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Join thousands of satisfied users who've transformed their health journey
          </p>
        </div>

        <div 
          ref={scrollRef}
          className="overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div 
            className="flex gap-8 transition-transform duration-100"
            style={{ 
              transform: `translateX(-${scrollPosition}px)`,
              width: 'fit-content'
            }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-gray-900/50 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10 
                          relative group hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
                style={{ width: cardWidth }}
              >
                <Quote className="absolute top-4 right-4 w-6 h-6 text-blue-500/20" />
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/50
                             shadow-lg group-hover:border-blue-400 transition-colors duration-200"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/api/placeholder/48/48";
                    }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{testimonial.content}</p>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;