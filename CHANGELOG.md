## 1.0.0 - Initial release
- Created the module

## 1.0.1
- Added RegisterVariable function

## 1.0.2
- Added RegisterFunction & some optimisations.

## 1.0.3
- Minor coding fixes/optimisations

## 1.0.5
- Changed git

## 1.0.6
- Moved changelog from README to seperate CHANGELOG

## 1.0.7
- Added custom splitters

## 1.0.8
- Added new Execute function into registry
- Added function compatibility
- Bugs
  - Always logs `undefined`

## 1.0.9
- Updated README.md which includes a better usage example.
- Bugs
  - Previous bugs remain
- Improvements
  - Need to add support for text replacements

## 1.0.10
- Added variable support into `Execute`
- Small updates to README.md
- Bugs
  - Fixed up the error where `input` was spelt wrong as `inputer`
  - 1.0.8 bug still remains

## 1.0.11
- Fixed READEME.md typo
- Bugs
  - 1.0.8 bug still remains
  - Need to check if certain commands/replacers exist and log errors if not

## 1.0.12
- Fixed multi arguments in Execute, where previous versions would only send one variable when multiple were given
- Bugs
  - Fixed function args
  - 1.0.8 bug still remains
  - Strings in front of functions will cause bugs/errors

## 1.0.13
- Fixed github error in package.json
- Same bugs remain as in 1.0.12

## 1.0.14
- Updated package.json
- Fixed commented out code

## 1.0.15
- Updated license and changed to Apache License 2.0
- Same bugs as 1.0.12

## 1.0.16
- New bug: functions registered in the middle or end of a string will not be registered.

## 1.0.17
- Bug fixes
  - Fixed logging undefined on start.
  - Fixed broken custom splitters, they should work now.

## 1.1.0
- Major bug fix
  - Fixed bug from 1.0.17
- Rewrote example in index.js
- Fix readme displaying the wrong github repo + update version

## 1.1.1
- Bug fix
  - Fixed to run async

## 1.1.2
- Fixed wrong amounts of paragraph breaks
- Tested against most standard cases of use
- Updated test case in README

## 1.1.3
- Added the option to turn on paragraph breaks or disable paragraph breaks, defaults to off
- Updated test case in README

## 1.1.4
- Fully fixed carriage return and new line bugs
- Recoded with comments for better reading
- Added invalid tags

## 1.1.5
- Looks like some debugging caused problems, removed some debugging lines

## 1.1.6
- Now checks input type and throws an error if the `typeof(input)` is not string.

## 1.1.7
- Updated some variable names in index.js.
- Updates towards README.md to remove the confusion towards CRLF and LF input files due to the fix in update 1.1.4.
- Updates to test/index.js due to CRLF/LF.

## 1.1.8
- Update on README.md

## 1.1.9
- Another change to the testing files to display how termfx works.
- Updated README.md
  - Show future plans to remove the need to declare CRLF/LF break files.
  - Improved the examples.
  - Better documentation on the methods and what type of parameters they take as input.

## 1.2.0
- Upgraded to ES6 version of JS which removes a lot of the need for `var` and `let` and replaces them with `const` and `let`.
- Renamed functions to start with lowercase letters.
- Updated README.md
- Updated examples

## 1.2.1 - refactor: migrate project to TypeScript
- Refactor constructor to take in options object
- Remove old JavaScript implementation
- Optimised validation code to use typescript validator
- Add JSDoc comments for public methods in Termfx
- Use `delimiters` terminology instead of `splitters`
