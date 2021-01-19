import { getUser } from './controllers/userController.js';
import mongoose from 'mongoose';
import { runNotifications } from '../utils/cronNotifier.js';

const initializeDatabase = () => {
  const dbPath = process.env.DATABASE_URL;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  const mongo = mongoose.connect(dbPath, options);

  mongo.then(
    () => {
      console.log('connected to mongo db');
      runNotifications().catch((e) => console.log(e));
    },
    (error) => {
      console.log(error, 'mongo error');
    }
  );
};

export default initializeDatabase;
