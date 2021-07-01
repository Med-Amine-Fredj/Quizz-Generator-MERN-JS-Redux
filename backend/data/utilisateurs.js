import bcrypt from 'bcryptjs'

const utilisateurs = [
    {
        nomUtilisateur: 'Admin',
        emailUtilisateur: 'admin@example.com',
        mdp: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        online: true,
    },
    {
        nomUtilisateur: 'Fredj',
        emailUtilisateur: 'fredj@example.com',
        mdp: bcrypt.hashSync('123456', 10),
    },
    {
        nomUtilisateur: 'Med',
        emailUtilisateur: 'med@example.com',
        mdp: bcrypt.hashSync('123456', 10),
    }
]

export default utilisateurs