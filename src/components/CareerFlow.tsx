import { Background, Controls, Edge, MarkerType, Node, ReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { stageLabels } from '../data/careerData';
import { CareerEdge, CareerNode } from '../types';

interface Props {
  nodes: CareerNode[];
  edges: CareerEdge[];
  selectedId?: string;
  onSelectNode: (id: string) => void;
  filterPath: Set<string>;
}

const nodeStyle = (node: CareerNode, selectedId?: string): string => {
  const base = 'min-w-[170px] rounded-md border px-2 py-2 text-left text-xs shadow-sm';
  const selected = selectedId === node.id ? ' ring-2 ring-offset-2 ring-slate-900' : '';
  if (node.pathType === 'manager') return `${base} border-slate-500 bg-white ${selected}`;
  if (node.pathType === 'common') return `${base} border-slate-300 bg-slate-100 ${selected}`;
  return `${base} border-slate-700 bg-slate-200 ${selected}`;
};

export const CareerFlow = ({ nodes, edges, selectedId, onSelectNode, filterPath }: Props) => {
  const flowNodes: Node[] = nodes
    .filter((node) => (filterPath.size ? filterPath.has(node.pathType) : true))
    .map((node) => ({
      id: node.id,
      position: node.position,
      data: { label: `${node.shortLabel}\n段階${node.stage}` },
      type: 'default',
      style: { width: 180, background: 'transparent', border: 'none', padding: 0 },
      className: nodeStyle(node, selectedId),
    }));

  const nodeIds = new Set(flowNodes.map((node) => node.id));
  const flowEdges: Edge[] = edges
    .filter((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target))
    .map((edge, index) => ({
      id: `${edge.source}-${edge.target}-${index}`,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      style: {
        stroke: edge.type === 'normal' ? '#334155' : '#64748b',
        strokeDasharray: edge.type === 'normal' ? undefined : '4 3',
      },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' },
      animated: selectedId ? edge.source === selectedId || edge.target === selectedId : false,
    }));

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-white">
      <div className="pointer-events-none absolute z-10 grid w-[66%] grid-cols-6 gap-1 p-2 text-center text-[11px] text-slate-400">
        {stageLabels.map((label) => (
          <div key={label} className="rounded bg-slate-50 py-1">{label}</div>
        ))}
      </div>
      <ReactFlow nodes={flowNodes} edges={flowEdges} fitView onNodeClick={(_, node) => onSelectNode(node.id)}>
        <Background gap={24} color="#e2e8f0" />
        <Controls position="bottom-left" />
      </ReactFlow>
    </div>
  );
};
