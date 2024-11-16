import { CronJob } from 'cron'

import logger from './logger'

const startAllCronJobs = async (): Promise<void> => {
  const cronjob = new CronJob('*/10 * * * * *', async (): Promise<void> => {})

  cronjob.start()
  return
}

export default {
  startAllCronJobs
}
