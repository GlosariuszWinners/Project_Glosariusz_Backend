import { Router } from 'express';
import panelWordsController from '../controllers/panelWordsController';
import jwtAuth from '../middlewares/auth';
import { catchAsync } from '../middlewares/errors';
import getFilters from '../middlewares/filters/words';

export default () => {
    const api = Router();

    // GET /panel/words/:id
    api.get('/:id', jwtAuth, catchAsync(panelWordsController.findOne));

    // GET /panel/words
    api.get('/', jwtAuth, getFilters, catchAsync(panelWordsController.findAll));

    // POST /panel/words
    api.post('/', jwtAuth, catchAsync(panelWordsController.create));

    // PUT /panel/words/:id
    api.put('/:id', jwtAuth, catchAsync(panelWordsController.update));

    // DELETE /panel/words/:id
    api.delete('/:id', jwtAuth, catchAsync(panelWordsController.remove));

    return api;
};
