export const port = process.env.port || 3001;

export const db = {
  uri: 'mongodb://localhost:27017/hcstech',
  options: {},
  debug: true,
};

export const useMocks = true;

export const expiration = 60; // days

export const jwtsecret = '2a7bcb02df6944a9b2378da723990ca0';

export default {
  port,
  db,
  useMocks,
  jwtsecret,
};
