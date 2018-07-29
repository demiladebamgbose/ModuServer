const checkRole = (userId, roleName) => axios.post(`/api/people/${userId}/hasRole`, { roleName, })

export { checkRole };