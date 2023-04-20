import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import PostForm from './PostForm';
import Posts from './Posts';
import { Reducer } from 'react';

const store = createStore(postReducer, applyMiddleware(thunk));

function AppRender() {
  return (
    <Provider store={store}>
      <div className="App">
        
        <PostForm />
    <Posts />
  </div>
</Provider>
  )
}