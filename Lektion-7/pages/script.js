fetch('https://localhost:7208/api/Test/test2')
  .then(res => {
    console.log(res)
    return res.json()
  })
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })