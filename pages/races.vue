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
        :rows="races"
        :row-key="(row: Race) => row.race_id"
        striped
        hoverable
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '#app'
import type { Row } from '@tanstack/table-core'

type RaceTableData = {
  row: Row<Race>
}

const { data: races, status, error } = await useFetch<Race[]>('/api/races')

const cols = [
  {
    accessorKey: 'race_id',
    header: '#',
    cell: ({ row }: RaceTableData) => `#${row.getValue('race_id')}`,
    sortable: true,
  },
  {
    accessorKey: 'race_name',
    header: 'Name',
    cell: ({ row }: RaceTableData) => `#${row.getValue('race_name')}`,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }: RaceTableData) => `#${row.getValue('description')}`,
  },
  {
    accessorKey: 'race_date',
    header: 'Date',
    cell: ({ row }: RaceTableData) => `#${row.getValue('race_date')}`,
    sortable: true,
  },
  {
    accessorKey: 'map_link',
    header: 'Map Link',
    cell: ({ row }: RaceTableData) => `#${row.getValue('map_link')}`,
  },
]
</script>
