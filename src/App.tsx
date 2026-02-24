import { useMemo, useState } from 'react';
import { CareerFlow } from './components/CareerFlow';
import { DetailPanel } from './components/DetailPanel';
import { TrackTabs } from './components/TrackTabs';
import { careerNodes, getTrackData, trackLabels } from './data/careerData';
import { PathType, TrackId } from './types';

const chips: { label: string; value: PathType }[] = [
  { label: 'Specialist', value: 'specialist' },
  { label: 'Manager', value: 'manager' },
  { label: '共通', value: 'common' },
];

function App() {
  const [track, setTrack] = useState<TrackId>('development');
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [activePathTypes, setActivePathTypes] = useState<Set<PathType>>(new Set());

  const { nodes, edges } = useMemo(() => getTrackData(track), [track]);

  const filteredNodes = useMemo(() => {
    if (!search.trim()) return nodes;
    const keyword = search.toLowerCase();
    return nodes.filter((node) =>
      [node.titleJa, node.shortLabel, ...node.requiredSkills, ...node.tags].join(' ').toLowerCase().includes(keyword),
    );
  }, [nodes, search]);

  const selected = careerNodes.find((node) => node.id === selectedId && node.track === track);

  const toggleChip = (path: PathType) => {
    const next = new Set(activePathTypes);
    if (next.has(path)) {
      next.delete(path);
    } else {
      next.add(path);
    }
    setActivePathTypes(next);
  };

  return (
    <div className="h-screen bg-slate-100 p-4 text-slate-800">
      <header className="mb-4 rounded-lg border border-slate-200 bg-white p-4">
        <h1 className="text-2xl font-bold">Career Path</h1>
        <p className="text-sm text-slate-500">キャリアパスモデル（育成面談用）</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <TrackTabs active={track} onChange={(next) => { setTrack(next); setSelectedId(undefined); }} />
          <div className="flex items-center gap-2">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ノード名 / スキル検索"
              className="rounded border border-slate-300 px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              {chips.map((chip) => (
                <button
                  key={chip.value}
                  onClick={() => toggleChip(chip.value)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    activePathTypes.has(chip.value) ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
          <span>凡例: {trackLabels[track]}</span>
          <span>Specialist: 塗りつぶし</span>
          <span>Manager: 枠線</span>
          <span>共通: 薄グレー</span>
          <span>破線: 任意/クロストラック</span>
        </div>
      </header>

      <main className="grid h-[calc(100%-170px)] grid-cols-3 gap-4">
        <section className="col-span-2 relative">
          <CareerFlow nodes={filteredNodes} edges={edges} selectedId={selectedId} onSelectNode={setSelectedId} filterPath={new Set(activePathTypes)} />
          <p className="mt-2 text-xs text-slate-600">※ SpecialistやManagerは兼任可能</p>
        </section>
        <section className="col-span-1">
          <DetailPanel node={selected} onSelectRelated={setSelectedId} />
        </section>
      </main>
    </div>
  );
}

export default App;
