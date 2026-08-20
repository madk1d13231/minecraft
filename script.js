import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Успешный вход
  })
  .catch((error) => {
    const errorCode = error.code;
    if (errorCode === 'auth/invalid-credential') {
      alert("Неверный email или пароль. Пожалуйста, проверьте введенные данные.");
    } else {
      alert("Ошибка входа: " + error.message);
    }
  });
