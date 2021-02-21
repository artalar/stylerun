export default {
  // src: './src/docs',
  // files: './src/docs/**/*.{md,markdown,mdx}',
  ignor: [
    'readme.md',
    'changelog.md',
    'code_of_conduct.md',
    'contributing.md',
    'license.md',
  ].map(s => s.toUpperCase()),
  dest: 'docs',
  title: 'Stylerun docs',
  typescript: true,
}
