import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        username: 'String401400',
        email: 'String253870',
        hashedPassword: 'String',
        salt: 'String',
        name: 'String',
        roles: 'String',
        updatedAt: '2022-08-18T12:54:36Z',
      },
    },
    two: {
      data: {
        username: 'String9715000',
        email: 'String2745006',
        hashedPassword: 'String',
        salt: 'String',
        name: 'String',
        roles: 'String',
        updatedAt: '2022-08-18T12:54:36Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
