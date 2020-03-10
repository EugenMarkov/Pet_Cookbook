import axios from "axios";
import { takeLatest, put, call, fork, take, all } from "redux-saga/effects";
import {
  getRecipesFailure,
  getRecipesSuccess,
  addRecipesItemSuccess,
  addRecipesItemtFailure,
  deleteRecipesItemSuccess,
  deleteRecipesItemtFailure,
  editRecipesItemSuccess,
  editRecipesItemFailure
} from "../actions/recipes";
import * as constants from "../constants";

export function* getUserRecipes() {
  try {
    const res = yield call(axios.get, "/api/recipes");
    yield put(getRecipesSuccess(res.data));
  } catch (err) {
    yield put(getRecipesFailure(err));
  }
}

export function fetchAddRecipeItem(newRecipe) {
  return axios.post("/api/recipes", newRecipe)
    .then(res => ({ data: res.data }))
    .catch(error => ({ error }));
}

export function* addRecipeItem() {
  while (true) {
    const { payload: newRecipe } = yield take(constants.RECIPES_ADD_ITEM_REQUEST);
    const { data, error } = yield call(fetchAddRecipeItem, newRecipe);
    data ? yield put(addRecipesItemSuccess(data)) : yield put(addRecipesItemtFailure(error));
  }
}

export function fetchDeleteRecipeItem(id) {
  return axios.delete(`/api/recipes/${id}`)
    .then(res => ({ data: res.data }))
    .catch(error => ({ error }));
}

export function* deleteRecipeItem() {
  while (true) {
    const { payload: id } = yield take(constants.RECIPES_DELETE_ITEM_REQUEST);
    const { data, error } = yield call(fetchDeleteRecipeItem, id);
    data ? yield put(deleteRecipesItemSuccess(data)) : yield put(deleteRecipesItemtFailure(error));
  }
}

export function fetchEditRecipeItem(id, updatedRecipe) {
  return axios.put(`/api/recipes/${id}`, updatedRecipe)
    .then(res => ({ data: res.data }))
    .catch(error => ({ error }));
}

export function* editRecipeItem() {
  while (true) {
    const { payload : {id, updatedRecipe} } = yield take(constants.RECIPES_EDIT_ITEM_REQUEST);
    const { data, error } = yield call(fetchEditRecipeItem, id, updatedRecipe);
    data ? yield put(editRecipesItemSuccess(data)) : yield put(editRecipesItemFailure(error));
  }
}

export function* watchRecipes() {
  yield all([
    takeLatest(constants.RECIPES_REQUEST, getUserRecipes),
    fork(addRecipeItem),
    fork(deleteRecipeItem),
    fork(editRecipeItem),
  ]);
}
