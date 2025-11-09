export default defineEventHandler(async () => {
  const neon = getNeonClient()
  return await select(
    neon,
    {
      columns: ['race_id', 'race_series', 'race_name', 'description', 'race_date', 'map_link'],
      from: { table: 'races' },
      where: undefined,
      order: 'race_date DESC',
    },
  )
})
