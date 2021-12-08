function modeActionCreator(key, type){
    return(
        {
            type,
            payload: {
                key
            }
        }
    )
}


export default modeActionCreator;