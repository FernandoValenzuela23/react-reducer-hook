
export const JuegoReducer = (state = [], action) => {
  switch (action.type) {
    case 'crear':
        return [...state, action.payload]
    case 'eliminar':
        return state.filter(p => p.id !== action.payload.id)
    case 'editar':
        return state.map(j => {
            if(j.id === action.payload.id) {
                j.title = action.payload.title;
            }
            return j;
        })
    default:
        return state;
  }
}
