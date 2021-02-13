const {wordRepo} = require('../clients/postgresClient');
const wordQueries = require('../queries/pgQueries').getInstance();
const httpStatus = {success: 200, failed: 400};

class WordsApi {


  async getWordDetails(params) {
    try {
      const {word} = params;
      const query = wordQueries.getWordQuery();
      const variables = {word};
      const res = await wordRepo.find({query, variables});
      if (res.length) {
        return res
      } else {
        return {status: httpStatus.success, msg: 'Word not found'}
      }
    } catch (e) {
      console.log(e);
    }
  }

  async updateWordCount(params) {
    /***
     * Put call will update resource if present or create it if not present
     */
    try {
      const {word} = params;
      const {status} = await wordRepo.doInTransaction(async (txn) => {
        const options = {
          transaction: txn
        };
        const query = wordQueries.updateWordCountQuery();
        const response = await wordRepo.update({query, variables: {word}, options});
        if (response[0].length) {
          return {status: true}
        }
        return {status: false};
      });
      if (status) {
        return {status: httpStatus.success, msg: 'Word count updated'}
      }
      const insertWordQuery = wordQueries.insertNewWord();
      const insertRes = await wordRepo.insert({query: insertWordQuery, variables: {word}});
      if (insertRes[0].length) {
        return {status: httpStatus.success, msg: 'Word count updated'}
      }
      return {status: httpStatus.failed, msg: 'fail to update word count'}
    } catch (e) {
      console.log(e);
    }
  }

  static getInstance() {
    let instance;
    if (!instance) instance = new WordsApi();
    return instance;
  }
}

exports.getInstance = WordsApi.getInstance;
