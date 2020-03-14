// @flow
import * as _ from 'lodash';

const data = require('./data');

export default class APIStore {
  static me() {
    return '09003f2b-a0f5-4b6a-b66a-d3446df71728';
  }

  static profile(uid) {
    return data.users[uid];
  }

  static posts() {
    return _.sortBy(data.posts, ['timestamp']).reverse();
  }

  static goals() {
    return _.sortBy(data.goals, ['id']);
  }

  static addPost(post) {
    data.posts.push(post);
  }

  static post(id) {
    return data.posts.filter(post => post.id === id)[0];
  }

  static comments(post) {
    if (!data.comments[post]) {
      data.comments[post] = [];
    }
    return _.sortBy(data.comments[post], ['timestamp']).reverse();
  }

  static like(id, uid) {
    const post = APIStore.post(id);
    const idx = post.likes.indexOf(uid);
    if (idx === -1) {
      post.likes.push(uid);
    } else {
      post.likes.splice(idx, 1);
    }
    return post.likes;
  }

  static addComment(post, comment) {
    if (!data.comments[post]) {
      data.comments[post] = [];
    }
    APIStore.post(post).comments = APIStore.post(post).comments + 1;
    data.comments[post].push(comment);
  }
}
