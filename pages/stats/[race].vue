<template>
  <div>
    <section id="raceDetail">
      <p v-if="pendingStats">
        Načítání statistik…
      </p>

      <p v-else-if="errorStats">
        Chyba:{{ errorStats.message }}
      </p>

      <div v-else-if="stats" class="flex flex-col gap-4">
        <strong>{{ stats.raceDetail.race_name }}</strong>
        <div><strong>Ročníků:</strong> {{ stats.raceCount }}</div>
        <strong>NEJLEPŠÍ ČASY</strong>
      </div>
    </section>

    <section id="topResults">
      <p v-if="pendingStats">
        Načítání statistik…
      </p>

      <div v-else>
        <UTable
          :columns="cols"
          :data="stats?.topResults"
          :row-key="(row: { result_id: number }) => row.result_id"
          hoverable
          striped
        >
          <template #name-cell="{ row }">
            <NuxtLink :to="`/results/runner/${row.original.runner_id}`" :class="LINK">
              {{ `${row.original.first_name} ${row.original.last_name}` }}
            </NuxtLink>
          </template>
        </UTable>
      </div>
    </section>

    <BackLink backlink="/races" label="Zpět na seznam závodů" />
  </div>
</template>

<script setup lang="ts">
import type { Row } from '@tanstack/table-core'

type ResultsTableData = {
  row: Row<RaceTopResult>
}

type RaceStats = {
  raceDetail: Race
  raceCount: number
  topResults: RaceTopResult[]
}

const route = useRoute()
const raceSeries = route.params.race

const { data: stats, pending: pendingStats, error: errorStats } = useFetch<RaceStats>(`/api/stats/${raceSeries}`)

const cols = [
  {
    id: 'rowNumber',
    header: '#',
    cell: ({ row }: ResultsTableData) => `${row.index + 1}.`,
    meta: {
      class: {
        th: 'text-center w-10',
      },
    },
  },
  {
    accessorKey: 'race_date',
    header: 'Datum',
    cell: ({ row }: ResultsTableData) => {
      return ignisDate(row.getValue('race_date'), 'dd.MM.yyyy')
    },
    meta: {
      class: {
        th: 'text-center',
      },
    },
    sortable: true,
  },
  {
    accessorKey: 'name',
    header: 'Běžec',
    meta: {
      class: {
        td: 'text-left',
      },
    },
  },
  {
    accessorKey: 'category',
    header: 'Kategorie',
    meta: {
      class: {
        th: 'text-center',
      },
    },
  },
  {
    accessorKey: 'achieved_time',
    header: 'Čas',
    meta: {
      class: {
        th: 'text-center',
      },
    },
    sortable: true,
  },
]
</script>
