<template>
  <div>
    <section id="runners">
      <p v-if="status === 'pending'">
        Načítání běžců…
      </p>

      <p v-else-if="status === 'error'">
        Chyba: {{ error?.message }}
      </p>

      <div v-else>
        <UTable
          :columns="cols"
          :data="runners"
          :row-key="(row: Runner) => row.runner_id"
          striped
          hoverable
        >
          <template #name-cell="{ row }">
            <NuxtLink :to="`/results/runner/${row.original.runner_id}`" :class="LINK">
              {{ row.getValue('name') }}
            </NuxtLink>
          </template>
          <template #results-cell="{ row }">
            <NuxtLink :to="`/results/runner/${row.original.runner_id}`" :class="SILENT_LINK">
              📋
            </NuxtLink>
          </template>
        </UTable>
      </div>
    </section>

    <BackLink backlink="/" label="Zpět na hlavní stránku" />
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
    header: 'Běžec',
    meta: {
      class: {
        td: 'text-left',
      },
    },
    accessorFn: (row: Runner) => `${row.first_name} ${row.last_name}`,
  },
  {
    accessorKey: 'club',
    header: 'Oddíl',
    meta: {
      class: {
        td: 'text-left',
      },
    },
    sortable: true,
  },
  {
    accessorKey: 'gender',
    header: 'M/Ž',
    meta: {
      class: {
        th: 'text-center',
      },
    },
    cell: ({ row }: RunnerTableData) => `${row.getValue('gender') === 'M' ? 'M' : 'Ž'}`,
    sortable: true,
  },
  {
    accessorKey: 'year_of_birth',
    header: 'Ročník',
    meta: {
      class: {
        th: 'text-center',
      },
    },
    sortable: true,
  },
  {
    accessorKey: 'results',
    header: 'Výsledky',
    meta: {
      class: {
        th: 'text-center',
      },
    },
  },
]
</script>
