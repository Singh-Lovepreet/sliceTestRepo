const Sequelize = require('sequelize');
const {psqlConfig: {user, host, database, password, port}} = require('config');

const sqInstance = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  pool: {
    // max: 5,
    // min: 0,
    // idle: 10000
  },
});


// const wordsModel = sqInstance.define('words', {});

class PgBaseRepo {
  constructor(client) {
    // this.model = model;
    this.client = client;
    this.showLog = true;
  }

  async find({query, variables, options = {}}) {
    const tBeforeQuery = Date.now();
    let results = await this.client.query(query, {
      raw: true,
      type: Sequelize.QueryTypes.SELECT,
      replacements: {...variables},
      ...options,
    });


    const tAfterQuery = Date.now();
    if (this.showLog) {
      console.log(`Time taken for query `, (tAfterQuery - tBeforeQuery), 'ms');
    }
    return results;
  }

  async insert({query, variables, options}) {
    return this.client.query(query, {
      raw: true,
      type: Sequelize.QueryTypes.UPDATE,
      replacements: {...variables},
      ...options
    });
  }

  async createTable({query, variables, options}) {
    return this.client.query(query, {
      raw: true,
      type: Sequelize.QueryTypes.UPDATE,
      replacements: {...variables},
      ...options
    });
  }

  async update({query, variables, options}) {
    return this.client.query(query, {
      raw: true,
      type: Sequelize.QueryTypes.UPDATE,
      replacements: {...variables},
      ...options
    });
  }


  async doInTransaction(callback) {
    try {
      return await this.client.transaction(callback);

    } catch (error) {
      throw error;
    }
  }
}

class WordRepo extends PgBaseRepo {

}

// const wordRepo = new WordRepo(wordsModel, sqInstance);
const wordRepo = new WordRepo(sqInstance);

exports.wordRepo = wordRepo;
