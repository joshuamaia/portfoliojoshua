import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

/** Lado do retângulo de um nó onde uma conexão começa ou termina. */
export type DiagramSide = 'top' | 'right' | 'bottom' | 'left';

/** Define a cor do nó; cada tom é mapeado para um token do tema. */
export type DiagramTone = 'accent' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';

/** Formato visual do nó. */
export type DiagramShape = 'box' | 'pill' | 'diamond';

export interface DiagramNode {
  id: string;
  label: string;
  caption?: string;
  /** Texto curto exibido no tooltip */
  summary: string;
  icon: [IconPrefix, IconName];
  tone: DiagramTone;
  shape?: DiagramShape;
  /** Posição e tamanho em unidades do viewBox */
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DiagramEdge {
  from: string;
  to: string;
  /** sync = chamada direta (linha contínua); async = mensagem/evento (linha tracejada animada) */
  mode: 'sync' | 'async';
  label?: string;
  fromSide?: DiagramSide;
  toSide?: DiagramSide;
}

/** Área tracejada que agrupa nós (ex.: uma aplicação implantada como unidade). */
export interface DiagramGroup {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Diagram {
  /** Nome curto usado nos rótulos acessíveis */
  title: string;
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  groups?: DiagramGroup[];
}
