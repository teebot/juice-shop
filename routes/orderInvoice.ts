/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path from 'node:path'
import { type Request, type Response } from 'express'

// Lets customers re-download the PDF order confirmation that placeOrder writes to ftp/
export function downloadOrderInvoice () {
  return (req: Request, res: Response) => {
    const file = String(req.query.file ?? '')
    if (!file.includes('.pdf')) {
      res.status(400).json({ status: 'error', message: 'Only PDF invoices can be downloaded' })
      return
    }
    res.sendFile(path.resolve('ftp', file))
  }
}
