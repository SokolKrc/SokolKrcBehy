export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string }
  const neon = getNeonClient()
  return await select(
    neon,
    {
      columns: ['p1.result_id', 'p1.runner_id', 'p2.first_name', 'p2.last_name', 'p1.category', 'p1.start_number', 'p1.achieved_time', 'p1.position_total', 'p1.position_in_category'],
      from: [
        { table: 'results', alias: 'p1' },
        { table: 'runners', alias: 'p2', joinColumn1: { alias: 'p1', name: 'runner_id' }, joinColumn2: { alias: 'p2', name: 'runner_id' } },
      ],
      where: [
        { column: { alias: 'p1', name: 'race_id' }, condition: '=', value: id },
      ],
      order: 'p1.position_total ASC',
    },
  )
})
