const links = {
  '0:0:0:1': true,
  '0:0:1:0': true,
  '1:0:1:1': true,
  '0:3:1:3': true,
  '0:4:0:3': true,
  '1:2:2:2': true,
  '1:3:1:2': true
}

const transpose = ijkl => {
  const arr = ijkl.split(':')
  return arr[2] + ':' + arr[3] + ':' + arr[0] + ':' + arr[1]
}

const genMap = ls => {
  const map = {}
  for (let key in links) {
    map[key] = true
    map[transpose(key)] = true
  }
  return map
}

export default genMap(links)
