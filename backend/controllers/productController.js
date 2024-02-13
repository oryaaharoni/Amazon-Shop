import Product from "../models/Product.js";

const getProducts = async (req, res) => {

    const products = await Product.find();
    res.send(products);
};

const getProductById = async (req, res) => {

    const id = req.params.id;
    try {
        const product = await Product.findOne({ _id: id });
        res.send(product);
    }
    catch (error) {
        res.status(404).send({ message: "Product not found" });
    }
};

const getProductByToken = async (req, res) => {

    const { token } = req.params;
    try {
        const product = await Product.findOne({ token: token });
        res.send(product);
    }
    catch (error) {
        res.status(404).send({ message: "Product not found" });
    }
};

const getCategories = async (req, res) => {

    //- אני מקבלת את כל הקטגוריות שיש לפרודקט להכיל
    //מחזיר מערך של סטרינגים
    const categories = await Product.find().distinct('category');

    res.send(categories);
};

const getProductsBySearch = async (req, res) => {

    const { query } = req;
    const page = query.page || 1;
    const order = query.order || "";
    const category = query.category || "";
    const price = query.price || "";
    const rating = query.rating || "";

    const searchQuery = query.query || "";
    const pageSize = query.pageSize || 6;

    const queryFilter = searchQuery && searchQuery !== "all" ? {
        title: {
            $regex: searchQuery,
            $options: "i"
        }
    } : {};

    const categoryFilter = category && category !== "all" ? { category } : {};

    const priceFilter = price && price !== "all" ? {
        price: {
            $gte: Number(price.split("-"), [0]),
            $lte: Number(price.split("-"), [1]),
        }
    } : {};

    const ratingFilter = rating && rating !== "all" ? {
        "rating.rate": {
            $gte: Number(rating)
        }
    } : {};

    const sortOrderFilter = order === "lowest" ? { price: 1 } :
        order === "highest" ? { price: -1 } :
            order === "toprated" ? { rating: -1 } :
                order === "newest" ? { createdAt: -1 } :
                    { _id: -1 };

    const products = await Product.find({ ...queryFilter, ...categoryFilter, ...ratingFilter, ...priceFilter })
        .sort(sortOrderFilter).skip((page - 1) * pageSize).limit(pageSize);

    const countProduct = await Product.countDocuments({
        ...queryFilter, ...categoryFilter, ...ratingFilter, ...priceFilter
    });

    res.send({ products, countProduct, page, pages: Math.ceil(countProduct / pageSize) });
};

export { getProducts, getProductById, getProductByToken, getCategories, getProductsBySearch };