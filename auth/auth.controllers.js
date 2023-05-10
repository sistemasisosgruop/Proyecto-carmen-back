const jwt = require('jsonwebtoken')
const { verifyUser } = require('./auth.services') 


const postLogin = (request, response) => {
  const { email, password } = request.body
  
  if (email && password) {
    verifyUser(email, password)
      .then((data) => {
        if (data) {
          const token = jwt.sign(
            {
              id: data.id,
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
            },
            process.env.JWT_SECRET
          )
          response.status(200).json({ message: 'Correct Credentials', token })
        } else {
          response.status(400).json({ message: 'Invalid Credentials' })
        }
      })
      .catch((err) => response.status(404).json({ message: err.message }))
  } else {
    response.status(400).json({
      message: 'All parametres are required',
      fields: {
        email: 'example@example.com',
        password: 'String',
      },
    })
  }
}

module.exports = {
  postLogin
}