<template>
  <div>
    <p v-if="status === 'pending'">
      Loading runners…
    </p>

    <p v-else-if="status === 'error'">
      Error: {{ error?.message }}
    </p>

    <div v-else>
      <UTable
        :columns="cols"
        :data="runners"
        :row-key="(row: Runner) => row.runner_id"
        striped
        hoverable
      >
      <template #race_name-cell="{ row }">
        <NuxtLink :to="`/results/${row.getValue('race_id')}`" :class="LINK">
          {{ row.getValue('race_name') }}
        </NuxtLink>
      </template>
      </UTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Row } from '@tanstack/table-core'

type RunnerTableData = {
  row: Row<Runner>
}

const { data: runners, status, error } = await useAsyncData<Runner[]>(() => $fetch('/api/runners/all'))

const cols = [
  {
    accessorKey: 'name',
    header: 'Runner',
    meta: {
      class: {
        th: 'text-left',
        td: 'text-left'
      }
    },
    accessorFn: (row: Result) => `${row.first_name} ${row.last_name}`
  },
  {
    accessorKey: 'club',
    header: 'Club',
    meta: {
      class: {
        th: 'text-left',
        td: 'text-left'
      }
    },
    // cell: ({ row }: RunnerTableData) => `${row.getValue('club')}`,
    sortable: true,
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    meta: {
      class: {
        th: 'text-center'
      }
    },
    // cell: ({ row }: RunnerTableData) => `${row.getValue('gender')}`,
    sortable: true,
  },
  {
    accessorKey: 'year_of_birth',
    header: 'Age',
    meta: {
      class: {
        th: 'text-center'
      }
    },
    // cell: ({ row }: RunnerTableData) => `${row.getValue('year_of_birth')}`,
    sortable: true,
  },
  {
    accessorKey: 'results',
    header: 'Results',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    },
    cell: ({ row }: RunnerTableData) =>  { 
      return h(
        'a',
        { 
          href: `/runners/${row.getValue('runner_id')}`,
        },
        '👁️‍🗨️'
      )
    },
  },
]
</script>
