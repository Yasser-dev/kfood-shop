class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const name = this.queryString.name
      ? {
          name: {
            $regex: this.queryString.name,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...name });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString };

    // removing fields from the query
    const fieldsToRemove = ["name", "limit", "page"];
    fieldsToRemove.forEach((field) => {
      delete queryCopy[field];
    });

    // filter price, rating, etc..
    let queryString = JSON.stringify(queryCopy);

    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;
