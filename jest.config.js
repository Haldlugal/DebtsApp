module.exports = {
    verbose: true,
    transform: {
        "^.+\\.(js|jsx|ts)$": "babel-jest",
    },
    moduleDirectories: ["node_modules"],
    transformIgnorePatterns: [
        "<rootDir>/node_modules/(?!core-js/.*)"
    ],
    setupFilesAfterEnv: [
        '@testing-library/react/cleanup-after-each',
        // ... other setup files ...
    ],
    modulePaths: [
        "<rootDir>/node_modules/"
    ],
    testPathIgnorePatterns: [
        "<rootDir>/src/__tests__/components/helpers/"
    ],
    watchPathIgnorePatterns: [
        "<rootDir>/src/__tests__/components/helpers/"
    ]

};

