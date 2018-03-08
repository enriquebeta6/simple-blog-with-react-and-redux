import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const allPosts = (state = [], action) => {
  switch (action.type) {
    case 'POSTS_LOADED':
      return action.posts;
    case 'CLEAR_POSTS':
      return [];
    default:
      return state;
  }
}

const userCreated = (state = {}, action) => {
  switch (action.type) {
    case 'USER_CREATED':
      return {...state, message: 'El usuario se creo con Exito'};
    case 'USER_ERROR':
      return {...state, message: 'El usuario no se creo'};
    default:
      return state;
  }
}

const session = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, ...action.data};
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
}

const pagination = (state = {total: 1, page: 1}, action) => {
  let newState = {...state};
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      newState.page = action.page;
      return newState;
    case 'SET_TOTAL_POSTS':
      newState.total = action.total;
      return newState;
    case 'CLEAR_PAGINATION':
      return {total: 1, page: 1};
    default:
      return state;
  }
}

const singlePost = (state = {}, action) => {
  switch (action.type) {
    case 'GET_POST':
      return {...action.data};
    case 'CLEAR_POST':
      return {};
    default:
      return state;
  }
}

const errorPost = (state = null, action) => {
  switch (action.type) {
    case 'ERROR_GET_POST':
      return 'Error al cargar el Post';
    default:
      return null;
  }
}

const createPost = (state = null, action) => {
  switch (action.type) {
    case 'CREATED_POST':
      return 'El post se creo exitosamente.';
    case 'ERROR_CREATE_POST':
      return 'Error el post no se creo.';
    default:
      return null;
  }
}

const userPosts = (state = [], action) => {
  switch (action.type) {
    case 'USER_POSTS':
      return action.posts;
    case 'CLEAR_USER_POSTS':
      return [];
    default:
      return state;
  }
}

const errorUserPosts = (state = null, action) => {
  switch (action.type) {
    case 'ERROR_USER_POSTS':
      return 'No tienes Posts o ocurrio un error al cargarlos.';
    default:
      return null;
  }
}

const editPost = (state = {}, action) => {
  switch (action.type) {
    case 'GET_POST':
      return {...action.data};
    case 'CLEAR_EDIT_POST':
      return {};
    default:
      return state;
  }
}

const editStatus = (state = null, action) => {
  switch (action.type) {
    case 'EDITED':
      return 'Se ha editado el post con exito.';
    case 'ERROR_EDITED':
      return 'ERROR no se pudo editar el post.';
    default:
      return null;
  }
}

const deletedStatus = (state = null, action) => {
  switch (action.type) {
    case 'DELETED':
      return 'El post fue eliminado.';
    case 'ERROR_NOT_DELETED':
      return 'El post no fue eliminado.';
    default:
      return null;
  }
}

const reducers = combineReducers({
  allPosts,
  form: formReducer,
  userStatus: userCreated,
  session,
  pagination,
  singlePost,
  errorPost,
  createPost,
  userPosts,
  errorUserPosts,
  editPost,
  editStatus,
  deletedStatus
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
