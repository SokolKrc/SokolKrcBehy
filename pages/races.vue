<template>
  <div>
    <p v-if="status === 'pending'">
      Loading races…
    </p>

    <p v-else-if="status === 'error'">
      Error: {{ error?.message }}
    </p>

    <div v-else>
      <UTable
        :columns="cols"
        :rows="races || []"
        :row-key="(row: Race) => row.race_id"
        striped
        hoverable
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '#app'

const { data: races, status, error } = await useFetch<Race[]>('/api/races')

const cols = [
  {
    key: 'race_name',
    label: 'Race Name',
    sortable: true,
  },
  {
    id: 'description',
    key: 'description',
    label: 'Description',
  },
  {
    key: 'race_date',
    label: 'Date',
    sortable: true,
  },
  {
    key: 'map_link',
    label: 'Map Link',
  },
]
</script>
