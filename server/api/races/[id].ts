export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string }
  const neon = getNeonClient()
  return await select(
    neon,
    {
      columns: ['race_id', 'race_series', 'race_name', 'description', 'race_date', 'map_link'],
      from: { table: 'races' },
      where: [
        { column: { name: 'race_id' }, condition: '=', value: id },
      ],
    },
  )
})
