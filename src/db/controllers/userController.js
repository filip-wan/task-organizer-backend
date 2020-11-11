import { User } from '../models/User.js';

export const getUser = (callback, limit) => User.find(callback).limit(limit);
