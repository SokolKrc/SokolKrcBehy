export default defineEventHandler(async () => {
  const neon = getNeonClient()
  return await select(
    neon,
    ['race_id', 'race_name', 'description', 'race_date', 'map_link'],
    'races',
    undefined,
    'race_date DESC',
  )
})
