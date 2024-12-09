
import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);

  if (!password) {
    throw { name: 'BADREQUEST' }
  }
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password, hashedPass) => {
  return bcrypt.compareSync(password, hashedPass);
};
