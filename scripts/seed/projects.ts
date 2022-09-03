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
          {
            name: 'Interior',
            children: [
              {
                name: 'Bathroom',
                children: [
                  { name: 'Toilet' },
                  { name: 'Shower' },
                  { name: 'Bathroom block' },
                  { name: 'Top load washer' },
                  { name: 'Humidity ventilator' },
                  { name: 'Heater' },
                ],
              },
              {
                name: 'Kitchen',
                children: [
                  { name: 'Kitchen block' },
                  { name: 'Sink' },
                  {
                    name: 'Appliances',
                    children: [
                      { name: 'Hob' },
                      { name: 'Oven' },
                      { name: 'Hood' },
                      { name: 'Fridge' },
                      { name: 'Microwave' },
                    ],
                  },
                  { name: 'Plates' },
                  { name: 'Pans' },
                  { name: 'Cutlery' },
                ],
              },
              {
                name: 'Dining room',
                children: [{ name: 'Dining table' }, { name: 'Dining chairs' }],
              },
              {
                name: 'Bedroom',
                children: [
                  { name: 'Nightstand' },
                  { name: 'Wardrobe' },
                  { name: 'Bedroom TV' },
                  { name: 'Bed', children: [{ name: 'Mattress' }] },
                ],
              },

              {
                name: 'Living room',
                children: [
                  { name: 'Couch' },
                  { name: 'Living room TV' },
                  { name: 'Living room cabinet' },
                  { name: 'Living room table' },
                ],
              },
              { name: 'Garage' },
            ],
          },
          { name: 'Terrace', children: [{ name: 'Terrace chairs' }] },
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
