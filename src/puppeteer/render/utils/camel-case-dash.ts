/**
 * backgroundColor => background-color
 */
export function camelCaseDashes(styleName: string): string {
  for (let charIndex = 0; charIndex < styleName.length; charIndex++) {
    const char = styleName[charIndex];
    const isUpperCased = char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90;
    if (!isUpperCased) continue;

    const newChar = '-' + char.toLowerCase();
    styleName = styleName.substr(0, charIndex)
      + newChar
      + styleName.substr(charIndex + 1, styleName.length - charIndex);

    charIndex += newChar.length - 1;
  }

  return styleName;
}
