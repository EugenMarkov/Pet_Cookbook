import axios from "axios";
import {takeLatest, put, call, fork} from "redux-saga/effects";
import { getRecipesFailure, getRecipesSuccess } from "../actions/recipes";
import * as constants from "../constants";


export function* getUserRecipes() {
  try {
    const res = yield call(axios.get,"/api/recipes");
    yield put(getRecipesSuccess(res.data));
  } catch (err) {
    yield put(getRecipesFailure(err));
  }
}

export function* watchUserRecipes() {
  yield takeLatest(constants.RECIPES_REQUEST, getUserRecipes)
}

export function* addRecipeItem(recipe) {
  try {
    const res = yield call(axios.post,"/api/recipes", recipe);
    yield put(getRecipesSuccess(res.data));
  } catch (err) {
    yield put(getRecipesFailure(err));
  }
};

export function* watchAddRecipeItem() {
  yield fork(addRecipeItem)
}