const loginValido = {
    email: "admin@admin.com",
    password: "secret_admin"
}

const loginInexistente = {
    email: "email@email.com",
    password: "123456"
}

const loginInvalidoEmail = {
    email: "user",
    password: "123456"
}

const loginInvalidoSenha = {
    email: "user@user.com",
    password: "123"
}

const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const jwtPayload = {
    id: 1,
    role: 'admin',
}

export {
    loginValido,
    loginInexistente,
    loginInvalidoEmail,
    loginInvalidoSenha,
    user,
    jwtPayload,
}