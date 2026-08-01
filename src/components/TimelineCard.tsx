

interface TimelineCardProps {
  date: string;
  title: string;
  description: string;
}

export default function TimelineCard({
  date,
  title,
  description,
}: TimelineCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-pink-200 p-8 max-w-4xl mx-auto transition-all duration-300 hover:scale-[1.02]">
      <h2 className="text-5xl font-bold text-pink-600 mb-8">{date}</h2>

      <div className="bg-pink-50 rounded-2xl p-8">
        <h3 className="text-3xl font-bold text-pink-600 mb-4">{title}</h3>

        <p className="text-gray-700 text-xl">{description}</p>
      </div>
    </div>
  );
}
