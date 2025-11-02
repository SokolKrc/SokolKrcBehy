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
        :data="races"
        :row-key="(row: Race) => row.race_id"
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

type RaceTableData = {
  row: Row<Race>
}

const { data: races, status, error } = await useAsyncData<Race[]>(() => $fetch('/api/races/all'))

const cols = [
  {
    accessorKey: 'race_id',
    header: '#',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    },
    cell: ({ row }: RaceTableData) => `#${row.getValue('race_id')}`,
    sortable: true,
  },
  {
    accessorKey: 'race_name',
    header: 'Name',
    meta: {
      class: {
        th: 'text-left',
        td: 'text-left'
      }
    },
    cell: ({ row }: RaceTableData) => `${row.getValue('race_name')}`,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }: RaceTableData) => `${row.getValue('description')}`,
  },
  {
    accessorKey: 'race_date',
    header: 'Date',
    cell: ({ row }: RaceTableData) => {
      return ignisDate(row.getValue('race_date'), 'dd.MM.yyyy')
    },
    sortable: true,
  },
  {
    accessorKey: 'map_link',
    header: 'Map Link',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    },
    cell: ({ row }: RaceTableData) =>  { 
      return h(
        'a',
        { 
          href: `${row.getValue('map_link')}`,
        },
        '🗺️'
      )
    },
  },
]
</script>
