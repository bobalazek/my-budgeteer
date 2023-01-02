# My Budgeteer

My budgeteer is a simple self-hosted budgetting app.

**Currently in active development. Not intended for use in production!**

## Stack

* RedwoodJS
* Prisma
* Material UI
* Recoil
* GraphQL

## Screenshots

![Login page](/docs/screenshots/login_page.png)
![My projects page](/docs/screenshots/my_projects_page.png)
![Project templates page](/docs/screenshots/project_templates_page.png)
![Project page](/docs/screenshots/project_page.png)
![Project page - edit expense](/docs/screenshots/project_page_expense_edit.png)

## Setup

* Create your own `.env` file by copying `.env.example` and setting your own variables, most importantly the `DATABASE_URL` variable
* Run the database migrations: `yarn rw data-migrate up`
* Run the database seeds: `yarn rw prisma db seed`
* Run the web server: `yarn rw dev`
* Go to the [Login page](http://localhost:8910/login) and login with `admin:password`
* Now you can go to your [Projects page](http://localhost:8910/my-projects), where you'll be able to add your projects and/or templates

## Deployment

TBC
