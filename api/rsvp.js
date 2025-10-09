import { google } from 'googleapis'

async function handler(req, res) {
  const allowedOrigins = [
    'http://localhost:5173',
    'https://www.biao-she.wedding',
    'https://biao-she.wedding',
    'https://my-wedding-qwfyr30qm-wenyunshes-projects.vercel.app',
    'https://my-wedding-e1so2wrhg-wenyunshes-projects.vercel.app',
  ]

  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const {
      name,
      attending,
      guests,
      needsBabySeat,
      babySeatCount,
      needsVegetarianMeal,
      remarks,
      eInvitationEmail,
      physicalInvitationAddress,
    } = req.body

    if (
      !name ||
      !attending ||
      needsBabySeat === undefined ||
      needsVegetarianMeal === undefined
    ) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS)

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const spreadsheetId = process.env.SPREADSHEET_ID
    const SHEET_NAME = 'RSVP'

    const row = [
      new Date().toISOString(),
      name,
      guests || 0,
      needsBabySeat || false,
      babySeatCount || 0,
      needsVegetarianMeal || false,
      eInvitationEmail || '-',
      physicalInvitationAddress || '-',
      remarks || '-',
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row],
      },
    })

    return res.status(200).json({ success: true, message: 'RSVP submitted' })
  } catch (err) {
    console.error('Error saving RSVP:', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default handler
