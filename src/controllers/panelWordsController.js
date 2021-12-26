import Word from '../models/word';

export default {
    async findOne(req, res, next) {
        const word = await Word.findOne({ _id: req.params.id });
        if (!word) return next();
        const response = {
            id: word._id,
            polishWord: word.polishWord,
            definition: word.definition,
            synonyms: word.synonyms,
            reference: word.reference,
        };
        return res.status(200).send(response);
    },

    async findAll(req, res) {
        const sortBy = req.query?._sort === 'id' ? '_id' : req.query?._sort;
        const orderBy = req.query?._order.toLowerCase();
        const sortWithOrder = {};
        sortWithOrder[sortBy] = orderBy;
        const startPaginate = parseInt(req.query?._start, 10);
        const endPaginate = parseInt(req.query?._end, 10);
        const words = await Word.paginatePanel({
            req,
            sortWithOrder,
            startPaginate,
            endPaginate,
        });
        res.set('Access-Control-Expose-Headers', 'X-Total-Count');
        res.set('X-Total-Count', parseInt(words?.info?.count, 10));
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
        const update = {
            polishWord: req.body?.polishWord,
            synonyms: req.body?.synonyms,
            reference: req.body?.reference,
            definition: req.body?.definition,
        };
        const word = await Word.findByIdAndUpdate(req.params.id, update, {
            new: true,
        });
        if (!word) return next();

        const response = {
            id: word._id,
        };

        return res.status(200).send(response);
    },

    async remove(req, res, next) {
        const word = await Word.findOne({ _id: req.params.id });
        if (!word) return next();
        await word.remove();

        return res.status(200).send({ message: 'Word was removed' });
    },
};
