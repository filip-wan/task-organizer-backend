import { TimeTable } from '../db/models/TimeTable.js';
import { secured } from './secured.js';
import { google } from 'googleapis';
const { OAuth2 } = google.auth;

const timeTableRouter = (router) => {
  router.get('/timeTables', secured, async (req, res) => {
    console.log('GET from', req.user);
    const timeTables = await TimeTable.find({ user: req.user.id });
    res.send(timeTables);
  });

  router.get('/calendar/events', secured, async (req, res) => {
    if (req.user?.userData?.google) {
      const {
        _accessToken: access_token,
        _refreshToken: refresh_token,
      } = req.user?.credentials;
      const oauth2Client = new OAuth2();
      oauth2Client.credentials = {
        access_token,
        refresh_token,
      };
      const calendar = google.calendar({ version: 'v3' });

      calendar.events.list(
        {
          auth: oauth2Client,
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: 'startTime',
        },
        (err, response) => (err ? res.send(err) : res.send(response.data.items))
      );
    }
  });

  router.put('/timeTables/:id', secured, async (req, res) => {
    const timeTable = await TimeTable.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      {
        new: true,
      }
    );
    res.send(timeTable);
  });

  router.post('/timeTables', secured, async (req, res) => {
    const timeTable = new TimeTable({ ...req.body, user: req.user.id });
    await timeTable.save();
    res.send(timeTable);
  });

  router.delete('/timeTables/:id', secured, async (req, res) => {
    const timeTable = await TimeTable.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    res.send(timeTable);
  });
};

export default timeTableRouter;
