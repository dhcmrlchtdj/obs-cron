export default {
    input: "./_build/index.js",
    output: {
        file: "./_build/index.bundle.js",
        format: "cjs",
    },
    external: ["rxjs", "rxjs/operators"],
};
