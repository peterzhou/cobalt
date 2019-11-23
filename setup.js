// Note: this file is the configuration file *only* for
// use by the boiler-room-custodian utility. the point
// of the boiler-room-custodian is to clean sample code
// from the boilerplate from initial state so that you
// can start custom development on a "blank project"
//
// For more information or to report issues please go
// to https://github.com/tstringer/boiler-room-custodian
//
// This file should remain unmodified by end users and
// should only be invoked by running `npm run cleanup`
module.exports = {
  // remove the following files as they are mostly
  // related to the sample counter page and functionality
  // clean the following files by either clearing them
  // (by specifying {clear: true}) or by removing lines
  // that match a regex pattern
  clean: [
    {
      file: "src/reducers/index.ts",
      pattern: /counter/,
    },
    {
      file: "src/store/configureStore.development.ts",
      pattern: /counterActions/,
    },
    {
      file: "src/app.global.scss",
      clear: true,
    },
    {
      file: "test/e2e.ts",
      clear: true,
    },
    {
      file: "README.md",
      clear: true,
    },
    {
      file: "app/components/Home.tsx",
      pattern: /(h2|Link)/,
    },
  ],
  // add the following files to the project, mostly
  // related to .gitkeep for version control
  add: [
    { file: "src/actions/.gitkeep" },
    { file: "test/actions/.gitkeep" },
    { file: "test/components/.gitkeep" },
    { file: "test/containers/.gitkeep" },
    { file: "test/reducers/.gitkeep" },
  ],
};
