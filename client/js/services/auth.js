const checkRole = (userId, roleName) => axios.post(`/api/people/${userId}/hasRole`, { roleName, })

const logOut = (accessToken) => axios.post(`/api/people/logout?access_token=${accessToken}`)

export { checkRole, logOut };