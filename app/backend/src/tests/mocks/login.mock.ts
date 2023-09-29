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
    username: 'User',
    role: 'user',
    email: "user@user.com",
    password: "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO"
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