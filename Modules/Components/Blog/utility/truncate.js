/**
 *
 * @param length
 * @param input
 * @returns {*}
 */
export const truncate = (length, input) => {
    return input.length > length ? `${input.substring(0, length)}...` : input;
};