export default defineEventHandler(async (event) => {
  const { race } = event.context.params as { race: string }
  const neon = getNeonClient()

  // all races in series
  const races = await select(
    neon,
    {
      columns: ['race_id', 'race_series', 'race_name', 'description', 'race_date', 'map_link'],
      from: { table: 'races' },
      where: [
        { column: { name: 'race_series' }, condition: '=', value: race },
      ],
      order: 'race_date DESC',
    },
  )

  // IDs of selected races
  const raceIds = races.map(r => r.race_id)
  
  // top 10 results across all suitable races
  const topResults = await select(
    neon,
    {
      columns: ['p1.result_id', 'p1.runner_id', 'p2.first_name', 'p2.last_name', 'p1.category', 'p1.achieved_time', 'p3.race_date'],
      from: [
        { table: 'results', alias: 'p1' },
        { table: 'runners', alias: 'p2', joinColumn1: { alias: 'p1', name: 'runner_id' }, joinColumn2: { alias: 'p2', name: 'runner_id' } },
        { table: 'races', alias: 'p3', joinColumn1: { alias: 'p1', name: 'race_id' }, joinColumn2: { alias: 'p3', name: 'race_id' } },
      ],
      where: `p1.race_id IN (${raceIds.join(',')})`,
      order: 'p1.achieved_time ASC',
      limit: 10,
    },
  )


  return { 
    raceDetail: races[0], 
    raceCount: races.length,
    topResults 
  }
})
