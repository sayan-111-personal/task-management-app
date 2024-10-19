import { Task } from "./interfaces/task";
import TaskList from "./TaskList";

export default async function Home() {
  const tasks: Task[] = [
    { 
      id: '1', 
      title: 'Learn Next.js', 
      description: 'Study the fundamentals of Next.js and build a project.',
      completed: false, 
      priority: 'high'
    },
    { 
      id: '2', 
      title: 'Do Homework', 
      description: 'Complete the assignments for the upcoming week.',
      completed: false, 
      priority: 'medium'
    },
    { 
      id: '3', 
      title: 'Walk the Dog', 
      description: 'Take the dog for a 30-minute walk around the park.',
      completed: true, 
      priority: 'low'
    },
  ];
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Sayan's Task Management App</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}
