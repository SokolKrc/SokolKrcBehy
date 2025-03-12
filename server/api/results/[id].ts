export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    // ... Fetch all results from your DB for race = id ...
    // Return an array of result objects that match the "key" fields above:
    return [
      {
        result_id: 1,
        runner_name: "John Doe",
        category: "M30",
        start_number: 12,
        achieved_time: "01:15:32",
        position_total: 3,
        position_in_category: 1
      },
      // ...
    ]
  })