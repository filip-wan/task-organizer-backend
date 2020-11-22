import { Note } from '../db/models/Note.js';
import { secured } from './secured.js';

const notesRouter = (router) => {
  router.get('/notes', secured, async (req, res) => {
    console.log('GET from', req.user);
    const notes = await Note.find({ user: req.user._id });
    res.send(notes);
  });

  router.put('/notes/:id', secured, async (req, res) => {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      {
        new: true,
      }
    );
    res.send(note);
  });

  router.post('/notes', secured, async (req, res) => {
    const note = new Note({ ...req.body, user: req.user._id });
    await note.save();
    res.send(note);
  });

  router.delete('/notes/:id', secured, async (req, res) => {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    res.send(note);
  });
};

export default notesRouter;
