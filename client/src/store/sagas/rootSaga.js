import { all } from "redux-saga/effects";
import { watchUserData, watchEditUserData } from "./userSaga";
import { watchUserLogin, watchUserLogOut, watchUserLogInOrLogOut} from "./loginSaga";
import { watchUserRecipes, watchAddRecipeItem, } from "./recipesSaga";

export default function* () {
  yield all ([
    watchUserLogin(),
    watchUserRecipes(),
    watchUserData(),
    watchUserLogOut(),
    watchUserLogInOrLogOut(),
    watchEditUserData(),
    // watchAddRecipeItem,
  ])
}
