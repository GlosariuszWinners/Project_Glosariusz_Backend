import _ from 'lodash';
import qs from 'qs';
import Word from '../../models/word';

export default function getFilters(req, res, next) {
    const availableFilters = Object.keys(Word.schema.paths);
    const allFilters = qs.parse(req.query);

    const filters = _.pick(allFilters, availableFilters);

    const schemaFilters = _.mapValues(
        filters,
        (value, key) => new RegExp(`^${value}`, 'gi')
    );

    req.filters = { ...schemaFilters };
    next();
}
