---
name: Kanban Task Management Web App
slug: postgres-prisma
description: The Kanban Task Management App is created with Next.js app that uses Vercel Postgres as the database and Prisma as the ORM.
framework: Next.js
useCase: Starter
css: Tailwind
database: Vercel Postgres
deployUrl: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fexamples%2Ftree%2Fmain%2Fstorage%2Fpostgres-prisma&project-name=postgres-prisma&repository-name=postgres-prisma&demo-title=Vercel%20Postgres%20%2B%20Prisma%20Next.js%20Starter&demo-description=Simple%20Next.js%20template%20that%20uses%20Vercel%20Postgres%20as%20the%20database%20and%20Prisma%20as%20the%20ORM.&demo-url=https%3A%2F%2Fpostgres-prisma.vercel.app%2F&demo-image=https%3A%2F%2Fpostgres-prisma.vercel.app%2Fopengraph-image.png&stores=%5B%7B"type"%3A"postgres"%7D%5D
demoUrl: https://postgres-prisma.vercel.app/
relatedTemplates:
  - postgres-starter
  - postgres-kysely
  - postgres-sveltekit
---

# Kanban Task Management Web App

This is a solution to the [Kanban task management web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

The Kanban Task Management App is created with [Vercel Postgres](https://vercel.com/postgres) as the database and [Prisma](https://prisma.io/) as the ORM.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**



## Frontend Mentor - Kanban task management web app

![Design preview for the Kanban task management web app coding challenge](public/preview.jpg)

## Welcome! 👋

This is a premium [Frontend Mentor](https://www.frontendmentor.io) coding challenge.

## The challenge

The challenge is to build out a task management app and get it looking as close to the design as possible.

Frontend Mentor provided the data in a local `data.json` file, to use and populate the content on the first load.

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete boards and tasks
- Receive form validations when trying to create/edit boards and tasks
- Mark subtasks as complete and move tasks between columns
- Hide/show the board sidebar
- Toggle the theme between light/dark modes
- **Bonus**: Allow users to drag and drop tasks to change their status and re-order them in a column
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)
- **Bonus**: Build this project as a full-stack application

### Expected Behaviour

- Boards
  - Clicking different boards in the sidebar will change to the selected board.
  - Clicking "Create New Board" in the sidebar opens the "Add New Board" modal.
  - Clicking in the dropdown menu "Edit Board" opens up the "Edit Board" modal where details can be changed.
  - Columns are added and removed for the Add/Edit Board modals.
  - Deleting a board deletes all columns and tasks and requires confirmation.
- Columns
  - A board needs at least one column before tasks can be added. If no columns exist, the "Add New Task" button in the header is disabled.
  - Clicking "Add New Column" opens the "Edit Board" modal where columns are added.
- Tasks
  - Adding a new task adds it to the bottom of the relevant column.
  - Updating a task's status will move the task to the relevant column. If you're taking on the drag-and-drop bonus, dragging a task to a different column will also update the status.

## Where to find everything

### Figma Design

The task is to build out the project to the design file provided. Frontend Mentor provided a Figma file of the design.

[Figma Design](https://www.figma.com/file/nLdPvoeQMERAwXgjj5bqYw/kanban-task-management-web-app?type=design&mode=design&t=z0QWmgBFsCBCSnIO-0)

All the required assets for this project are in the `public/assets` folder. The assets are already exported for the correct screen size and optimized. Some images are reusable at multiple screen sizes.

Frontend Mentor decided to use a nested data structure for the `data.json` file, but they were happy for the developer to feel free to alter and flatten the data however one like if required

The design system in the design file will give you more information about the various colors, fonts, and styles used in this project. Our fonts always come from [Google Fonts](https://fonts.google.com/).

## Deployements

This project is hosted on Vercel

- [Vercel](https://vercel.com/)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework

### What I learned

#### Prisma

##### Migrating

Make sure your Prisma schema is in sync with your database schema.

```zsh
npx prisma db pull
```

After Updating the schema

Caution: This will probably wipe the current data

```zsh
npx prisma db push
```

then use prisma migrate if the seed has been updated:

```zsh
npx prisma migrate dev
```

## User Management

In this project I'm using clerk for user management. Clerk is a complete suite of embeddable UIs, flexible APIs, and admin dashboards to authenticate and manage your users.

- Website [clerk](https://clerk.com/)

I created a project on Clerk
chose Google and Email authentication
installed clerk with yarn
created middleware file
and added the clerk provider to the layout file

### Continued development

### Resources

- Hero Icons - [Hero Icons](https://heroicons.com/)

## Author

- Website - [Jaco Kotzee](https://www.jacofrontend.dev)
- Frontend Mentor - [@jakwakwa](https://www.frontendmentor.io/profile/jakwakwa)

## Acknowledgments

## Overview

This is a Next.js-based Kanban board application that allows users to manage tasks across different boards and columns. The app includes features like:

- Board management (create, read, update, delete)
- Task management with subtasks
- Column status management
- Dark/light theme support
- Toast notifications
- Responsive design

### Key Components

1. **Store Management**
Uses Zustand for state management (reference `context/store.ts`):

```10:28:context/store.ts
interface KanbanStore {
  boards: BoardState[];
  currentBoard: any;
  columns: ColumnState[];
  tasks: TaskState[];
  subTasks: Subtask[];
  boardId: string;
  isBoardAdding: boolean;
  loading: boolean;
  addBoards: (boards: BoardState[]) => void;
  addCurrentBoard: (board: BoardState) => void;
  addColumns: (columns: ColumnState[]) => void;
  addTasks: (tasks: TaskState[]) => void;
  addSubTasks: (subTasks: Subtask[]) => void;
  addBoardId: (boardId: string) => void;
  setIsBoardAdding: (isBoardAdding: boolean) => void;
  setLoader: (loading: boolean) => void;
  reset: () => void;
}
```


2. **Main Kanban Grid**
The core component that renders the board layout and columns (reference `components/kanban/kanban-grid.tsx`):

```37:112:components/kanban/kanban-grid.tsx
const KanbanGrid = ({
  subTasks = [],
  boards = [],
}: {
  subTasks?: Subtask[];
  boards?: BoardState[];
}): JSX.Element => {
  const {
    addColumns,
    addTasks,
    addSubTasks,
    addBoards,
    addCurrentBoard,
    columns,
    tasks: tasksStore,
    loading: loader,
  } = useStore((state) => ({
    addColumns: state.addColumns,
    addTasks: state.addTasks,
    addSubTasks: state.addSubTasks,
    addBoards: state.addBoards,
    addCurrentBoard: state.addCurrentBoard,
    columns: state.columns,
    tasks: state.tasks,
    loading: state.loading,
  }));

  const slug = useSearchParams();
  const boardName = slug.get("board");
  const boardId = slug.get("id") as unknown as string;
  const router = useRouter();
  const [state, setState] = useState<StateT>(INITIAL_STATE);
  const { isBoardAdding } = useStore((state) => state);

  const [openBoardOptions, setOpenBoardOptions] = useState<boolean>(false);

  const [openEditBoardModul, setOpenEditBoardModul] = useState(false);

  const [isDeletingBoard, setIsDeletingBoard] = useState(false);
  const [boardSaving, setBoardSaving] = useState(false);
  const [addColumnIsLoading, setAddColumnIsLoading] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  const handleAddColumn = async () => {
    try {
      setAddColumnIsLoading(true);
      const response = await fetch("/api/addColumn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newColumnName, boardId: boardId }),
      });
      const data = await response.json();
      console.log("data", response);
      if (response.ok) {
        setState((prevState) => ({
          ...prevState,
          columns: [
            ...prevState.columns,
            {
              id: data.data.id,
              boardId: boardId,
              name: newColumnName,
              tasks: [],
            },
          ],
        }));
        setAddColumnIsLoading(false);
        setNewColumnName("");
        router.refresh();
      }
    } catch (error) {
      console.error("Error adding column:", error);
    }
  };
```


3. **Task Management**
Includes functionality for:
- Adding tasks
- Editing tasks
- Managing subtasks
- Status updates

4. **Database Schema**
Uses Prisma with a schema that defines relationships between:

```44:65:schema.prisma

model Task {
  id          String    @id @default(uuid())
  title       String
  description String?
  status      String
  column      Column    @relation(fields: [columnId], references: [id])
  columnId    String
  subtasks    Subtask[]

  @@index([columnId]) // Add this line to create an index on the boardId field
}

model Subtask {
  id          String  @id @default(uuid())
  title       String
  isCompleted Boolean
  task        Task    @relation(fields: [taskId], references: [id])
  taskId      String

  @@index([taskId]) // Add this line to create an index on the boardId field
}
```


### Styling
- Uses Tailwind CSS for styling
- Implements custom theme configuration:

```8:51:tailwind.config.js
export const theme = {
  extend: {
    fontFamily: {
      default: ["var(--font-jakarta)"],
    },
    colors: {
      "kblack-main": "#000112",
      "kpurple-light": "#d8d7f1",
      "kpurple-main": "#635fc7",
      "kgreen-main": "#67e2ae",
      "kgray-text": "#828fa3",
      "kgray-label": "#000112",
      "kblue-todo": "#E7A75B",
      "indigo-500": "#635FC7",
      "medium-gray": "#89898f",

      ...blackA,
      ...green,
      ...mauve,
      ...slate,
      ...violet,
    },
    keyframes: {
      hide: {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
      },
      slideIn: {
        from: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
        to: { transform: "translateX(0)" },
      },
      swipeOut: {
        from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
        to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
      },
    },
    animation: {
      hide: "hide 100ms ease-in",
      slideIn: "slideIn 250ms cubic-bezier(0.16, 1, 0.3, 1)",
      swipeOut: "swipeOut 200ms ease-out",
    },
  },
  darkMode: "selector", // add this line
};
```


### Notable Features

1. **Toast Notifications**
Custom toast implementation for user feedback:

```13:38:components/kanban/render-toastmsg.tsx
function RenderToastMsg({ message, state, setState }: Readonly<ToastProps>) {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="shadow-slate-400 shadow-lg bg-indigo-600 rounded-md p-[15px]  grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={state.open}
        onOpenChange={() =>
          setState((prevState: any) => ({
            ...prevState,
            open: false,
          }))
        }
      >
        <Toast.Title className="[grid-area:_title] mb-[5px] s text-[15px] font-extrabold text-slate-100 animate-pulse tracking-wider">
          {message.title}
        </Toast.Title>
        <Toast.Description asChild>
          <div className="[grid-area:_description] m-0  text-[13px] bold text-indigo-200 leading-[1.3]">
            {message.description}
          </div>
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
}
```


2. **Column Status Visualization**
Custom column status indicators with color coding:

```1:26:components/kanban/columns/column-text.tsx
const ColumnText = ({
  color,
  alignRight,
  children,
}: {
  color: string;
  alignRight: boolean;
  children: React.ReactNode;
}) => {
  let bgColorClass;

  switch (color.toLowerCase()) {
    case "todo":
      bgColorClass = "bg-kblue-todo";
      break;
    case "doing":
      bgColorClass = "bg-kpurple-main";
      break;
    case "done":
      bgColorClass = "bg-kgreen-main";
      break;
    default:
      bgColorClass = "bg-kgreen-main";
      break;
  }
  if (!alignRight) {
```


3. **Form Validation**
Implements form validation for board and task operations with custom error messages.

### Technical Stack
- Next.js
- TypeScript
- Prisma (ORM)
- Zustand (State Management)
- Tailwind CSS
- Radix UI Components
- Vercel (Deployment)

The application follows a modular architecture with clear separation of concerns between components, state management, and database operations. It implements modern React patterns and TypeScript for type safety.