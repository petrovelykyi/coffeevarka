module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || 'SetStrongSecretInDotEnv',
    options: {
      audience: 'https://coffeevarka.herokuapp.com/',
      expiresIn: '90d', // 1d
      issuer: 'coffeevarka.herokuapp.com',
    },
    cookie: {
      // httpOnly: true,
      sameSite: true,
      // signed: true,
      // secure: true,
    },
  },
};
