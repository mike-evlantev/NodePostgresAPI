export default function buildMakeUser() {
  return function makeUser({ name, email, status } = {}) {
    if (!name || name.length < 1) {
      throw new Error("User must have a name");
    }
    if (!email || email.length < 1) {
      throw new Error("User must have an email");
    }
    if (!status) {
      throw new Error("User must have a status");
    }
    return Object.freeze({
      getName: () => name,
      getEmail: () => email,
      getStatus: () => status
    });
  };
}
