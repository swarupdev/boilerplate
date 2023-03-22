module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.name === '@apollo/server') {
        pkg.peerDependencies['graphql'] = '*';
      }
      if (pkg.name === 'graphql-query-complexity') {
        pkg.peerDependencies['graphql'] = '*';
      }
      if (pkg.name === 'graphql-subscriptions') {
        pkg.peerDependencies['graphql'] = '*';
      }
      return pkg;
    },
  },
};
