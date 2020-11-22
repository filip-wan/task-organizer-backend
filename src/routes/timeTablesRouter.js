import { TimeTable } from '../db/models/TimeTable.js';
import { secured } from './secured.js';

const timeTableRouter = (router) => {
  router.get('/timeTables', secured, async (req, res) => {
    console.log('GET from', req.user);
    const timeTables = await TimeTable.find({ user: req.user._id });
    res.send(timeTables);
  });

  router.put('/timeTables/:id', secured, async (req, res) => {
    const timeTable = await TimeTable.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      {
        new: true,
      }
    );
    res.send(timeTable);
  });

  router.post('/timeTables', secured, async (req, res) => {
    const timeTable = new TimeTable({ ...req.body, user: req.user._id });
    await timeTable.save();
    res.send(timeTable);
  });

  router.delete('/timeTables/:id', secured, async (req, res) => {
    const timeTable = await TimeTable.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    res.send(timeTable);
  });
};

export default timeTableRouter;
