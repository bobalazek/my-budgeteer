import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CategoryCreateArgs>({
  category: {
    one: {
      data: {
        name: 'String',
        description: 'String',
        updatedAt: '2022-08-18T11:32:27Z',
      },
    },
    two: {
      data: {
        name: 'String',
        description: 'String',
        updatedAt: '2022-08-18T11:32:27Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
