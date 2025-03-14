import { z } from 'zod'

export const RaceSchema = z.object({
  race_id: z.number().int().positive(),
  race_name: z.string().max(150),
  description: z.string().nullable().optional(),
  race_date: z.string(),
  map_link: z.string().nullable().optional(),
})

export type Race = z.infer<typeof RaceSchema>

export const RunnerSchema = z.object({
  runner_id: z.number().int().positive(),
  first_name: z.string().max(100),
  last_name: z.string().max(100),
  club: z.string().nullable().optional(),
  gender: z.enum(['M', 'F']),
  year_of_birth: z
    .number()
    .int()
    .gte(1900)
    .lte(2100),
})

export type Runner = z.infer<typeof RunnerSchema>

export const ResultSchema = z.object({
  result_id: z.number().int().positive(),
  race_id: z.number().int().positive(),
  runner_id: z.number().int().positive(),
  category: z.string().max(50).nullable().optional(),
  start_number: z.number().int().nullable().optional(),
  achieved_time: z.string().nullable().optional(),
  position_total: z.number().int().nullable().optional(),
  position_in_category: z.number().int().nullable().optional(),
})

export type Result = z.infer<typeof ResultSchema>
