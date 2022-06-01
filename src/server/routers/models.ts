/**
 * @typedef UserLoginInfo
 * @property {string} login.required - user login
 * @property {string} password.required - user password
 */

/**
 * @typedef User
 * @property {integer} id - user id
 * @property {string} login.required - user login
 * @property {integer} plevel.required - user privilege level
 */

/**
 * @typedef UserWithPass
 * @property {integer} id - user id
 * @property {string} login.required - user login
 * @property {integer} plevel.required - user privilege level
 * @property {string} password.required - user password
 */

/**
 * @typedef Team
 * @property {integer} id - team id
 * @property {string} name.required - team name
 * @property {integer} owner_id.required - team owner id
 */

/**
 * @typedef HistoryTeam
 * @property {integer} id - team id
 * @property {string} name.required - team name
 * @property {integer} owner_id.required - team owner id
 * @property {string} leaved.required - team leaved date
 */

/**
 * @typedef Player
 * @property {integer} id - player id
 * @property {integer} owner.required - players owner
 * @property {string} firstname.required - player first name
 * @property {string} lastname.required - player last name
 * @property {string} country.required - player country
 * @property {string} birthdate.required - player date of birth
 */

/**
 * @typedef PlayerUpdInfo
 * @property {string} fname - player first name
 * @property {string} lname - player last name
 * @property {string} cntry - player country
 */
