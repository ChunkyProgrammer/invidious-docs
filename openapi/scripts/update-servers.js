import { readFileSync, writeFileSync } from 'fs'
import { parse, stringify } from 'yaml'

const swaggerFileLocation = './openapi/swagger.yaml'
const file = readFileSync(swaggerFileLocation, 'utf8')
let parsed = parse(file)

fetch('https://api.invidious.io/instances.json?pretty=1&sort_by=health')
    .then(instances => instances.json())
    .then(instances => {
        const apiInstances = instances.filter(instance => {
            return instance[1].api == true && instance[1].type == 'https'
        }).map(instance => {
            return { url: instance[1].uri + '/api/v1' }
        })
        parsed.servers = apiInstances
        writeFileSync(swaggerFileLocation, stringify(parsed), 'utf-8')
    })

