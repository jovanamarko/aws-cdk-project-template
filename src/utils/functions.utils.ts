/**
 * Checks if the given object has a given property and if the property is not empty.
 * @export
 * @param {object} object - object to check
 * @param {string} propName - property name to check
 * @returns {string} string - the value of the object's property
 */
export function ensureString(
  object: { [name: string]: string | undefined },
  propName: string,
): string {
  if (
    !object ||
    object[propName] === undefined ||
    object[propName]?.trim().length === 0
  )
    throw new Error(propName + ' does not exist or is empty');

  return object[propName]!;
}
