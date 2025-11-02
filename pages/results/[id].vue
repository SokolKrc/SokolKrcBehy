<template>
  <section id="race">
    <p v-if="pendingRace">
      Loading race details…
    </p>

    <p v-else-if="errorRace">
      Error: {{ errorRace.message }}
    </p>

    <p v-else-if="race?.[0]">
      <strong>{{ race[0].race_name }}</strong> ({{ ignisDate(new Date(race?.[0]?.race_date), 'dd.MM.yyyy') }})
    </p>
  </section>

  <section id="results">
    <p v-if="pendingResults">
      Loading results…
    </p>

    <p v-else-if="errorResults">
      Error: {{ errorResults.message }}
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
  </section>

  ←
  <NuxtLink to="/races" :class="LINK">
    Zpět na seznam závodů
  </NuxtLink>

</template>

<script setup lang="ts">
import type { Row } from '@tanstack/table-core'

type ResultsTableData = {
  row: Row<Result>
}

const route = useRoute()
const raceId = route.params.id

const { data: results, pending: pendingResults, error: errorResults } = await useAsyncData<Result[]>(() => $fetch(`/api/results/${raceId}`))
const { data: race, pending: pendingRace, error: errorRace } = await useAsyncData<Race[]>(() => $fetch(`/api/races/${raceId}`))

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
