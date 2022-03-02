module.exports = {
    roots: ['<rootDir>'],
    rootDir: './',
    modulePaths: ['<rootDir>'],
    moduleDirectories: ['node_modules'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
    testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$', '<rootDir>/node_modules/(?!@material-ui)'],
    transform: {
        '^.+\\.(ts|tsx|js)$': 'babel-jest',
    },
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/test/mocks/index.js',
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
    globals: {
        Uint8Array,
    },
};
