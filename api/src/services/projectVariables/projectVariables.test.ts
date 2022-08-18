import {
  projectVariables,
  projectVariable,
  createProjectVariable,
  updateProjectVariable,
  deleteProjectVariable,
} from './projectVariables'
import type { StandardScenario } from './projectVariables.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('projectVariables', () => {
  scenario(
    'returns all projectVariables',
    async (scenario: StandardScenario) => {
      const result = await projectVariables()

      expect(result.length).toEqual(
        Object.keys(scenario.projectVariable).length
      )
    }
  )

  scenario(
    'returns a single projectVariable',
    async (scenario: StandardScenario) => {
      const result = await projectVariable({
        id: scenario.projectVariable.one.id,
      })

      expect(result).toEqual(scenario.projectVariable.one)
    }
  )

  scenario('creates a projectVariable', async (scenario: StandardScenario) => {
    const result = await createProjectVariable({
      input: {
        name: 'String',
        value: 'String',
        type: 'String',
        projectId: scenario.projectVariable.two.projectId,
        updatedAt: '2022-08-18T11:34:23Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.value).toEqual('String')
    expect(result.type).toEqual('String')
    expect(result.projectId).toEqual(scenario.projectVariable.two.projectId)
    expect(result.updatedAt).toEqual('2022-08-18T11:34:23Z')
  })

  scenario('updates a projectVariable', async (scenario: StandardScenario) => {
    const original = await projectVariable({
      id: scenario.projectVariable.one.id,
    })
    const result = await updateProjectVariable({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a projectVariable', async (scenario: StandardScenario) => {
    const original = await deleteProjectVariable({
      id: scenario.projectVariable.one.id,
    })
    const result = await projectVariable({ id: original.id })

    expect(result).toEqual(null)
  })
})
