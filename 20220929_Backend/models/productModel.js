const path = require("path");
const fs = require("fs");
const { getBasePath } = require("../helpers/staticMethods");

const pathDb = getBasePath() + path.sep + "db" + path.sep + "dbProduct.json";
let dbProducts = [];
fs.readFile(pathDb, (err, data) => {
    if (err) {
        dbProducts = null;
        return;
    }

    dbProducts = JSON.parse(data);
    return;
});

const getById = (id) => {
    try {
        const product = dbProducts.filter((prod) => {
            return prod.id == id;
        });

        if (product && product.length) {
            return product;
        }

        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getAll = () => {
    try {
        if (dbProducts) return dbProducts;

        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const create = (product) => {
    try {
        product.id = dbProducts.length + 1;

        const resultCreated = dbProducts.push(product);

        fs.writeFile(pathDb, "", null, (err) => {
            if (err) throw err;
        });
        fs.writeFile(pathDb, JSON.stringify(dbProducts), null, (err) => {
            if (err) throw err;
        });

        if (resultCreated > 0) {
            return product;
        }

        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const edit = (product) => {
    try {
        const prodExist = dbProducts.filter((prod) => {
            return prod.id == product.id;
        });
        if (!prodExist || !prodExist.length) {
            return null;
        }

        const dbProductsEdited = dbProducts.map((prod) => {
            if (prod.id != product.id) return prod;
            else return product;
        });

        fs.writeFile(pathDb, "", null, (err) => {
            if (err) throw err;
        });

        fs.writeFile(pathDb, JSON.stringify(dbProductsEdited), null, (err) => {
            if (err) throw err;
        });

        if (dbProductsEdited) {
            return product;
        }

        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const remove = (id) => {
    try {
        const dbProductsEdited = dbProducts.filter((prod) => {
            return prod.id != id;
        })
        if (dbProducts.length == dbProductsEdited){
            return false;
        }

        fs.writeFile(pathDb, "", null, (err) => {
            if (err) throw err;
        });

        fs.writeFile(pathDb, JSON.stringify(dbProductsEdited), null, (err) => {
            if (err) throw err;
        });

        if (dbProductsEdited) {
            return true;
        }

        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
};

module.exports = {
    getById,
    getAll,
    create,
    edit,
    remove,
};
