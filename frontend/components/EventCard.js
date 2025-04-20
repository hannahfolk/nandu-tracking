export default function EventCard({ event, isSelected, onToggle }) {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? "bg-blue-50 border-blue-300 shadow-inner"
          : "bg-white border-gray-200 hover:bg-gray-50"
      }`}
      onClick={() => onToggle(event.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onToggle(event.id);
        }
      }}
    >
      <div>
        <h3 className="font-medium">
          {event.chineseName} <span>({event.code})</span>
        </h3>
        <p className="text-sm text-gray-600">{event.englishName}</p>
      </div>
    </div>
  );
}
