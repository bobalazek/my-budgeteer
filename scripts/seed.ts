import { db } from 'api/src/lib/db'
import CryptoJS from 'crypto-js'

import { categories } from './seed/categories'
import { projects } from './seed/projects'
import { users } from './seed/users'

const insertCategory = async (
  data: typeof categories[number],
  parentId: string = null
) => {
  console.log(`Inserting the "${data.name}" category ...`)

  const category = await db.category.create({
    data: { name: data.name, description: data.description, parentId },
  })

  if (typeof data.children !== 'undefined') {
    for (const childCategory of data.children) {
      await insertCategory(childCategory, category.id)
    }
  }
}

const insertProject = async (data: typeof projects[number]) => {
  console.log(`Inserting the "${data.name}" project ...`)

  const project = await db.project.create({
    data: {
      name: data.name,
      description: data.description,
      currencySymbol: data.currencySymbol,
      isTemplate: true,
    },
  })

  if (typeof data.expenses !== 'undefined') {
    for (const expense of data.expenses) {
      await insertProjectExpense(project, expense)
    }
  }
}

const insertProjectExpense = async (
  project: Awaited<ReturnType<typeof db.project.create>>,
  data: typeof projects[number]['expenses'][number],
  parentId: string = null
) => {
  console.log(`Inserting the "${data.name}" project expense ...`)

  const projectExpense = await db.projectExpense.create({
    data: {
      name: data.name,
      recurringInterval: data.recurringInterval || 'NONE',
      parentId,
      projectId: project.id,
    },
  })

  if (typeof data.children !== 'undefined') {
    for (const child of data.children) {
      await insertProjectExpense(project, child, projectExpense.id)
    }
  }
}

export default async () => {
  try {
    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    // Users
    console.log('========== Users ==========')
    for (const user of users) {
      console.log(`Inserting the "${user.email}" user ...`)

      const salt = CryptoJS.lib.WordArray.random(128 / 8).toString()
      const hashedPassword = CryptoJS.PBKDF2(user.rawPassword, salt, {
        keySize: 256 / 32,
      }).toString()

      await db.user.create({
        data: {
          name: user.name,
          username: user.username,
          email: user.email,
          roles: user.roles,
          salt,
          hashedPassword,
        },
      })
    }

    // Categories
    console.log('========== Categories ==========')
    for (const data of categories) {
      await insertCategory(data)
    }

    // Projects
    console.log('========== Projects ==========')
    for (const data of projects) {
      await insertProject(data)
    }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
