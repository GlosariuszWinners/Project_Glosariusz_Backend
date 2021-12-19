import mongoPagination from 'mongo-cursor-pagination';
import mongoose from 'mongoose';
import URLSlugs from 'mongoose-url-slugs';

const Word = mongoose.Schema({
    polishWord: {
        type: String,
        required: true,
        trim: true,
    },
    definition: {
        type: String,
        trim: true,
    },
    synonyms: [
        { singularForm: String, pluralForm: String, pluralCountable: String },
    ],
    reference: Boolean,
});

Word.index({ polishWord: 'text' });

Word.plugin(
    URLSlugs('polishWord', { field: 'slug', update: true, separator: '-' })
);
Word.plugin(mongoPagination.mongoosePlugin);

export default mongoose.model('Word', Word);
