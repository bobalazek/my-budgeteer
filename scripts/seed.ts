import { db } from 'api/src/lib/db'
import { genSalt, hash } from 'bcrypt'

const usersData = [
  {
    email: 'bobalazek124@gmail.com',
    rawPassword: 'password',
    salt: 'salt',
    name: 'borut',
  },
]

export default async () => {
  try {
    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    // Users
    console.log('========== Users ==========')
    usersData.map(async (userData) => {
      console.log(`Inserting the "${userData.email}" user ...`)

      const salt = await genSalt()
      const hashedPassword = await hash(userData.rawPassword, salt)

      await db.user.create({ data: { ...userData, salt, hashedPassword } })
    })
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
