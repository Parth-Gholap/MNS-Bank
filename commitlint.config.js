module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Banking-specific commit message rules
    'header-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
    
    // Enforce conventional commits for better tracking
    'type-enum': [
      2, 'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation only
        'style',    // Code style changes
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Adding tests
        'chore',    // Maintenance tasks
        'ci',       // CI/CD changes
        'build',    // Build system changes
        'revert'    // Reverting changes
      ]
    ],
    
    // Banking-specific scope requirements
    'scope-enum': [
      2, 'always',
      [
        'navigation', 'compliance', 'products', 'forms', 'calculator',
        'homepage', 'accessibility', 'security', 'performance',
        'cms', 'api', 'ui', 'ux', 'testing', 'deployment'
      ]
    ],
    
    // Require subject for all commits
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'never', 'lower-case'],
    
    // Require body for certain types
    'body-required': [2, 'never'],
    'body-leading-blank': [2, 'never'],
    
    // Footer rules
    'footer-required': [2, 'never'],
    'footer-min-length': [2, 'never', 0],
    
    // General rules
    'case-insensitive-prefixes': [0],
  },
};
