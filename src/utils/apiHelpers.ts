export const getRoleBasesUrl=(endpoint:string, role:string):string=>{
    return role==='admin' ? `v1/admin/${endpoint}` : `v1/${endpoint}`
}