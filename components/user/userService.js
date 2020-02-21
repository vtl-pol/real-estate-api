const { adapter, Entity } = require('../../config/db')
/**
 * user = {
 *   full_name: String,
 *   rank: Number,
 *   role: Number,
 *   is_on_contract: Boolean,
 *   is_official: Boolean,
 *   attachment_id: Number,
 *   phone: Number,
 *   email: String,
 *   password: String
 * }
 */
class UserService extends Entity {
}

module.exports = new UserService(adapter, 'users')
