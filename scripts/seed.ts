import { db } from 'api/src/lib/db'
import CryptoJS from 'crypto-js'

const users = [
  {
    name: 'Borut',
    username: 'borut',
    email: 'bobalazek124@gmail.com',
    rawPassword: 'password',
    roles: ['admin'],
  },
]

const categories = [
  { name: 'Building', description: 'All building related stuff' },
  {
    name: 'DIY',
    description: 'All DIY related stuff',
    children: [{ name: 'Woodwork', description: 'All wodwork related stuff' }],
  },
]

const insertCategoryWithChildren = async (
  category: typeof categories[0],
  parentId: string = null
) => {
  console.log(`Inserting the "${category.name}" category ...`)

  const categoryEntity = await db.category.create({
    data: { name: category.name, description: category.description, parentId },
  })

  if (typeof category.children !== 'undefined') {
    for (const childCategory of category.children) {
      await insertCategoryWithChildren(childCategory, categoryEntity.id)
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
      await insertCategoryWithChildren(data)
    }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
