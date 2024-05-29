#!/bin/bash

# Path to this plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./protos/generated"

protoc \
    --plugin="protoc-gen-js=./node_modules/.bin/protoc-gen-ts" \
    --js_out="import_style=commonjs,binary:./protos/generated" \
    --ts_out="./protos/generated" \
    ./protos/speech.proto
