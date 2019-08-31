const initalState = {
    user:[],
   authFlag : false,
}

const reducer = (state = initalState,action) => {
    //console.log("in action.payload" , JSON.stringify(data).data)
    // if(action.type === "USER_INFO" && action.statusCode == 200){
    //     return {
    //         ...state,
    //         user : state.user.concat(action.payload.user),
    //        authFlag: action.payload.authFlag
    //     }
    // }
    // if(action.type === "LOGOUT_USER"){
    //     return {
    //         ...state,
    //         user:[],
    //        authFlag: action.payload.authFlag
    //     }
    // }

}
export default reducer;