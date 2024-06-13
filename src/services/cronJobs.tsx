import cron from "node-cron"

const databaseCronJob = async (cronExpression: string) => {

    cron.schedule(cronExpression, async () => {

    })

};
