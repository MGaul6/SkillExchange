import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SkillMatch {
  id: number;
  name: string;
  matchPercentage: number;
  teachingSkill: string;
  teachingLevel: string;
  learningSkill: string;
  profileImage: string;
}

interface SkillCardProps {
  match: SkillMatch;
}

const SkillCard: React.FC<SkillCardProps> = ({ match }) => {
  return (
    <li className="py-4 flex">
      {/* Profile Image */}
      <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
        {match.profileImage ? (
          <img src={match.profileImage} alt={match.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-xl">{match.name.charAt(0)}</span>
        )}
      </div>
      
      {/* Content */}
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium text-gray-900">{match.name}</h3>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            {match.matchPercentage}% Match
          </Badge>
        </div>
        
        <div className="mt-1 text-sm text-gray-600 flex justify-between">
          <span><strong>Teaches:</strong> {match.teachingSkill} ({match.teachingLevel})</span>
          <span><strong>Wants to learn:</strong> {match.learningSkill}</span>
        </div>
        
        <div className="mt-3 flex justify-end space-x-3">
          <Button variant="outline" size="sm">
            View Profile
          </Button>
          <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
            Send Request
          </Button>
        </div>
      </div>
    </li>
  );
};

export default SkillCard;
