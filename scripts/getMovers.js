const unirest = require('unirest');

const getMovers = () => new Promise((resolve, reject) => {
  // const options = {
  //   count: '20',
  //   region: 'US',
  //   lang: 'en',
  // };
  const req = unirest('GET', 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-movers');

  req.query({
    start: '0',
    count: '20',
    region: 'US',
    lang: 'en',
  });

  req.headers({
    'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    'x-rapidapi-key': 'eSpNAuwEGymsh7a2zFI3kplG5WtDp1P7fj9jsntgCCIeI0HXuD',
  });


  req.end((res) => {
    // console.log(res);
    if (res.error) {
      reject(res);
    }

    // console.log(res.body);
    resolve(res.body);
    // resolve();
  });
});

if (!module.parent) {
  getMovers().then((data) => {
    console.log(JSON.stringify(data, null, '  '));
  }, (error) => {
    console.log(JSON.stringify(error, null, '  '));
  }).catch((error) => console.error(error));
}

module.exports = getMovers;
