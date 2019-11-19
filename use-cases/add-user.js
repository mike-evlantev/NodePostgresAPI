// use cases describe valid interactions within application
import makeUser from "../models/user/user";

export default function makeAddUser({ userDb }) {
  return async function addUser(userData) {
    const user = makeUser(userData);
  };
}
