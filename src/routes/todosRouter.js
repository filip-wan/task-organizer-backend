import { Todo } from '../db/models/Todo.js';
import { secured } from './secured.js';

const todosRouter = (router) => {
  router.get('/todos', secured, async (req, res) => {
    console.log('GET from', req.user);
    const todos = await Todo.find({ user: req.user._id });
    res.send(todos);
  });

  router.put('/todos/:id', secured, async (req, res) => {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      {
        new: true,
      }
    );
    res.send(todo);
  });

  router.post('/todos', secured, async (req, res) => {
    const todo = new Todo({ ...req.body, user: req.user._id });
    await todo.save();
    res.send(todo);
  });

  router.delete('/todos/:id', secured, async (req, res) => {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    res.send(todo);
  });
};

export default todosRouter;
