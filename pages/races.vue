<template>
  <div>
    <p v-if="status === 'pending'">
      Načítání závodů…
    </p>

    <p v-else-if="status === 'error'">
      Chyba: {{ error?.message }}
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
          <NuxtLink :to="`/results/race/${row.original.race_id}`" :class="LINK">
            {{ row.getValue('race_name') }}
          </NuxtLink>
        </template>
        <template #map_link-cell="{ row }">
          <NuxtLink v-if="row.original.map_link" :to="row.original.map_link" :class="SILENT_LINK" external>
            🗺️
          </NuxtLink>
        </template>
        <template #results-cell="{ row }">
          <NuxtLink :to="`/results/race/${row.original.race_id}`" :class="SILENT_LINK">
            📋
          </NuxtLink>
        </template>
      </UTable>
    </div>
  </div>
  
  <BackLink backlink="/" label="Zpět na hlavní stránku" />
</template>

<script setup lang="ts">
import type { Row } from '@tanstack/table-core'

type RaceTableData = {
  row: Row<Race>
}

const { data: races, status, error } = await useAsyncData<Race[]>(() => $fetch('/api/races/all'))

const cols = [
  {
    accessorKey: 'race_name',
    header: 'Závod',
    meta: {
      class: {
        td: 'text-left'
      }
    },
    cell: ({ row }: RaceTableData) => `${row.getValue('race_name')}`,
  },
  {
    accessorKey: 'description',
    header: 'Popis',
    meta: {
      class: {
        td: 'text-left'
      }
    },
    cell: ({ row }: RaceTableData) => `${row.getValue('description')}`,
  },
  {
    accessorKey: 'race_date',
    header: 'Datum',
    cell: ({ row }: RaceTableData) => {
      return ignisDate(row.getValue('race_date'), 'dd.MM.yyyy')
    },
    meta: {
      class: {
        th: 'text-center',
      }
    },
    sortable: true,
  },
  {
    accessorKey: 'map_link',
    header: 'Mapa trasy',
    meta: {
      class: {
        th: 'text-center',
      }
    },
  },
  {
    accessorKey: 'results',
    header: 'Výsledky',
    meta: {
      class: {
        th: 'text-center',
      }
    },
  },
]
</script>
