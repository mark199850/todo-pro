export interface Todo {
  id: string
  description: string
  date: string
}

export const todos: Todo[] = [
  {
    id: '1',
    description: 'Complete project proposal',
    date: '2025-03-01',
  },
  {
    id: '2',
    description: 'Review team performance',
    date: '2025-03-01',
  },
  {
    id: '3',
    description: 'Schedule quarterly meeting',
    date: '2025-03-02',
  },
  {
    id: '4',
    description: 'Update documentation',
    date: '2025-03-03',
  },
  {
    id: '5',
    description: 'Client presentation preparation',
    date: '2025-03-03',
  },
  {
    id: '6',
    description: 'Team lunch',
    date: '2025-03-04',
  },
  {
    id: '7',
    description: 'Code review session',
    date: '2025-03-04',
  },
  {
    id: '8',
    description: 'Deploy new features',
    date: '2025-03-05',
  },
  {
    id: '9',
    description: 'Retrospective meeting',
    date: '2025-03-05',
  },
]
