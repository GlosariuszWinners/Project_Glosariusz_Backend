import Word from '../models/word';

export default {
	async findOne(req, res, next) {
		const word = await Word.findOne({ slug: req.params.slug });
		if (!word) return next();
		return res.status(200).send({ data: word });
	},

	async findAll(req, res) {
		const offset = parseInt(req.query.offset) || 0;
		const per_page = parseInt(req.query.per_page) || 2;
		const wordsPromise = Word.find().skip(offset).limit(per_page);

		const countPromise = Word.count();
		const [words, count] = await Promise.all([wordsPromise, countPromise]);

		return res.status(200).send({ data: words, count });
	},

	async create(req, res) {
		const word = await Word.create({
			polishWord: req.body.polishWord,
			definition: req.body.definition,
			synonyms: req.body.synonyms,
			reference: req.body.reference,
		});

		return res.status(201).send({ data: word, message: 'Word was created' });
	},

	async update(req, res, next) {
		const word = await Word.findOne({ slug: req.params.slug });
		if (!word) return next();

		word.polishWord = req.body.polishWord;
		word.definition = req.body.definition;
		word.synonyms = req.body.synonyms;
		word.reference = req.body.reference;
		await word.save();

		return res.status(200).send({ data: word, message: 'Word was updated' });
	},

	async remove(req, res, next) {
		const word = await Word.findOne({ slug: req.params.slug });
		if (!word) return next();
		await word.remove();

		return res.status(200).send({ message: 'Word was removed' });
	},
};
