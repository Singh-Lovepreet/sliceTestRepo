let instance;

class PgQueries {

  getWordQuery() {
    return `select * from words where word=:word;`
  }

  updateWordCountQuery() {
    return `update words set count=count+1 where word=:word returning*;`
  }

  insertNewWord() {
    return `insert into words(word, count) values(:word,1) returning*`
  }

  createTableQuery(){
    return `CREATE TABLE IF NOT EXISTS words  (
      word VARCHAR ( 100 ) PRIMARY KEY,
      count BIGINT  NOT NULL,
      created_at timestamp default current_timestamp
        )`
  }

  checkTableExistsQuery(){
    return `Select * from  words limit 1;`
  }
  static getInstance() {
    if (!instance) instance = new PgQueries();
    return instance;
  }
}

exports.getInstance = PgQueries.getInstance;
