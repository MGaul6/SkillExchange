import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface Session {
  id: number;
  title: string;
  type: 'teaching' | 'learning';
  dateTime: string;
}

interface SessionCardProps {
  session: Session;
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const isTeaching = session.type === 'teaching';
  
  return (
    <div className="bg-gray-50 p-3 rounded-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">{session.title}</h3>
        <Badge 
          variant="outline" 
          className={isTeaching 
            ? "bg-green-100 text-green-800 border-green-200" 
            : "bg-blue-100 text-blue-800 border-blue-200"
          }
        >
          {isTeaching ? 'Teaching' : 'Learning'}
        </Badge>
      </div>
      
      <div className="mt-2 flex items-center text-xs text-gray-500">
        <Calendar className="h-3 w-3 mr-1" />
        <span>{session.dateTime}</span>
      </div>
      
      <div className="mt-3 flex justify-between">
        <Button variant="outline" size="sm">
          Reschedule
        </Button>
        <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
          Join Meeting
        </Button>
      </div>
    </div>
  );
};

export default SessionCard;
