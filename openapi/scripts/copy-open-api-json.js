import { copyFileSync, existsSync } from 'fs'

const jsonFileLocation = './openapi/docs/json/openapi.json'
const newLocation = './docs/api/openapi.json'

if (existsSync(jsonFileLocation)) {
    copyFileSync(jsonFileLocation, newLocation)
} else {
    throw new Error('openapi.json not found!')
}