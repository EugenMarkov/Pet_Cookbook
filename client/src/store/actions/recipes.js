import * as constants from "../constants";

export const loadRecipes = () => {
  return {
    type: constants.RECIPES_REQUEST,
  };
};
export const getRecipesSuccess = data => {
  return {
    type: constants.RECIPES_GET_SUCCESS,
    payload: data,
  };
};
export const getRecipesFailure = err => {
  return {
    type: constants.RECIPES_GET_FAILURE,
    payload: err,
  };
};

export const recipesDeleteItem = id => {
  return {
    type: constants.RECIPES_DELETE_ITEM_REQUEST,
    payload: id,
  };
};
export const deleteRecipesItemSuccess = data => {
  return {
    type: constants.RECIPES_DELETE_ITEM_SUCCESS,
    payload: data,
  };
};
export const deleteRecipesItemtFailure = err => {
  return {
    type: constants.RECIPES_DELETE_ITEM_FAILURE,
    payload: err,
  };
};

export const recipesAddItem = recipe => {
  return {
    type: constants.RECIPES_ADD_ITEM_REQUEST,
    payload: recipe,
  };
};
export const addRecipesItemSuccess = data => {
  return {
    type: constants.RECIPES_ADD_ITEM_SUCCESS,
    payload: data,
  };
};
export const addRecipesItemtFailure = err => {
  return {
    type: constants.RECIPES_ADD_ITEM_FAILURE,
    payload: err,
  };
};

export const recipesEditItem = ( id, updatedRecipe) => {
  return {
    type: constants.RECIPES_EDIT_ITEM_REQUEST,
    payload: { id: id, updatedRecipe: updatedRecipe },
  };
};
export const editRecipesItemSuccess = data => {
  return {
    type: constants.RECIPES_EDIT_ITEM_SUCCESS,
    payload: data,
  };
};
export const editRecipesItemFailure = err => {
  return {
    type: constants.RECIPES_EDIT_ITEM_FAILURE,
    payload: err,
  };
};

export const recipesCleanErrorAndMessage = () => {
  return {
    type: constants.RECIPES_CLEAN_ERROR_AND_MESSAGE,
  };
};

export const recipesLogOut = () => {
  return {
    type: constants.RECIPES_LOG_OUT,
  };
};
