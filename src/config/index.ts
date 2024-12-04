import { config } from 'dotenv';
config();

export const Config = {
  port: process.env.PORT,
  aws: {
    logGroupName: process.env.LOG_GROUP_NAME,
    logStreamName: process.env.LOG_STREAM_NAME,
    region: process.env.REGION,
  },
};
