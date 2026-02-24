import { careerNodes, trackLabels } from '../data/careerData';
import { CareerNode } from '../types';

interface Props {
  node?: CareerNode;
  onSelectRelated: (id: string) => void;
}

const listBlock = (title: string, values: string[]) => (
  <div>
    <p className="text-xs font-semibold text-slate-500">{title}</p>
    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
      {values.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  </div>
);

export const DetailPanel = ({ node, onSelectRelated }: Props) => {
  if (!node) {
    return (
      <aside className="h-full rounded-lg border border-dashed border-slate-300 bg-white p-4">
        <h2 className="text-lg font-semibold">ノード詳細</h2>
        <p className="mt-3 text-sm text-slate-600">左側のノードをクリックすると、役割詳細・必要スキル・次段階条件を表示します。</p>
      </aside>
    );
  }

  const related = (node.relatedNodeIds ?? []).map((id) => careerNodes.find((item) => item.id === id)).filter(Boolean) as CareerNode[];

  return (
    <aside className="h-full overflow-y-auto rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="text-lg font-bold">{node.titleJa}</h2>
      <p className="mt-1 text-xs text-slate-500">{trackLabels[node.track]} / 段階{node.stage} / {node.pathType}</p>
      <p className="mt-3 text-sm text-slate-700">{node.summary}</p>
      <div className="mt-4 space-y-4">
        {listBlock('必要スキル', node.requiredSkills)}
        {listBlock('必要経験', node.requiredExperience)}
        {listBlock('推奨資格', node.recommendedCerts)}
        {listBlock('ツール・環境・言語', node.toolsEnvironmentsLanguages)}
        {listBlock('次の段階に上がる条件', node.nextStepConditions)}
      </div>
      <div className="mt-4">
        <p className="text-xs font-semibold text-slate-500">カテゴリ/サブドメイン</p>
        <p className="text-sm text-slate-700">{node.subtrack ?? '共通'}</p>
      </div>
      <div className="mt-4">
        <p className="text-xs font-semibold text-slate-500">兼任/分岐メモ</p>
        <p className="text-sm text-slate-700">{node.canCoexistWith?.length ? `兼任候補: ${node.canCoexistWith.join(', ')}` : '特記事項なし'}</p>
      </div>
      <div className="mt-4">
        <p className="text-xs font-semibold text-slate-500">関連ノード</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {related.map((item) => (
            <button key={item.id} onClick={() => onSelectRelated(item.id)} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700 hover:bg-slate-200">
              {item.shortLabel}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
