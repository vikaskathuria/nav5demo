export const createAction =(actionName)=>({
 PENDING:`${actionName}_PENDING`,
 FULFILLED:`${actionName}_FULFILLED`,
 REJECTED:`${actionName}_REJECTED`

})