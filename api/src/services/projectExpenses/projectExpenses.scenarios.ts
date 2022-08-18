import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ProjectExpenseCreateArgs>({
  projectExpense: {
    one: {
      data: {
        name: 'String',
        costRangeFrom: 1873767.0218650603,
        costRangeTo: 3392694.240608243,
        costActual: 7602633.231005303,
        progressPercentage: 1159256.2833619912,
        meta: { foo: 'bar' },
        conditions: { foo: 'bar' },
        links: 'String',
        tags: 'String',
        updatedAt: '2022-08-18T11:49:59Z',
        project: {
          create: {
            name: 'String',
            description: 'String',
            currencySymbol: 'String',
            updatedAt: '2022-08-18T11:49:59Z',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        costRangeFrom: 2378283.7300292714,
        costRangeTo: 4371881.115909031,
        costActual: 8910203.969417643,
        progressPercentage: 6952285.27091533,
        meta: { foo: 'bar' },
        conditions: { foo: 'bar' },
        links: 'String',
        tags: 'String',
        updatedAt: '2022-08-18T11:49:59Z',
        project: {
          create: {
            name: 'String',
            description: 'String',
            currencySymbol: 'String',
            updatedAt: '2022-08-18T11:49:59Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
