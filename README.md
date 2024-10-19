# Task Management App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- Add, edit, and delete tasks
- Mark tasks as completed or incomplete
- Sort tasks by priority (high, medium, low)
- Automatically persist tasks using localStorage
- Responsive design with Tailwind CSS and daisyUI components

## Technologies Used

- **Next.js** for server-side rendering and page navigation.
- **TypeScript** for type safety.
- **Tailwind CSS** and **daisyUI** for responsive design.
- **React Icons** for icons (edit, delete, etc.).
- **LocalStorage** for persisting tasks across sessions.

## Approach to Sorting Tasks by Priority
1. **Completion Status:** The sorting function first checks whether the tasks are completed. Incomplete tasks are prioritized, meaning they appear at the top, while completed tasks are pushed to the bottom.
2. **Priority Sorting:** If both tasks being compared have the same completion status, the tasks are sorted based on their priority levels. The priorityOrder object assigns numeric values to priority levels, where high is the most important, followed by medium, and then low.
3. **Effect Hook:** The useEffect hook ensures that this sorting logic is applied every time there is a change in the taskList. Additionally, tasks are saved to localStorage after every update, ensuring persistence across sessions.

   ```typescript
   useEffect(() => {
     const sortedTasks = [...taskList].sort((a, b) => {
       if (a.completed !== b.completed) {
         // Incomplete tasks are shown first
         return a.completed ? 1 : -1;
       }
   
       // Sort by priority if both tasks are incomplete or completed
       const priorityOrder = { high: 1, medium: 2, low: 3 };
       return priorityOrder[a.priority] - priorityOrder[b.priority];
     });
     setSortedTaskList(sortedTasks);
   
     // Save sorted tasks to localStorage
     localStorage.setItem('tasks', JSON.stringify(taskList));
   }, [taskList]);
   ```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd task-management-app
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
