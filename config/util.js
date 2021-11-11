module.exports.escapeRegExpChars = (text) => text.toString().replace(/[-[\]{}()*+?.İ,\\^$|#\s]/g, '\\$&');
module.exports.sort = function(query) {
    const result = {};

    if (query) {
        const [ field, order ] = query.split(' ');
        if (field && order) {
            const direction = order === 'ASC' ? 1 : -1;
            result[field] = direction;
        }
    }

    return result;
};
module.exports.createQueryFromQueryParams = (queryParams) => {
    const {
        search = '',
        owner,
        category,
        created,
        createdPosition,
        updated,
        updatedPosition,
    } = queryParams;

    const searchFilter = {$regex: new RegExp(this.escapeRegExpChars(search), 'i')};

    const filtersField = {owner, category, created, updated};

    const filters = [];
    
    Object.keys(filtersField).filter(key => !!filtersField[key]).map(key => {
        if(key === 'created') {
            !!createdPosition 
                ? filters.push({createdAt: {[createdPosition]: new Date(filtersField[key])}}) 
                : filters.push({createdAt: {$gte: new Date(filtersField[key])}});
            
            return;
        }

        if(key === 'updated') {
            !!updatedPosition 
                ? filters.push({updatedAt: {[updatedPosition]: new Date(filtersField[key])}}) 
                : filters.push({updatedAt: {$gte: new Date(filtersField[key])}});
            
            return;
        }

        filters.push({[key]: filtersField[key]});
    });

    const searchQuery = {$or: [{title: searchFilter}, {subtitle: searchFilter}, {description: searchFilter}]};

    if(filters.length) {
        const filtersQuery = {$and: filters};
        return {$and: [searchQuery, filtersQuery]};
    }

    return searchQuery;
}
module.exports.getCurrentUrl = (req) => {
    let endpoint = req.originalUrl;
    if (!endpoint.endsWith('/')) {
      endpoint = req.originalUrl + '/'
    }
    return req.protocol + '://' + req.get('host') + endpoint;
}