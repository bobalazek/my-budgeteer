export interface SeedProjectInterface {
  name: string
  description: string
  currencySymbol: string
  expenses: SeedProjectExpenseInterface[]
}

export interface SeedProjectExpenseInterface {
  name: string
  recurringInterval?: 'NONE' | 'MONTHLY' | 'YEARLY'
  children?: SeedProjectExpenseInterface[]
}

export const projects: SeedProjectInterface[] = [
  {
    name: 'Buy plot + build a house on it',
    description:
      'A template that assumes you buying an empty plot of land and you are building a house onto it',
    currencySymbol: 'EUR',
    expenses: [
      {
        name: 'Land',
        children: [
          { name: 'Building permit' },
          {
            name: 'Land contributions',
            children: [
              { name: 'Water contribution' },
              { name: 'Electricity contribution' },
              { name: 'Waste contribution' },
              { name: 'Internet contribution' },
            ],
          },
          {
            name: 'Installation cost',
            children: [
              { name: 'Water installation cost' },
              { name: 'Electricity installation cost' },
              { name: 'Waste installation cost' },
              { name: 'Internet installation cost' },
            ],
          },
          { name: 'Plot leveling' },
          { name: 'Concrete plate' },
          {
            name: 'Fence',
            children: [
              { name: 'Wired fence' },
              { name: 'Pillars' },
              { name: 'Laurel trees' },
              { name: 'Electric gate' },
            ],
          },
        ],
      },
      {
        name: 'Building',
        children: [
          { name: 'Building exterior' },
          {
            name: 'Building interior',
            children: [
              { name: 'Bathroom' },
              { name: 'Bedroom' },
              { name: 'Kitchen' },
              { name: 'Living room' },
              { name: 'Garage' },
            ],
          },
        ],
      },
      {
        name: 'Recurring costs',
        children: [
          { name: 'Property tax', recurringInterval: 'YEARLY' },
          { name: 'Water bill', recurringInterval: 'MONTHLY' },
          { name: 'Electricity bill', recurringInterval: 'MONTHLY' },
          { name: 'Waste bill', recurringInterval: 'MONTHLY' },
          { name: 'Internet bill', recurringInterval: 'MONTHLY' },
        ],
      },
    ],
  },
]
