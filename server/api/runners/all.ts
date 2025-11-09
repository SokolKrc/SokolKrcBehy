export default defineEventHandler(async () => {
  const neon = getNeonClient()
  return await select(
    neon,
    {
      columns: ['runner_id', 'first_name', 'last_name', 'club', 'gender', 'year_of_birth'],
      from: { table: 'runners' },
      where: undefined,
      order: 'last_name, first_name',
    },
  )
})
