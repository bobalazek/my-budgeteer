import { db } from 'api/src/lib/db'

const users = [] // TODO: figure out a programatic way, to have the correct salt and hashedpassword

export default async () => {
  try {
    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    // Users
    console.log('========== Users ==========')
    users.map(async (data) => {
      console.log(`Inserting the "${data.email}" user ...`)

      await db.user.create({ data })
    })
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
