import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

// log: ['query'] - loga todas as queries no console, no ambiente de desenvolvimento
export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
