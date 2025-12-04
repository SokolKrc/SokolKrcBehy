export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string }
  const neon = getNeonClient()
  return await select(
    neon,
    {
      columns: ['runner_id', 'first_name', 'last_name', 'club', 'gender', 'year_of_birth'],
      from: { table: 'runners' },
      where: [
        { column: { name: 'runner_id' }, condition: '=', value: id },
      ],
    },
  )
})
