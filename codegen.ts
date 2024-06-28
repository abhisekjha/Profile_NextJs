import {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "https://indexer.bigdevenergy.link/9e37ca4/v1/graphql",
    documents: ["src/**/*.tsx"], //Files considered when generating types
    generates: {
        "./src/graphql/__generated__/": {
            preset: "client",
            presetConfig: { //Use to have the function exported by diff name than the default "graphql"
                gqlTagName: "gql",
            },
        },
    },
};

export default config;