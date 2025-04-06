import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'primary' | 'secondary' | 'accent';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description,
  color 
}) => {
  const bgColorClass = {
    primary: 'bg-primary-100 text-primary-500',
    secondary: 'bg-secondary-50 text-secondary-500',
    accent: 'bg-accent-50 text-accent-500'
  }[color];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className={cn(
        "w-12 h-12 inline-flex items-center justify-center rounded-full mb-4",
        bgColorClass
      )}>
        {icon}
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
