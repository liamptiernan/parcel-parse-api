const insert = require('../db/insert');

async function addAction(params) {
  console.log(params.headers)

  const newAction = {
    'ip': params.ip
  }

  if (params.headers) {
    newAction['sec_ch_ua'] = params.headers['sec-ch-ua'],
    newAction['sec_ch_ua_mobile'] = params.headers['sec-ch-ua-mobile'],
    newAction['user_agent'] = params.headers['user-agent']
  }

  await insert.action([newAction])

  return;
}

module.exports = { addAction }
