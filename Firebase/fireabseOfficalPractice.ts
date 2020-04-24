const id = Phaser.Math.Between(1, 5000);
const userRef = databaseFirebase.ref(`users/zhang`);
const usernameRef = databaseFirebase.ref(`users/zhang/username`);

userRef.set({
  username: `name_test_${id}`,
  email: `email_test_${id}`,
  profilePicture: `profile_picture_test_${id}`,
});

const onCallback = (snapshot: any) => {
  console.log('無論何地更改都會傳值：', snapshot.val() ? snapshot.val() : null);
};
usernameRef.on('value', onCallback);
usernameRef.off('value', onCallback); // 只給 event 的話會取消該 event 的所有 on，給 callback 的話會只取消該 event 內相同 callback 的

userRef.once('value', snapshot => {
  console.log('只在 Load 後載入一次：', snapshot.val() ? snapshot.val().username : null);
});

userRef.child('username').once('value', snapshot => {
  console.log('只在 Load 後載入一次：', snapshot.val() ? snapshot.val() : null);
});

const newUser = databaseFirebase
  .ref()
  .child('users/items')
  .push('content');
console.log('push() 是在指定 node 內加上一個物件，隨機值的 Key，載入的值是他的 value：', newUser.key);
const updates: any = {};
updates[`/users/items/${newUser.key}`] = 'new content！YAA？';
updates[`/users/zhang/${newUser.key}`] = 'new content！？？';
databaseFirebase.ref().update(updates); // 在全部路徑下的特定路徑做更新，更新是指該 node 下的內容全部替換
databaseFirebase.ref('users/zhang').update(updates); // 在特定路徑下的特定路徑做更新，更新是指該 node 下的內容全部替換

databaseFirebase
  .ref('houses/zhang')
  .set(
    {
      houseLevel: 5,
    },
    error => {
      if (error) {
        console.log(error);
      } else {
        console.log('與 on 不同的是，on 是監聽所有地方的改變，set 的 completion callback 是針對自己這項新增是否成功');
      }
    },
  )
  .then(response => {
    console.log('set 也有 promise 來知道何時成功，response 沒東西', response);
    databaseFirebase
      .ref('houses/zhang')
      .remove(() => {
        console.log('新增了我又 remove 掉了在 onCompletion callback');
      })
      .then(response => {
        console.log('新增了我又 remove 掉了在 then response', response);
      })
      .catch(error => {
        console.log('新增了我又 remove 掉了在 catch error', error);
      });
  })
  .catch(error => {
    console.log('set 的錯誤！', error);
  });

databaseFirebase.ref('pens/zhang').set(
  {
    color: 'pink',
  },
  () => {
    databaseFirebase.ref('pens/zhang').set(null); // 也可以用 set(null) 來 remove
    databaseFirebase.ref('pens').update({ '/zhang/': null }); // 或者用 update 來 remove
    // update 也有 oncompletion callback，也有回傳 promise，跟 set 一樣
  },
);

function toggleStar(postRef: firebase.database.Reference, uid: string) {
  postRef.transaction(function(post) {
    console.log('transaction 是先看看原本的值再動作，以避免多人同時在同一個值上做更動時導致值不正確');
    console.log(post);
    if (post) {
      if (post.stars && post.stars[uid]) {
        post.starCount--;
        post.stars[uid] = null;
      } else {
        post.starCount++;
        if (!post.stars) {
          post.stars = {};
        }
        post.stars[uid] = true;
      }
    } else {
      post = {
        starCount: 1,
        stars: {
          [uid]: true,
        },
      };
    }
    return post;
  });
}
toggleStar(databaseFirebase.ref('posts'), 'bb');
