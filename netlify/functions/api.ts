import serverless from 'serverless-http';
import app from '../../bootstrap.ts';

export const handler = serverless(app);