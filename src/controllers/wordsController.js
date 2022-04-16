import Word from '../models/word';

export default {
    async findOne(req, res, next) {
        const word = await Word.findOne({ slug: req.params.slug });
        if (!word) return next();
        return res.status(200).send({ data: word });
    },

    async findAll(req, res) {
        const sort_by = {};
        sort_by[req.query.sort || 'slug'] =
            req.query.order?.toLowerCase() || 'asc';

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
        res.set('X-Total-Count', parseInt(words?.info.count, 10));
        return words?.data.length
            ? res.status(200).send(words)
            : res.status(200).send({ data: [] });
    },

    async create(req, res) {
        const findWord = await Word.findOne({
            polishWord: req.body.polishWord,
        });

        if (findWord) {
            return res.status(400).send({
                message: 'Word already exists',
            });
        }

        const word = await Word.create({
            polishWord: req.body.polishWord,
            definition: req.body.definition,
            synonyms: req.body.synonyms,
        });

        return res
            .status(201)
            .send({ data: word, message: 'Word was created' });
    },

    async update(req, res, next) {
        const findWord = await Word.findOne({
            polishWord: req.body.polishWord,
        });

        if (findWord) {
            return res.status(400).send({
                message: 'Word already exists',
            });
        }

        const word = await Word.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            {
                new: true,
            }
        );
        if (!word) return next();

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

    async alphabet(req, res, next) {
        const foundLetters = await Word.find({});
        const letters = foundLetters.reduce((acc, curr) => {
            return acc.includes(curr.polishWord[0].toLowerCase())
                ? acc
                : [...acc, curr.polishWord[0].toLowerCase()];
        }, []);
        return res.status(200).send(letters.sort());
    },
};
