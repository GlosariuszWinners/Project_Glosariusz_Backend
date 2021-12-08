import { Router } from 'express';
import wordsController from '../controllers/wordsController';
import { catchAsync } from '../middlewares/errors';

export default () => {
	const api = Router();

	// GET /words/:slug
	api.get('/:slug', catchAsync(wordsController.findOne));

	// GET /words
	api.get('/', catchAsync(wordsController.findAll));

	// POST /words
	api.post('/', catchAsync(wordsController.create));

	// PUT /words/:slug
	api.put('/:slug', catchAsync(wordsController.update));

	// DELETE /words/:slug
	api.delete('/:slug', catchAsync(wordsController.remove));

	return api;
};
