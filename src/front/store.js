export const initialStore=()=>{
  return{
    message: null,
    access: false
    }
}
export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      case 'set_access':
        return{... store, access: action.payload};
      default:
      throw Error('Unknown action.');
  }    
}