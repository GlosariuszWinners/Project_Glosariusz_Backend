import mongoose from 'mongoose';
import URLSlugs from 'mongoose-url-slugs';

const Word = mongoose.Schema({
    polishWord: {
        type: String,
        required: true,
        trim: true,
        searchable: true,
    },
    definition: {
        type: String,
        trim: true,
    },
    synonyms: [
        {
            singularForm: String,
            pluralCountable: String,
            pluralUncountable: String,
        },
    ],
    reference: Boolean,
});

// Word.index({ polishWord: 'text' });

Word.plugin(URLSlugs('polishWord', { field: 'slug', update: true }));

Word.statics.paginate = async function ({ req, sort_by, page, limit, skip }) {
    const words = await this.aggregate()
        .match(req.filters)
        .sort(sort_by)
        .facet({
            total: [{ $count: 'count' }],
            data: [
                {
                    $project: {
                        _id: 0,
                        slug: 1,
                        polishWord: 1,
                        definition: 1,
                        synonyms: 1,
                        reference: 1,
                    },
                },
            ],
        })
        .unwind('total')
        .project({
            info: {
                count: '$total.count',
                pages: {
                    $ceil: {
                        $divide: ['$total.count', limit],
                    },
                },
                next: {
                    $lt: [
                        {
                            $multiply: [limit, Number(page)],
                        },
                        '$total.count',
                    ],
                },
                previous: {
                    $gt: [
                        {
                            $subtract: [
                                {
                                    $multiply: [limit, Number(page)],
                                },
                                limit,
                            ],
                        },
                        0,
                    ],
                },
            },
            results: {
                $slice: [
                    '$data',
                    skip,
                    {
                        $ifNull: [limit, '$total.count'],
                    },
                ],
            },
        })
        .exec();

    if (words?.[0].info.next) {
        const url = new URL(
            `${req.protocol}://${req.get('host')}${req.originalUrl}`
        );
        url.searchParams.set('page', page + 1);
        words[0].info.next = url.toString();
    }
    if (words?.[0].info.previous) {
        const url = new URL(
            `${req.protocol}://${req.get('host')}${req.originalUrl}`
        );
        url.searchParams.set('page', page - 1);
        words[0].info.previous = url.toString();
    }

    return words[0];
};

export default mongoose.model('Word', Word);
