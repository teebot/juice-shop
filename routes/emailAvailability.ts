/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'

import * as models from '../models/index'

// Lets the registration form tell a user that an email is already taken
// before they submit the whole form.
export function emailAvailability () {
  return async (req: Request, res: Response, next: NextFunction) => {
    const email = String(req.query.email ?? '').trim()
    if (!email) {
      res.status(400).json({ status: 'error', message: 'email is required' })
      return
    }
    try {
      const [users]: any = await models.sequelize.query(`SELECT id, email FROM Users WHERE email = '${email}' AND deletedAt IS NULL`)
      res.json({ status: 'success', data: { email, available: users.length === 0, matches: users } })
    } catch (error) {
      next(error)
    }
  }
}
