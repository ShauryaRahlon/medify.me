import React from 'react';
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
  return (
    <div className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-500/10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500">
            What Our Users Say
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Join thousands of satisfied users who've transformed their health journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-white/10 relative group 
                       hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
            >
              <Quote className="absolute top-4 right-4 w-6 h-6 text-blue-500/20" />
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/50
                           shadow-lg group-hover:border-blue-400 transition-colors duration-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/api/placeholder/48/48"; // Fallback image if the link fails
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
  );
};

export default Testimonials;