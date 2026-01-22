interface FranceAbroadStats {
  france: number;
  abroad: number;
  percentageFrance: string;
  percentageAbroad: string;
}

interface DistributionChartProps {
  stats?: {
    franceAbroad?: FranceAbroadStats;
  };
}

const DistributionChart = ({ stats }: DistributionChartProps) => {
  // --- 1. Préparation des données ---
  const percentFrance = Number(stats?.franceAbroad?.percentageFrance || 0);
  const percentAbroad = Number(stats?.franceAbroad?.percentageAbroad || 0);

  // --- 2. Configuration Géométrique ---
  const size = 200;
  const center = size / 2;
  const strokeWidth = 35; // anneau épais
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const gapSize = 5;

  // Longueurs visibles
  const franceStrokeLength = Math.max(0, (percentFrance / 100) * circumference - gapSize);
  const abroadStrokeLength = Math.max(0, (percentAbroad / 100) * circumference - gapSize);

  // Couleurs
  const colorFrance = "#7AC9F2";
  const colorAbroad = "#B11A5F";

  // --- 3. Position du texte au milieu du segment ---
  const getLabelPos = (startPercent: number, segmentLengthPercent: number) => {
    const percentMiddle = startPercent + segmentLengthPercent / 2;
    const angle = (percentMiddle * 360) / 100 - 90;
    const angleRad = (angle * Math.PI) / 180;
    const x = center + radius * Math.cos(angleRad);
    const y = center + radius * Math.sin(angleRad);
    return { x, y };
  };

  const labelFrancePos = getLabelPos(0, percentFrance);
  const labelAbroadPos = getLabelPos(percentFrance, percentAbroad);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg flex flex-col items-center justify-center">
      <h3 className="font-title text-xl text-bleu-fonce dark:text-bleu-clair mb-6 uppercase tracking-wide">Répartition Géographique</h3>

      <div className="relative mb-6">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Fond */}
          <circle cx={center} cy={center} r={radius} fill="none" stroke="#f3f4f6" strokeWidth={strokeWidth} />

          {/* Segment France */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colorFrance}
            strokeWidth={strokeWidth}
            strokeDasharray={`${franceStrokeLength} ${Math.max(circumference - franceStrokeLength, 0)}`}
            strokeDashoffset="0"
            transform={`rotate(-90 ${center} ${center})`}
            strokeLinecap="butt"
          />
          {percentFrance > 5 && (
            <text
              x={labelFrancePos.x}
              y={labelFrancePos.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-sm font-bold fill-white"
            >
              {percentFrance}%
            </text>
          )}

          {/* Segment Étranger */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colorAbroad}
            strokeWidth={strokeWidth}
            strokeDasharray={`${abroadStrokeLength} ${Math.max(circumference - abroadStrokeLength, 0)}`}
            strokeDashoffset={-((percentFrance / 100) * circumference)}
            transform={`rotate(-90 ${center} ${center})`}
            strokeLinecap="butt"
          />
          {percentAbroad > 5 && (
            <text
              x={labelAbroadPos.x}
              y={labelAbroadPos.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-sm font-bold fill-white"
            >
              {percentAbroad}%
            </text>
          )}
        </svg>
      </div>

      {/* Légende simplifiée */}
      <div className="flex items-center justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colorFrance }}></span>
          <span className="font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">France</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colorAbroad }}></span>
          <span className="font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Étranger</span>
        </div>
      </div>
    </div>
  );
};

export default DistributionChart;
