import { Category } from '../db/models/Category.js';
import { secured } from './secured.js';

const categoriesRouter = (router) => {
  router.get('/categories', secured, async (req, res) => {
    console.log('GET from', req.user);
    const categories = await Category.find({ user: req.user.id });
    res.send(categories);
  });

  router.put('/categories/:id', secured, async (req, res) => {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      {
        new: true,
      }
    );
    res.send(category);
  });

  router.post('/categories', secured, async (req, res) => {
    const category = new Category({ ...req.body, user: req.user.id });
    await category.save();
    res.send(category);
  });

  router.delete('/categories/:id', secured, async (req, res) => {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    res.send(category);
  });
};

export default categoriesRouter;
