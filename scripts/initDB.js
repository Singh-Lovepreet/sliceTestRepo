const {wordRepo} = require('../clients/postgresClient');
const wordQueries = require('../queries/pgQueries').getInstance();

const initTable = async () => {

  console.log("Table Initializing Start ............ ");
  const query = wordQueries.createTableQuery();
  const res = await wordRepo.createTable({query});
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


