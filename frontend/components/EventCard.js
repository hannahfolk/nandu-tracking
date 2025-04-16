export default function EventCard({ event, isSelected, onToggle }) {
  return (
    <div
      className={`p-4 border rounded-lg flex justify-between items-center ${
        isSelected ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
      }`}
    >
      <div>
        <h3 className="font-medium">{event.englishName}</h3>
        <p className="text-sm text-gray-600">{event.chineseName}</p>
      </div>
      <input
        onChange={() => onToggle(event.id, isSelected)}
        className={`px-3 py-1 rounded text-sm ${
          isSelected ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
        }`}
        type="checkbox"
      />
    </div>
  );
}
