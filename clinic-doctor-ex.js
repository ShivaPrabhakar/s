const ClinicDoctor = require('@nearform/doctor');
const autocannon = require('autocannon')



function startBench () {
  const instance = autocannon({
    url: 'http://localhost:3010'+'/v4/socialfeed',
    connections: 100,
    duration: 10,
    amount:100,
    body:'{"p":"/v4/socialfeed","d":{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1YTBkMTJlMjJkZDViZjIyZDczMGE2NzQiLCJfX2F1dGhWMyI6dHJ1ZSwiaWF0IjoxNTkwNDg1NDUyfQ.ZPZN0yX2iLTB4fmCEHkDo-pBHBk1nY8t--alwzZO4ho","_user":"5eeb71f607aa6f40986f70f5","_channel":"5eeb726507aa6f40986f70f7","userId":"5eeb71f607aa6f40986f70f5","user":"ShivaPrabhakar","searcherId":"5eeb71f607aa6f40986f70f5","channelId":"5eeb726507aa6f40986f70f7","options":{"pageSize":10,"pageNumber":0,"commentsOptions":{"pageSize":1,"pageNumber":0},"viewsOptions":true,"likesOptions":{"pageSize":4,"pageNumber":0},"sortField":{"sticky":-1,"modifiedAt":-1}}},"i":"5f0803baf1775f2331d13655"}'

  }, finishedBench)

  autocannon.track(instance)

  // this is used to kill the instance on CTRL-C
  process.once('SIGINT', () => {
    instance.stop();
    generateGraph();
  })

  function finishedBench (err, res) {
    console.log('finished bench', err, res)
  }
}

const sett = {
    detectPort : true,
    dest : '.clinic',
    collectDelay : 1
}
const doctor = new ClinicDoctor(sett);
// var fpath;
const collectData = (path,url)=>{
doctor.collect(['node',path+url], function (err, filepath) {
  if (err) throw err
  startBench();
  fpath = filepath;
    return filepath
  
})
}

const generateGraph = ()=>{
  // doctor.on('connect',)
    
doctor.visualize(fpath, fpath + '.html', function (err) {
    if (err) throw err
  });

}
collectData('http://localhost:3010','/')

module.exports.collectData = collectData;
module.exports.generateGraph = generateGraph;
