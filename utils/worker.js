const { getAllUsersWithSameCityAndBloodType } = require("../services/user");
const myQueue = require("./jobQueue");
const sendEmail = require('./sendEmail')
const dotenv = require('dotenv')
dotenv.config()
myQueue.process(async (job) => {


    switch (job.data.type) {
        case 'sendEmailsForALLUsersThatHaveTheSameCityAndBloodType':

            const users = await getAllUsersWithSameCityAndBloodType(job.data.data.address, job.data.data.bloodType);
            const requestUrl = process.env.BASE_URL + `/blood-request/${job.data.data.requestId}`

            for (const user of users) {
                const options = {
                    "email": user.email,
                    "subject": `${job.data.data.requesterName} need a blood donation`,
                    "message": `Hello ${user.firstName} ${user.lastName} , Hope you are doing well ,
                    ${job.data.data.requesterName} need a blood donation 
                    
                    see the request here ${requestUrl} `
                }

                await sendEmail(options);
            }
            break;

        case 'sendEmail':


            await sendEmail(job.data.data.options);
        default:
            console.log('Unknown job type');
    }
});
