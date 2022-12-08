export default {
    rootDir: "src/",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1"
    },
    runner: 'jest-runner-eslint',
    displayName: 'lint',
    testMatch: ['<rootDir>/**/*.js'],
    watchPlugins: ['jest-runner-eslint/watch-fix'],
};
