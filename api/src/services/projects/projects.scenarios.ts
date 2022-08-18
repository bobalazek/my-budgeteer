import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ProjectCreateArgs>({
  project: {
    one: {
      data: {
        name: 'String',
        description: 'String',
        currencySymbol: 'String',
        updatedAt: '2022-08-18T11:47:58Z',
      },
    },
    two: {
      data: {
        name: 'String',
        description: 'String',
        currencySymbol: 'String',
        updatedAt: '2022-08-18T11:47:58Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
