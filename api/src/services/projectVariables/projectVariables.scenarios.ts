import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ProjectVariableCreateArgs>({
  projectVariable: {
    one: {
      data: {
        name: 'String',
        value: 'String',
        type: 'String',
        updatedAt: '2022-08-18T11:34:23Z',
        project: {
          create: {
            name: 'String',
            description: 'String',
            currencySymbol: 'String',
            updatedAt: '2022-08-18T11:34:23Z',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        value: 'String',
        type: 'String',
        updatedAt: '2022-08-18T11:34:23Z',
        project: {
          create: {
            name: 'String',
            description: 'String',
            currencySymbol: 'String',
            updatedAt: '2022-08-18T11:34:23Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
