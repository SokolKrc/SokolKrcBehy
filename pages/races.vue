<template>
    <div>
      <!-- Loading indicator -->
      <p v-if="pending">Loading races…</p>
  
      <!-- Error message -->
      <p v-else-if="error">Error: {{ error.message }}</p>
  
      <!-- Display table when data is available -->
      <div v-else>
        <UTable
          :cols="cols"
          :rows="races"
          :row-key="(row) => row.race_id"
          striped
          hoverable
        >
          <!-- Optional: Custom cell for map_link column -->
          <template #cell-map_link="{ row }">
            <div v-if="row.map_link">
              <a
                :href="row.map_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Map
              </a>
            </div>
            <div v-else>
              —
            </div>
          </template>
        </UTable>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useFetch } from '#app'
  
  /** 
   * Fetch data from the server endpoint /api/races 
   * (Adjust the path if yours differs).
   */
  const { data: races, pending, error } = await useFetch('/api/races')
  
  /**
   * Define the columns for UTable.
   * Keys must match the property names in each row object
   * (e.g. "race_name", "description", etc.).
   */
  const cols = [
    {
      key: 'race_name',
      label: 'Race Name',
      sortable: true
    },
    {
      key: 'description',
      label: 'Description'
    },
    {
      key: 'race_date',
      label: 'Date',
      sortable: true
    },
    {
      key: 'map_link',
      label: 'Map Link'
    }
  ]
  </script>