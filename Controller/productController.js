const products = require("../model/productModel");

exports.postProduct = async (req, res) => {
    try {
        let newProduct = await products.create(req.body);

        res.status(201).json({
            status: "success",
            newProduct
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            err
        })
    }
}

exports.getProducts = async (req, res) => {
    try {

        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit'];
        excludeFields.forEach(el => delete queryObj[el]);

        // Advance Filtering done for search and category

        let query;
        if (queryObj.q !== undefined) {
            let temp = queryObj.q;
            delete queryObj.q;

            let queryStr = JSON.stringify(queryObj);

            queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

            query = products.find({ $and: [{ name: { $regex: `${temp}`, $options: 'i' } }, JSON.parse(queryStr)] });
        } else {
            let queryStr = JSON.stringify(queryObj);

            queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

            query = products.find(JSON.parse(queryStr))
        }

        // Sorting based on Date
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }

        query = query.select('-__v');

        // Pagination
        const page = req.query.page * 1;
        const limit = req.query.limit * 1;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        const getProducts = await query;

        res.status(200).json({
            status: "success",
            results: getProducts.length,
            getProducts
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: "fail",
            err
        })
    }
}

exports.buyProducts = async (req, res) => {
    try {
        await products.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "success",
            message: "Product deleted successfully"
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            err
        })
    }
}