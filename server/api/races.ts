export default defineEventHandler(async (event) => {
    // Example data to simulate DB results:
    return [
      {
        race_id: 1,
        race_name: 'Spring Marathon',
        description: 'A scenic run through the countryside',
        race_date: '2025-04-10',
        map_link: 'https://example.com/map-spring-marathon'
      },
      {
        race_id: 2,
        race_name: 'City Night Run',
        description: 'A run through the city lights at night',
        race_date: '2025-06-05',
        map_link: 'https://example.com/map-city-night-run'
      }
    ]
  })