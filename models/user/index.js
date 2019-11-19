// used to separate business logic from dependencies and
// expose the user model

// import internal and 3rd party libraries
import buildMakeUser from "./user";

const makeUser = buildMakeUser();
export default makeUser;
