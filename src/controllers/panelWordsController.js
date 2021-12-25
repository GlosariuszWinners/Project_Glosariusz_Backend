import Word from '../models/word';

export default {
    async findAll(req, res) {
        const sort_by = {};
        sort_by[req.query.sort_by || 'slug'] = req.query.order_by || 'asc';

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;
        const skip = (page - 1) * limit || 0;

        const words = await Word.paginate({
            req,
            sort_by,
            page,
            limit,
            skip,
        });
        res.set('Access-Control-Expose-Headers', 'X-Total-Count');
        res.set('X-Total-Count', parseInt(words?.info?.count));
        return words?.data.length
            ? res.status(200).send(words?.data)
            : res.status(404).send({ error: 'There is nothing here' });
    },

    async create(req, res) {
        const word = await Word.create({
            polishWord: req.body.polishWord,
            definition: req.body.definition,
            synonyms: req.body.synonyms,
            reference: req.body.reference,
        });
        const response = {
            id: word._id,
        };
        return res.status(201).send(response);
    },

    async update(req, res, next) {
        const word = await Word.findOne({ slug: req.params.slug });
        if (!word) return next();

        word.polishWord = req.body.polishWord;
        word.definition = req.body.definition;
        word.synonyms = req.body.synonyms;
        word.reference = req.body.reference;
        await word.save();

        return res
            .status(200)
            .send({ data: word, message: 'Word was updated' });
    },

    async remove(req, res, next) {
        const word = await Word.findOne({ slug: req.params.slug });
        if (!word) return next();
        await word.remove();

        return res.status(200).send({ message: 'Word was removed' });
    },
};