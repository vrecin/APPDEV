/**
 * User credentials shape aligned with Symfony Backend (User entity & Auth/Register APIs).
 * Use these keys when sending or reading user data so backend and app stay in sync.
 */

// Backend User entity fields (from Backend\src\Entity\User.php)
export const USER_FIELDS = {
  ID: 'id',
  EMAIL: 'email',
  ROLES: 'roles',
  PASSWORD: 'password', 
};

// Login request (POST /api/login)
export const LOGIN_CREDENTIALS = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

// Register request (POST /api/register) – must match RegisterController
export const REGISTER_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password', 
};

// Login response user object (from AuthController)
export const AUTH_RESPONSE_USER = {
  ID: 'id',
  USERNAME: 'username',
  EMAIL: 'email',
  ROLES: 'roles',
};