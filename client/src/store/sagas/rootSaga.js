import { all } from "redux-saga/effects";
import { watchUserData } from "./userSaga";
import { watchUserLogin, watchUserLogOut } from "./loginSaga";
import { watchUserRecipes } from "./recipesSaga";

export default function* () {
  yield all ([
    watchUserLogin(),
    watchUserRecipes(),
    watchUserData(),
    watchUserLogOut(),
  ])
}
