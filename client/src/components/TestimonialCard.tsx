import { Star, StarHalf } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  rating: number;
  testimonial: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  name, 
  rating, 
  testimonial 
}) => {
  // Generate star icons based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-accent-500 text-accent-500" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-accent-500 text-accent-500" />);
    }
    
    return stars;
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {/* User avatar placeholder */}
        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
          <span className="text-xl">{name.charAt(0)}</span>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold">{name}</h4>
          <div className="flex text-accent-500">
            {renderStars()}
          </div>
        </div>
      </div>
      <p className="text-gray-600">{testimonial}</p>
    </div>
  );
};

export default TestimonialCard;
