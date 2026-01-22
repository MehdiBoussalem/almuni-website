import type { Speaker } from '../data/alumniData';

interface SpeakerCardProps {
  speaker: Speaker;
}

export default function SpeakerCard({ speaker }: SpeakerCardProps) {
  const imageHeightClass = speaker.imageHeight === 'tall' ? 'h-[260px]' : 'h-[200px]';
  const objectPositionClass = speaker.imagePosition === 'center' ? 'object-center' : 'object-top';

  return (
    <div className="bg-white rounded shadow-md w-full max-w-[300px] flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className={`w-full ${imageHeightClass} overflow-hidden`}>
        <img 
          src={speaker.image} 
          alt={speaker.name}
          className={`w-full h-full object-cover ${objectPositionClass}`}
        />
      </div>

      {/* Content */}
      <div className="p-6 text-center flex flex-col items-center justify-center flex-grow">
        <h3 className="font-title font-bold text-lg uppercase tracking-wider mb-4">
          {speaker.name}
        </h3>
        <p className="text-gray-600 text-[0.95rem] leading-relaxed mb-2">
          {speaker.role}
        </p>
        {speaker.company && (
          <p className="text-bordeau italic font-semibold text-sm uppercase mt-1">
            {speaker.company}
          </p>
        )}
      </div>
    </div>
  );
}
