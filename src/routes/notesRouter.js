import passport from 'passport';
import cors from 'cors';
import { Note } from '../db/models/Note.js';

const notesAuthorization = (router) => {
  router.get('/notes', cors(), async (req, res) => {
    const movies = await Note.find();
    res.send(movies);
  });

  router.post('/notes', cors(), async (req, res) => {
    const note = new Note({ ...req.body });
    console.log(note, Note, Object.keys(req.body));
    await note.save();
    res.send(note);
  });
};

export default notesAuthorization;
