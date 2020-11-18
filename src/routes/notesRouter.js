import passport from 'passport';
import cors from 'cors';
import { Note } from '../db/models/Note.js';

const notesAuthorization = (router) => {
  router.get('/notes', cors(), async (req, res) => {
    const movies = await Note.find();
    res.send(movies);
  });

  router.put('/notes/:id', cors(), async (req, res) => {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(note);
  });

  router.post('/notes', cors(), async (req, res) => {
    const note = new Note({ ...req.body });
    await note.save();
    res.send(note);
  });

  router.delete('/notes/:id', cors(), async (req, res) => {
    const note = await Note.findByIdAndDelete(req.params.id);
    res.send(note);
  });
};

export default notesAuthorization;
