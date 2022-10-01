const path = require("path");
const fs = require("fs");
const { getBasePath } = require("../helpers/staticMethods");

const pathDb = getBasePath() + path.sep + "db" + path.sep + "dbRole.json";
let dbRole = [];
fs.readFile(pathDb, (err, data) => {
    if (err) {
        console.log(err);
        dbRole = null;
        return;
    }
    dbRole = JSON.parse(data);
    return;
});

const getById = (id) => {
    try {
        const model = dbRole.filter((mod) => {
            return mod.id == id;
        });

        if (model && model.length) {
            return model;
        }

        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getAll = () => {
    try {
        if (dbRole) return dbRole;

        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const create = (model) => {
    try {
        const idCurrent = dbRole.reduce((modPrev, modCurr) => {
            return modCurr.id;
        }, 0);
        model.id = idCurrent <= 0 ? 1 : idCurrent+1;

        const resultCreated = dbRole.push(model);

        fs.writeFile(pathDb, "", null, (err) => {
            if (err) throw err;
        });
        fs.writeFile(pathDb, JSON.stringify(dbRole), null, (err) => {
            if (err) throw err;
        });

        if (resultCreated > 0) {
            return model;
        }

        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const edit = (model) => {
    try {
        const modelExist = dbRole.filter((mod) => {
            return mod.id == model.id;
        });
        if (!modelExist || !modelExist.length) {
            return null;
        }

        const dbEdited = dbRole.map((mod) => {
            if (mod.id != model.id) return mod;
            else return model;
        });

        fs.writeFile(pathDb, "", null, (err) => {
            if (err) throw err;
        });

        fs.writeFile(pathDb, JSON.stringify(dbEdited), null, (err) => {
            if (err) throw err;
        });

        if (dbEdited) {
            return model;
        }

        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const remove = (id) => {
    try {
        const dbEdited = dbRole.filter((prod) => {
            return prod.id != id;
        });
        if (dbRole.length == dbEdited.length) {
            return false;
        }

        fs.writeFile(pathDb, "", null, (err) => {
            if (err) throw err;
        });

        fs.writeFile(pathDb, JSON.stringify(dbEdited), null, (err) => {
            if (err) throw err;
        });

        if (dbEdited) {
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
