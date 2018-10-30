import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { jwtsecret, expiration } from '../../config';
/* eslint-disable no-underscore-dangle  */

/**
 * @module Users/Model
 */

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Please, provide "email"',
    unique: 'Current "email" already exist',
  },
  hash: String,
  salt: String,
  firstname: String,
  lastname: String,
  age: Number,
});

/**
 * Generate hash (token) and salt
 * @param {String} password
 * @memberof Users/Model
 */
userSchema.methods.setPassword = function setPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

/**
 * Compare hashes (password validation)
 * @param {String} password
 * @memberof Users/Model
 */
userSchema.methods.validatePassword = function validatePassword(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

/**
 * Generate JWT token
 * @memberof Users/Model
 */
userSchema.methods.generateJWT = function generateJWT() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + expiration || 60);

  const payload = {
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  };

  return jwt.sign(payload, jwtsecret);
};

/**
 * Provide user data for authorization
 * @memberof Users/Model
 */
userSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

export default mongoose.model('User', userSchema);
