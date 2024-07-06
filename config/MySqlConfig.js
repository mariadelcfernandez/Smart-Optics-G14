/* const config = {
  host: "zora",
  user: "enrique",
  password: "anDrea1810.",
  database: "optics"
} */

const config = {
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWD_DB,
  database: process.env.DB
}

export default config