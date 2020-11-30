# ES reindex plugin
This plugin allows to manually trigger a ElasticSearch
reindex on rest api request.
Plugin exposes two endpoints:
POST /:entity - schedules next reindex for selected entity
GET /:entity - returns current info about reindex status for selected entity

## Entry point
Entry point for plugin is a /src/index.js file. It contains a template function
for api plugin.

## Usage

### Schedule reindex
```shell script
curl -X POST -d '{ "ids": ["231"] }' -H 'Content-Type: application/json' "http://localhost:8080/api/vendor/reindex/{{entity}}"
```

Available entities:
- category
- product
- attribute
- page
- block
- stock

### Get reindex status
```shell script
curl -X GET -d '{ "ids": ["231"] }' -H 'Content-Type: application/json' "http://localhost:8080/api/vendor/reindex/{{entity}}"
```
