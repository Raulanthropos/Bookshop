// let's manage all our actions here!
// best practise: instead of writing the actions manually every time,
// let's create some functions that return actions with dynamic payload:
// these are called "action creators functions"

// another best practise: define CONSTANTS for your action types!
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const SET_USERNAME = 'SET_USERNAME'
export const GET_BOOKS = 'GET_BOOKS'
export const GET_BOOKS_LOADING = 'GET_BOOKS_LOADING'
export const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'


// this is a function returning an action
// in Redux terminology, this is called an "action creator"
export const addToCartAction = (bookSelected) => {
  return {
    type: ADD_TO_CART,
    payload: bookSelected, // most of the times,
    // you'll also need some data in your actions...
    // that's a job for a property commonly called 'payload'
  }
}

export const addToCartActionAsync = (bookSelected) => {
  return (dispatch, getState) => {
    let currentState = getState()
    if (currentState.cart.content.length < 5) {
      // this action will be dispatched JUST if your cart has less then 6 elements!
      dispatch({
        type: ADD_TO_CART,
        payload: bookSelected,
      })
    }
  }
}

export const removeFromCartAction = (i) => ({
  type: REMOVE_FROM_CART,
  payload: i,
})
// this is the same as before, just short-handed:
// a function returning an object

export const setUsernameAction = (username) => {
  return {
    type: SET_USERNAME,
    payload: username,
  }
}

// addToCartAction(something) <-- this gives me the action!

// we'd like to move our fetch process into the redux flow; in this way
// if we're going to invoke this operation again we won't have to copy/paste
// the fetch (or even worse, the useEffect) through multiple components.
// the reducer though is not the right place for it, since it's a pure function!
// and there's no room for failure. so we have just one place left: this actions
// file! Let's create an async action creator

// let's re-write our setUsernameAction with an async shape!
export const setUsernameActionAsync = (username) => {
  // this async action creator doesn't return the action straight away,
  // instead it returns a FUNCTION!
  return async (dispatch, getState) => {
    // this function can be async and you can eo anything into it!
    console.log('I will console log this before returning the action!')
    // dispatch is your good ol' dispatch function!
    // console.log("Let's also take a look the the current state:", getState())
    dispatch({
      type: SET_USERNAME,
      payload: username,
    })
  }
}

// this async action creator is now going to be in charge of fetching the books
// and putting them into the stock array into the book slice of the Redux Store
export const getBooksAction = () => {
  return async (dispatch, getState) => {
    console.log('Fetching the books from the API...')
    console.log('getState', getState())
    try {
      let resp = await fetch(
        'http://localhost:3001/books'
      )
      if (resp.ok) {
        let fetchedBooks = await resp.json()

        dispatch({
          type: GET_BOOKS,
          payload: fetchedBooks, // the reducer is just being given
          // the final result, the array of books! so it cannot fail :)
        })

        setTimeout(() => {
          // this action will just turn false the isLoading variable in the book slice
          dispatch({
            type: GET_BOOKS_LOADING,
            payload: false,
          })
        }, 100)
      } else {
        console.log('error')
        // this action will just turn false the isLoading variable in the book slice
        dispatch({
          type: GET_BOOKS_LOADING,
          payload: false,
        })

        // this action will just turn true the isError variable in the book slice
        dispatch({
          type: GET_BOOKS_ERROR,
          payload: true,
        })
      }
    } catch (error) {
      console.log(error)
      // this action will just turn false the isLoading variable in the book slice
      dispatch({
        type: GET_BOOKS_LOADING,
        payload: false,
      })

      // this action will just turn true the isError variable in the book slice
      dispatch({
        type: GET_BOOKS_ERROR,
        payload: true,
      })
    }
  }
}

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const loginUrl = "http://localhost:3001/users/login";
      const postOptions = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(loginUrl, postOptions);
      if (response.ok) {
        const result = await response.json();
        dispatch({
          type: LOGIN_SUCCESS,
          payload: result.accessToken,
        });
        const getUrl = "http://localhost:3001/users/me";
        const authorizationBearerToken = `Bearer ${result.accessToken}`;
        const getOptions = {
          headers: {
            Authorization: authorizationBearerToken,
            "Content-Type": "application/json",
          },
        };
        const getResponse = await fetch(getUrl, getOptions);
        if (getResponse.ok) {
          const user = await getResponse.json();
          dispatch({
            type: SET_CURRENT_USER,
            payload: user,
          });
        }
      } else {
        dispatch({
          type: LOGIN_FAILURE,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

