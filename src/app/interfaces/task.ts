export interface Task {
    id: string;
    title: string;
    description: string
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
  }