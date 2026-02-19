const admin = require('firebase-admin');
require('dotenv').config();

// Service Account credentials (from firebase-service-account.json)
const serviceAccount = {
  "type": "service_account",
  "project_id": "wiser-volunteer",
  "private_key_id": "41ded6685b643ef3d49297248438693d273ab505",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCb3uB5mmUFrIZh\no6GPiCX2/ckqGwEw+FM7d+zCWWZ+31t3++jFsKKLz73aH+pWreCZ7ab4Dw2L3yYE\npPubokrtJcx512sSGKIM48esyNIHmkyY1ukDtWLLXKs1ix7RqhSXIrT1/06MMBku\n9mY6qy+PKr57GkIiNto13l/6uHH7CejHmRmpAPl4B3ADDKWxc6mfKWmUhBz6cdLN\nwZ43FwKl6PczFAOnjOa4bB9IPkrBPI1Dv6s634UqSg2z6jDdcoKd+YwXxA9asO0R\nOVg3RWWp2+PehTm4VPPlpDg1OUa11S13H2ADsTUevTDsyFVjt73kHUsvwfVWqGIm\npKiS3KhxAgMBAAECggEAAcGQtT01AwOFHpWZsQmJLRfKC97/46eFGAgBfe83bsea\ni2IFbwj2LvD+OkUeoOp60rosLGW60GfbQI3ptcp/+8l5gPe21HpTapvWhdwGihA8\nMb4FFw48C5lm5mkcPzPxNoxk7V2RiFr8X379UCYH+y5FUolnmMCmge5tknqVvacI\nziPSIBfX54684KlhxixH5Rr9nZ57FzNIznYA2t1hgDWOgFqDrXzh+GFEaIZ/JF5P\n64oVFYEOPsnXp1r4RlBlnX7LRrMLlq38+R/ULvzgojIVJN5NnTFmAY6MZEhxG7LI\nZuNGj9gGlo3kovzHt+8DHbqVtmKTT1yLr6+pZBvibwKBgQDbRYktpFyeglR2XL8a\nAsskDDc4T7aixEUmBc6Xg5nbF8trbUx7rtnwBXCwMoBD/k2KB0hNx7GJw9lb+kQp\nKqzStYV+keFMWNQXic0dmn8zvogtVpCzM7ubd0aZrP38QHGEOM9EbMRhXRu49pJS\nc4O0luCUnfxgpDTRE6+8naZEJwKBgQC1+q13hvLdCoBOnEBxHiaLbpKJCFFAd1vt\nXJNWDeTIV+ypoAbzQmKHR2yvf3xh8r3yWQrPsQzCGb9GYsS8Qwl0BukkT2zumez0\n2Ev7A9CANutFfozUf2cmfChJ1Ea9JfkVogu0HQNkKxy/DCB+N4lSoaqplS3YjKXi\nmD5QEBkVpwKBgG9+kB4xMRc4VhJJXrKvMPQHchykC83/1tlaoo3QUO9izgC19un9\nIrw1R/OP+kCYknzY7x79p3zRpThrrTTxiicqPdL6AoF7uXyuiSnAYWXCQCQtnC5C\n4+ZNZAzINe2KJy6AZIP6enC3k10do5FhQ1sUTOXE34uUc3bMd9OEpgKJAoGBAJNu\nVrEahJHt2wtU7aR3P9UArPkV4vXufWxs7vTt5qclDJhUDK1x3+8nP3djOnsENT0t\nRGQFVYe/YkZ86FR5nyQAIUwIiQE5dU7cGZpwebAWTj+MCj5yRThZqC5AK1s8c3NC\nSGcQhlnVz8E76us2xStLzL79HBpvwEk2/GzSze/LAoGBAIpil9BtFGbhEQklvMOP\nSlrYJ52MXVyjTDHTuGlyxNFyp2Lql2CQdJbii5MHFwkGQsOicm+lsCym+eu9NvPR\nOjtqpWiQgqJoqY5/J+VjrcGmQzUjK7WtuH6Uoj08jfi1jLfXVPWhO8/k2gpqpXXb\ngBD7H9fY/60iJmeKxkM8HgZf\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@wiser-volunteer.iam.gserviceaccount.com",
  "client_id": "107546909424527643301",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40wiser-volunteer.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Initialize the Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://wiser-volunteer-default-rtdb.firebaseio.com/'
  });
}

const db = admin.database();

module.exports = { admin, db };