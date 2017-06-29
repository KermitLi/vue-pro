/* eslint-disable camelcase */
const Sequelize = require('sequelize')
const fs = require('fs')
const join = require('path').join

module.exports = (db_configs) => {
    // Object to Array
    if (!(db_configs instanceof Array)) {
        db_configs = [db_configs]
    }

    const databases = orm(db_configs)

    function db (name) {
        const first = db_configs[0]
        // Default is first database
        name = name || first.name || first.db || first.database
        return databases[name]
    }

    function mw (ctx, next) {
        if (ctx.orm) return next()
        ctx.orm = db
        return next()
    }

    return mw
}

function orm (db_configs) {
    const databases = {}
    db_configs.forEach(cfg => {
        const db = cfg.db || cfg.database
        const name = cfg.name || db
        const opts = cfg.options || cfg
        const sequelize = new Sequelize(db, cfg.username, cfg.password, opts)

        // object for exports
        const database = {
            sequelize: sequelize,
            sync: sequelize.sync.bind(sequelize)
        }

        // init models
        cfg.modelPath && Object.assign(database, models(sequelize, cfg.modelPath))

        databases[name] = database
    })

    return databases
}

function models (sequelize, modelPath) {
    const models = {}
    // Bootstrap models
    fs.readdirSync(modelPath)
        .forEach(function (file) {
            if (/\.js$/.test(file)) {
                const model = sequelize.import(join(modelPath, file))
                models[model.name] = model
            }
        })

    Object.keys(models).forEach(function (modelName) {
        if (models[modelName].associate) {
            models[modelName].associate(models)
        }
    })
    return models
}
