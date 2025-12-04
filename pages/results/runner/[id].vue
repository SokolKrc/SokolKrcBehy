<template>
  <div>
    <section id="race">
      <p v-if="pendingRunner">
        Načítání detailu běžce…
      </p>

      <p v-else-if="errorRunner">
        Chyba:{{ errorRunner.message }}
      </p>

      <p v-else-if="runner?.[0]">
        <strong>{{ `${runner[0].first_name} ${runner[0]?.last_name}` }}</strong>
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
        >
          <template #race_name-cell="{ row }">
            <NuxtLink :to="`/results/race/${row.original.race_id}`" :class="LINK">
              {{ row.getValue('race_name') }}
            </NuxtLink>
          </template>
        </UTable>
      </div>
    </section>

    <BackLink backlink="/runners" label="Zpět na přehled běžců" />
  </div>
</template>

<script setup lang="ts">
import type { Row } from '@tanstack/table-core'

type ResultsTableData = {
  row: Row<Result>
}

const route = useRoute()
const runnerId = route.params.id

const { data: results, pending: pendingResults, error: errorResults } = await useAsyncData<Result[]>(() => $fetch(`/api/results/runner/${runnerId}`))
const { data: runner, pending: pendingRunner, error: errorRunner } = await useAsyncData<Runner[]>(() => $fetch(`/api/runners/${runnerId}`))

const cols = [
  {
    accessorKey: 'race_date',
    header: 'Datum',
    meta: {
      class: {
        th: 'text-center',
      },
    },
    cell: ({ row }: ResultsTableData) => {
      return ignisDate(row.getValue('race_date'), 'dd.MM.yyyy')
    },
  },
  {
    accessorKey: 'race_name',
    header: 'Závod',
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
    accessorKey: 'start_number',
    header: 'Číslo',
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
]
</script>
