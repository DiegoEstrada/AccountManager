import {userConstants} from '../__constants'

const userData = { userName : '', role : '', token : ''  } ;

export const userReducer = (state = userData, action )=>{
    switch(action.type){
        case userConstants.ASSIGN_USER_TO_APP :
            return { userName : action.userName, role : action.role, token : action.token  }
        default :
            return state;
    }
}
