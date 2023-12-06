import { copyFileSync, existsSync } from 'fs'

const yamlFileLocation = './swagger.yaml'
const newLocation = './docs/api/swagger.yaml'

if (existsSync(yamlFileLocation)) {
    copyFileSync(yamlFileLocation, newLocation)
} else {
    throw new Error('openapi.json not found!')
}