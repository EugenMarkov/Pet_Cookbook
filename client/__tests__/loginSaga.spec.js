import { takeLatest, call, put, select, take } from "redux-saga/effects";
import { userLogInFlow, userLogOut } from "../src/store/sagas/loginSaga";
import { getUserRecipes } from "../src/store/sagas/recipesSaga";
import { logOut } from "../src/store/actions/loginActions";
import {recipesLogOut, loadRecipes, getRecipesSuccess} from "../src/store/actions/recipes";
import * as constants from "../src/store/constants";
import rootReducer from "../src/store/reducers/rootReducer";
import { expectSaga } from "redux-saga-test-plan";

describe("When click", () => {
  expectSaga.DEFAULT_TIMEOUT = 50;



  it("should take logout request", () => {
    return expectSaga(userLogOut)
      .provide([
        [call(logOut)]
      ])

      // .dispatch(logOut())

      .run()
      // .then(result => expect(result.storeState.clickCount).toBe(14))
      .then(result => console.log(result))
  });


  it("should take recipes request", () => {
    return expectSaga(getUserRecipes)
      .put(getRecipesSuccess(res.data))

      .run()

      .then(result => console.log(result))
  });
});
