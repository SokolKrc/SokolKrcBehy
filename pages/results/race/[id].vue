<template>
  <div>
    <section id="race">
      <p v-if="pendingRace">
        Načítání detailů závodu…
      </p>

      <p v-else-if="errorRace">
        Chyba:{{ errorRace.message }}
      </p>

      <p v-else-if="race?.[0]">
        <strong>{{ race[0].race_name }}</strong> ({{ ignisDate(new Date(race?.[0]?.race_date), 'dd.MM.yyyy') }})
      </p>
    </section>

    <section id="results">
      <p v-if="pendingResults">
        Načítání výsledků…
      </p>

      <p v-else-if="errorResults">
        Chyba:{{ errorResults.message }}
      </p>

      <div v-else>
        <UTable
          :columns="cols"
          :data="results"
          :row-key="(row: { result_id: number }) => row.result_id"
          hoverable
          striped
          empty="Tento závod nikdo neběžel :("
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
  row: Row<RaceResult>
}

const route = useRoute()
const raceId = route.params.id

const { data: results, pending: pendingResults, error: errorResults } = useFetch<RaceResult[]>(`/api/results/race/${raceId}`)
const { data: race, pending: pendingRace, error: errorRace } = useFetch<Race[]>(`/api/races/${raceId}`)

const cols = [
  {
    accessorKey: 'position_total',
    header: 'Celkem',
    meta: {
      class: {
        th: 'text-center',
      },
    },
    cell: ({ row }: ResultsTableData) => `${row.getValue('position_total')}.`,
    sortable: true,
  },
  {
    accessorKey: 'position_in_category',
    header: 'Kategorie',
    meta: {
      class: {
        th: 'text-center',
      },
    },
    cell: ({ row }: ResultsTableData) => `${row.getValue('position_in_category')}.`,
    sortable: true,
  },
  {
    accessorKey: 'start_number',
    header: 'Číslo',
    meta: {
      class: {
        th: 'text-center',
      },
    },
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
