import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RequestUser {
  name: string;
  skill: string;
  profileImage: string;
}

interface Request {
  id: number;
  type: 'incoming' | 'outgoing';
  user: RequestUser;
}

interface RequestCardProps {
  request: Request;
}

const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
  const isIncoming = request.type === 'incoming';
  
  return (
    <div className="bg-gray-50 p-3 rounded-md">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
            {request.user.profileImage ? (
              <img 
                src={request.user.profileImage} 
                alt={request.user.name} 
                className="h-full w-full object-cover" 
              />
            ) : (
              <span className="text-sm">{request.user.name.charAt(0)}</span>
            )}
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">{request.user.name}</h3>
            <p className="text-xs text-gray-500">
              {isIncoming 
                ? `Wants to learn ${request.user.skill} from you` 
                : `You requested ${request.user.skill} lessons`
              }
            </p>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className={isIncoming 
            ? "bg-blue-100 text-blue-800 border-blue-200" 
            : "bg-purple-100 text-purple-800 border-purple-200"
          }
        >
          {isIncoming ? 'Incoming' : 'Outgoing'}
        </Badge>
      </div>
      
      <div className="mt-2 flex justify-end space-x-2">
        {isIncoming ? (
          <>
            <Button variant="outline" size="sm">
              Decline
            </Button>
            <Button size="sm" className="bg-secondary-500 hover:bg-secondary-600">
              Accept
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm">
            Cancel Request
          </Button>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
