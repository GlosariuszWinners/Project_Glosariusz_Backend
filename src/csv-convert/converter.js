import dotenv from 'dotenv'
import csvToJson from 'convert-csv-to-json'
import { fileURLToPath } from 'url'
import * as path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dotenvPath = path.join(__dirname, '..', '..', './.env')

dotenv.config({ path: dotenvPath })

const fileName = process.env.CSV_FILE_NAME
const filePath = path.join(__filename, '..', `./${fileName}`)

const convertCsvToJson = (filePath) =>
    new Promise((resolve, _) => {
        resolve(csvToJson.utf8Encoding().getJsonFromCsv(filePath))
    })

export const jsonData = await convertCsvToJson(filePath)
