<template>
  <div>
    <p v-if="pending">
      Loading results…
    </p>

    <p v-else-if="error">
      Error: {{ error.message }}
    </p>

    <div v-else>
      <UTable
        :columns="cols"
        :data="results"
        :row-key="(row: { result_id: number }) => row.result_id"
        hoverable
        striped
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Row } from '@tanstack/table-core'

type ResultsTableData = {
  row: Row<Result>
}

const route = useRoute()
const raceId = route.params.id

const { data: results, pending, error } = await useAsyncData<Result[]>(() => $fetch(`/api/results/${raceId}`))

const cols = [
  {
    accessorKey: 'position_total',
    header: 'Pos (Overall)',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    },
    sortable: true,
  },
  {
    accessorKey: 'position_in_category',
    header: 'Pos (Category)',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    },
    sortable: true,
  },
  {
    accessorKey: 'name',
    header: 'Runner',
    accessorFn: (row: Result) => `${row.first_name} ${row.last_name}`
  },
  {
    accessorKey: 'category',
    header: 'Category',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    },
  },
  {
    accessorKey: 'start_number',
    header: 'Start #',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    },
  },
  {
    accessorKey: 'achieved_time',
    header: 'Time',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    },
    sortable: true,
  },
]
</script>
