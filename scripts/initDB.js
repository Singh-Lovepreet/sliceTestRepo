const {wordRepo} = require('../clients/postgresClient');
const wordQueries = require('../queries/pgQueries').getInstance();

const initTable = async () => {

  console.log("Table Initializing Start ............ ");
  // const checkTableExistsQuery = wordQueries.checkTableExistsQuery();
  // try {
  //   const checkRes = await wordRepo.find({query: checkTableExistsQuery});
  //   if (checkRes[0].length) {
  //     return ("Table already exist");
  //   }
  // } catch (e) {
  //   console.log(e);
  // }
  const queryCreateTable = wordQueries.createTableQuery();
  const res = await wordRepo.createTable({query: queryCreateTable});
  console.log(res);
  return ("Table Initializing Done")
};

initTable().then((res) => {
  console.log(res);
  process.exit();
}).catch((err) => {
  console.log(err.parent);
  process.exit();
});


