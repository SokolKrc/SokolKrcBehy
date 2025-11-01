<template>
  <div>
    <!-- 1. Loading indicator -->
    <p v-if="pending">
      Loading results…
    </p>

    <!-- 2. Error message -->
    <p v-else-if="error">
      Error: {{ error.message }}
    </p>

    <!-- 3. Results table once data is available -->
    <div v-else>
      <UTable
        :cols="cols"
        :rows="results"
        :row-key="(row: { result_id: number }) => row.result_id"
        hoverable
        striped
      >
        <!-- Optional: If you have columns that need custom rendering,
               define a slot like this:

          <template #cell-runner_name="{ row }">
            <strong>{{ row.runner_name }}</strong>
          </template>

          <template #cell-achieved_time="{ row }">
            {{ formatTime(row.achieved_time) }}
          </template>

          and so on...
          -->
      </UTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useFetch } from '#app'

/**
   * Define the columns for UTable.
   * Make sure the "key" property matches the field names
   * your backend returns in the results list.
   */
const cols = [
  { key: 'runner_name', label: 'Runner' },
  { key: 'category', label: 'Category' },
  { key: 'start_number', label: 'Start #', sortable: true },
  { key: 'achieved_time', label: 'Time', sortable: true },
  { key: 'position_total', label: 'Pos (Overall)', sortable: true },
  { key: 'position_in_category', label: 'Pos (Category)' },
]

// 1. Retrieve the race ID, for example from the route param:
const route = useRoute()
const raceId = route.params.id

/**
   * 2. Fetch all results for the given race ID. Adjust
   * your endpoint path to match your server definition.
   * For example, if your server route is "/api/races/[id]/results",
   * then do:
   */
const { data: results, pending, error } = await useFetch(`/api/results/${raceId}`)

// Optional: If you need to format or transform the data further,
// you can do so in a watch or computed. For example:
//
// const formattedResults = computed(() => {
//   return results.value?.map(r => {
//     return {
//       ...r,
//       runner_name: `${r.first_name} ${r.last_name}`,
//       // etc.
//     }
//   })
// })
//
// Then pass `formattedResults.value` to <UTable :rows="formattedResults" />.
</script>
