
const genders = {
  NOT_SPECIFIED: 0,
  FEMALE: 1,
  MALE: 2,
}

exports.User = class User {
  constructor({
    name = null,
    id,
    lastName = null,
    gender = genders.NOT_SPECIFIED,
    metadata,
  }){
    this.name = name;
    this.id = id;
    this.lastName = lastName;
    this.gender = gender;
    this.metadata = metadata;
  }
}


exports.userConstants = genders;