import {
  projectExpenses,
  projectExpense,
  createProjectExpense,
  updateProjectExpense,
  deleteProjectExpense,
} from './projectExpenses'
import type { StandardScenario } from './projectExpenses.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('projectExpenses', () => {
  scenario(
    'returns all projectExpenses',
    async (scenario: StandardScenario) => {
      const result = await projectExpenses()

      expect(result.length).toEqual(Object.keys(scenario.projectExpense).length)
    }
  )

  scenario(
    'returns a single projectExpense',
    async (scenario: StandardScenario) => {
      const result = await projectExpense({
        id: scenario.projectExpense.one.id,
      })

      expect(result).toEqual(scenario.projectExpense.one)
    }
  )

  scenario('creates a projectExpense', async (scenario: StandardScenario) => {
    const result = await createProjectExpense({
      input: {
        name: 'String',
        costRangeFrom: 8495596.739900347,
        costRangeTo: 8849575.915620863,
        costActual: 8859268.368448263,
        progressPercentage: 9856032.76647168,
        meta: { foo: 'bar' },
        conditions: { foo: 'bar' },
        links: 'String',
        tags: 'String',
        projectId: scenario.projectExpense.two.projectId,
        updatedAt: '2022-08-18T11:49:59Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.costRangeFrom).toEqual(8495596.739900347)
    expect(result.costRangeTo).toEqual(8849575.915620863)
    expect(result.costActual).toEqual(8859268.368448263)
    expect(result.progressPercentage).toEqual(9856032.76647168)
    expect(result.meta).toEqual({ foo: 'bar' })
    expect(result.conditions).toEqual({ foo: 'bar' })
    expect(result.links).toEqual('String')
    expect(result.tags).toEqual('String')
    expect(result.projectId).toEqual(scenario.projectExpense.two.projectId)
    expect(result.updatedAt).toEqual('2022-08-18T11:49:59Z')
  })

  scenario('updates a projectExpense', async (scenario: StandardScenario) => {
    const original = await projectExpense({
      id: scenario.projectExpense.one.id,
    })
    const result = await updateProjectExpense({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a projectExpense', async (scenario: StandardScenario) => {
    const original = await deleteProjectExpense({
      id: scenario.projectExpense.one.id,
    })
    const result = await projectExpense({ id: original.id })

    expect(result).toEqual(null)
  })
})
