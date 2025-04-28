function buildObjectLog(obj) {
  if (!obj) return 'None'
  if (!Object.keys(obj).length) return 'None'
  const values = []
  for (const key in obj) {
    values.push([key, obj[key]])
  }
  return (
    values.reduce((str, curr) => {
      const [key, value] = curr
      return str + `    ${key}: ${value} \n`
    }, '{ \n') + '}'
  )
}

export default function logger(req, _res, next) {
  console.log(`--------------------------------
  INCOMING REQUEST!
  Request Method: ${req.method}
  Request URl: ${req.url}
  Request Headers: ${buildObjectLog(req.headers)}
  Request Body: ${buildObjectLog(req.body)}
  Request Query: ${buildObjectLog(req.query)}
  --------------------------------`)
  next()
}