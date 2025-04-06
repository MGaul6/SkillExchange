interface AvailabilityScheduleProps {
  availability: boolean[][];
  onChange: (timeslot: number, day: number, value: boolean) => void;
}

const AvailabilitySchedule: React.FC<AvailabilityScheduleProps> = ({ 
  availability, 
  onChange 
}) => {
  const timeslots = ['Morning', 'Afternoon', 'Evening'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <div className="grid grid-cols-8 gap-1 mb-2">
        <div className="col-span-1"></div>
        {days.map((day, index) => (
          <div key={day} className="text-xs font-medium text-center">{day}</div>
        ))}
      </div>

      {timeslots.map((timeslot, timeslotIndex) => (
        <div key={timeslot} className="grid grid-cols-8 gap-1 mb-1">
          <div className="text-xs font-medium">{timeslot}</div>
          {days.map((_, dayIndex) => (
            <div
              key={`${timeslotIndex}-${dayIndex}`}
              className={`
                border border-gray-300 rounded h-6 cursor-pointer 
                ${availability[timeslotIndex][dayIndex] ? 'bg-primary-100 border-primary-300' : 'bg-white hover:bg-primary-100'}
              `}
              onClick={() => onChange(
                timeslotIndex, 
                dayIndex, 
                !availability[timeslotIndex][dayIndex]
              )}
            ></div>
          ))}
        </div>
      ))}
      
      <p className="mt-2 text-xs text-gray-500">Click on time slots to select your availability</p>
    </div>
  );
};

export default AvailabilitySchedule;
