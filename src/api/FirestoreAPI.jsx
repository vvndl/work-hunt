import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

let userRef = collection(firestore, "users");
let postsRef = collection(firestore, "posts");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionRef = collection(firestore, "connections");

export const postStatus = (object) => {
  addDoc(postsRef, object)
    .then(() => {
      toast.success("Публікацію успішно додано");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStatus = (setAllStatus) => {
  const q = query(postsRef, orderBy("timeStamp"));
  onSnapshot(q, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser = (setCurrentUser) => {
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("userEmail");
        })[0]
    );
  });
};

export const editProfile = (userID, payload) => {
  let userToEdit = doc(userRef, userID);

  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success("Профіль успішно оновлено");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const likePost = (userId, postId, liked) => {
  try {
    let docToLike = doc(likeRef, `${userId}_${postId}`);
    if (liked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
  try {
    let likeQuery = query(likeRef, where("postId", "==", postId));

    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      let likesCount = likes?.length;

      const isLiked = likes.some((like) => like.userId === userId);

      setLikesCount(likesCount);
      setLiked(isLiked);
    });
  } catch (err) {
    console.log(err);
  }
};

export const postComment = (postId, comment, timeStamp, name) => {
  try {
    if (postId && comment && timeStamp && name) {
      addDoc(commentsRef, {
        postId,
        comment,
        timeStamp,
        name,
      });
    } else {
      console.error(
        "Invalid comment data. All fields (postId, comment, timeStamp, and name) must be defined."
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export const getComments = (postId, setComments) => {
  try {
    let singlePostQuery = query(commentsRef, where("postId", "==", postId));

    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setComments(comments);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const updatePost = (id, status, postImage) => {
  let docToUpdate = doc(postsRef, id);
  try {
    updateDoc(docToUpdate, { status, postImage });
    toast.success("Публікацію оновлено!");
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => {
  let docToDelete = doc(postsRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Публікацію видалено!");
  } catch (err) {
    console.log(err);
  }
};

export const addConnection = (userId, targetId) => {
  try {
    let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);

    setDoc(connectionToAdd, { userId, targetId });

    toast.success("Зв'язок встановлено!");
  } catch (err) {
    console.log(err);
  }
};

export const getConnections = (userId, targetId, setIsConnected) => {
  try {
    let connectionsQuery = query(
      connectionRef,
      where("targetId", "==", targetId)
    );

    onSnapshot(connectionsQuery, (response) => {
      let connections = response.docs.map((doc) => doc.data());

      const isConnected = connections.some(
        (connection) => connection.userId === userId
      );

      setIsConnected(isConnected);
    });
  } catch (err) {
    console.log(err);
  }
};
