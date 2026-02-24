import { TrackId } from '../types';
import { trackLabels } from '../data/careerData';

interface Props {
  active: TrackId;
  onChange: (track: TrackId) => void;
}

export const TrackTabs = ({ active, onChange }: Props) => (
  <div className="flex gap-2">
    {(Object.keys(trackLabels) as TrackId[]).map((track) => (
      <button
        key={track}
        onClick={() => onChange(track)}
        className={`rounded-md border px-4 py-2 text-sm font-medium ${
          active === track ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-700'
        }`}
      >
        {trackLabels[track]}
      </button>
    ))}
  </div>
);
