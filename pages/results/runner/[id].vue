<template>
  <section id="race">
    <p v-if="pendingRace">
      Loading race details…
    </p>

    <p v-else-if="errorRace">
      Error: {{ errorRace.message }}
    </p>

    <p v-else-if="runner?.[0]">
      <strong>{{ `${runner[0].first_name} ${runner[0]?.last_name}` }}</strong>
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
      >
        <template #race_name-cell="{ row }">
          <NuxtLink :to="`/results/race/${row.original.race_id}`" :class="LINK">
            {{ row.getValue('race_name') }}
          </NuxtLink>
        </template>
      </UTable>
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
const runnerId = route.params.id

const { data: results, pending: pendingResults, error: errorResults } = await useAsyncData<Result[]>(() => $fetch(`/api/results/runner/${runnerId}`))
const { data: runner, pending: pendingRace, error: errorRace } = await useAsyncData<Runner[]>(() => $fetch(`/api/runners/${runnerId}`))

const cols = [
  {
    accessorKey: 'race_date',
    header: 'Date',
    cell: ({ row }: ResultsTableData) => {
      return ignisDate(row.getValue('race_date'), 'dd.MM.yyyy')
    },
  },
  {
    accessorKey: 'race_name',
    header: 'Race',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    },
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
]
</script>
