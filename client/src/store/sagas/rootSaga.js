import { all } from "redux-saga/effects";
import { watchUser } from "./userSaga";
import { watchLogInAndLogOut} from "./loginSaga";
import { watchRecipes } from "./recipesSaga";

export default function* () {
  yield all ([
    watchUser(),
    watchLogInAndLogOut(),
    watchRecipes(),
  ])
}
