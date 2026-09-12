| POST   | `/auth/login`                            | Sign in                               | —                          |
| POST   | `/auth/register`                         | Register                              | —                          |
| POST   | `/auth/forgot-password`                  | Request password reset                | —                          |
| POST   | `/auth/reset-password`                   | Complete password reset               | —                          |
| POST   | `/auth/verify-otp`                       | Verify OTP                            | —                          |
| POST   | `/auth/verify-otp/resend`                | Resend OTP                            | —                          |
| POST   | `/auth/logout`                           | Sign out                              | —                          |
| GET    | `/auth/me`                               | Current session                       | —                          |
| POST   | `/schools`                               | Create school (+ its School Admin)    | `schools.create`           |
| PATCH  | `/schools/:schoolId`                     | Update school profile                 | `schools.edit`             |
| POST   | `/schools/:schoolId/activate`            | Activate school                       | `schools.activate`         |
| POST   | `/schools/:schoolId/deactivate`          | Deactivate school                     | `schools.deactivate`       |
| POST   | `/schools/:schoolId/suspend`             | Suspend school                        | `schools.suspend`          |
| POST   | `/schools/:schoolId/school-admin`        | Assign an existing School Admin       | `school_admins.manage`     |
| DELETE | `/schools/:schoolId/school-admin`        | Remove the School Admin assignment    | `school_admins.manage`     |
| POST   | `/schools/:schoolId/subscription-plan`   | Assign/change the school's plan       | `subscriptions.manage`     |
| POST   | `/school-admins`                         | Create a School Admin account         | `school_admins.manage`     |
| PATCH  | `/school-admins/:adminId`                | Update profile/contact                | `school_admins.manage`     |
| PUT    | `/school-admins/:adminId/permissions`    | Set permission overrides              | `school_admins.manage`     |
| POST   | `/school-admins/:adminId/reset-password` | Reset password                        | `school_admins.manage`     |
| POST   | `/school-admins/:adminId/activate`       | Activate account                      | `school_admins.manage`     |
| POST   | `/school-admins/:adminId/deactivate`     | Deactivate account                    | `school_admins.manage`     |
| GET    | `/school-admins/:adminId/activity`       | Activity/audit history                | `audit_logs.view`          |
| GET    | `/subscriptions/plans`                   | List subscription plans               | `subscriptions.view`       |
| GET    | `/subscriptions/plans/:planId`           | Get one plan                          | `subscriptions.view`       |
| POST   | `/subscriptions/plans`                   | Create plan                           | `subscriptions.manage`     |
| PATCH  | `/subscriptions/plans/:planId`           | Update plan                           | `subscriptions.manage`     |
| DELETE | `/subscriptions/plans/:planId`           | Delete plan                           | `subscriptions.manage`     |
| GET    | `/subscriptions/schools`                 | List school subscription records      | `subscriptions.view`       |
| GET    | `/subscriptions/schools/:schoolId`       | Get one school's subscription record  | `subscriptions.view`       |
| POST   | `/subscriptions/schools/:schoolId`       | Create a school's subscription record | `subscriptions.manage`     |

### Auth (`src/features/auth/services/auth.service.js`)

- **`POST /auth/login`** — body `{ email, password }` → assumed response
  `{ user, token }`.
- **`POST /auth/register`** — body is whatever the registration form
  collects → assumed response `{ user }`.
- **`POST /auth/forgot-password`** — body `{ email }`; response not
  relied on.
- **`POST /auth/reset-password`** — body `{ token, password }`; response
  not relied on.
- **`POST /auth/verify-otp`** — body `{ email, otp }`; response not
  relied on.
- **`POST /auth/verify-otp/resend`** — body `{ email }`; response not
  relied on.
- **`POST /auth/logout`** — no body; response passed through as-is.
- **`GET /auth/me`** — response passed through as-is (expected to be the
  current user).