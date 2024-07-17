declare module 'react-beautiful-dnd' {
    import * as React from 'react';
  
    export interface DragDropContextProps {
      onDragEnd: (result: DropResult) => void;
      onDragStart?: (initial: DragStart) => void;
      onDragUpdate?: (initial: DragUpdate) => void;
      children: React.ReactNode;  // Add this line
    }
  
    export class DragDropContext extends React.Component<DragDropContextProps> {}
  
    export interface DroppableProps {
      droppableId: string;
      children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactNode;
    }
  
    export class Droppable extends React.Component<DroppableProps> {}
  
    export interface DraggableProps {
      draggableId: string;
      index: number;
      children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => React.ReactNode;
    }
  
    export class Draggable extends React.Component<DraggableProps> {}
  
    export interface DropResult {
      source: DraggableLocation;
      destination: DraggableLocation | null;
      draggableId: string;
      type: string;
    }
  
    export interface DraggableLocation {
      droppableId: string;
      index: number;
    }
  
    export interface DragStart {
      draggableId: string;
      type: string;
      source: DraggableLocation;
    }
  
    export interface DragUpdate {
      destination?: DraggableLocation;
    }
  
    export interface DroppableProvided {
      innerRef: (element?: HTMLElement | null) => void;
      placeholder: React.ReactElement | null;
      droppableProps: React.HTMLProps<HTMLDivElement>;
    }
  
    export interface DraggableProvided {
      innerRef: (element?: HTMLElement | null) => void;
      draggableProps: React.HTMLProps<HTMLDivElement>;
      dragHandleProps: React.HTMLProps<HTMLDivElement> | null;
    }
  
    export interface DroppableStateSnapshot {
      isDraggingOver: boolean;
    }
  
    export interface DraggableStateSnapshot {
      isDragging: boolean;
    }
  }
  