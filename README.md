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

### Continued development

### Useful resources

## Author

- Website - [Jaco Kotzee](https://www.jacofrontend.dev)
- Frontend Mentor - [@jakwakwa](https://www.frontendmentor.io/profile/jakwakwa)

## Acknowledgments
