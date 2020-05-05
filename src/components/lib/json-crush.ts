function jsonCrush(string: string) {
    const maxSubstringLength = 50; // speed it up by limiting max length
    const delimiter = '\u0001'; // used to split parts of crushed string

    const JSCrush = (string: string, replaceCharacters: Array<string>) => {
        // JSCrush Algorithm (repleace repeated substrings with single characters)
        let replaceCharacterPos = replaceCharacters.length;
        let splitString = '';

        const ByteLength = (string: string) => encodeURI(encodeURIComponent(string)).replace(/%../g, 'i').length;
        const HasUnmatchedSurrogate = (string: string) => {
            // check ends of string for unmatched surrogate pairs
            const c1 = string.charCodeAt(0);
            const c2 = string.charCodeAt(string.length - 1);
            return (c1 >= 0xDC00 && c1 <= 0xDFFF) || (c2 >= 0xD800 && c2 <= 0xDBFF);
        };

        // count instances of substrings
        let substringCount = Object();
        for (let substringLength = 2; substringLength < maxSubstringLength; substringLength++)
            for (let i = 0; i < string.length - substringLength; ++i) {
                const substring = string.substr(i, substringLength);

                // don't recount if already in list
                if (substringCount[substring])
                    continue;

                // prevent breaking up unmatched surrogates
                if (HasUnmatchedSurrogate(substring))
                    continue;

                // count how many times the substring appears
                let count = 1;
                for (let substringPos = string.indexOf(substring, i + substringLength); substringPos >= 0; ++count)
                    substringPos = string.indexOf(substring, substringPos + substringLength);

                // add to list if it appears multiple times
                if (count > 1)
                    substringCount[substring] = count;
            }

        // eslint-disable-next-line no-constant-condition
        while (true) // loop while string can be crushed more
        {
            // get the next character that is not in the string
            for (; replaceCharacterPos-- && string.includes(replaceCharacters[replaceCharacterPos]);) undefined;
            if (replaceCharacterPos < 0)
                break; // ran out of replacement characters
            const replaceCharacter = replaceCharacters[replaceCharacterPos];

            // find the longest substring to replace
            let bestSubstring: string | undefined = undefined;
            let bestLengthDelta = 0;
            const replaceByteLength = ByteLength(replaceCharacter);
            for (const substring in substringCount) {
                if (!Object.prototype.hasOwnProperty.call(substringCount, substring)) continue;
                // calculate change in length of string if it substring was replaced
                const count = substringCount[substring];
                let lengthDelta = (count - 1) * ByteLength(substring) - (count + 1) * replaceByteLength;
                if (!splitString.length)
                    lengthDelta -= ByteLength(delimiter); // include the delimeter length
                if (lengthDelta <= 0)
                    delete substringCount[substring];
                else if (lengthDelta > bestLengthDelta) {
                    bestSubstring = substring;
                    bestLengthDelta = lengthDelta;
                }
            }
            if (!bestSubstring)
                break; // string can't be compressed further

            // create new string with the split character
            string = string.split(bestSubstring).join(replaceCharacter) + replaceCharacter + bestSubstring;
            splitString = replaceCharacter + splitString;

            // update substring count list after the replacement
            const newSubstringCount = Object();
            for (const substring in substringCount) {
                if (!Object.hasOwnProperty.call(substringCount, substring)) continue;
                // make a new substring with the replacement
                const newSubstring = substring.split(bestSubstring).join(replaceCharacter);

                // count how many times the new substring appears
                let count = 0;
                for (let i = string.indexOf(newSubstring); i >= 0; ++count)
                    i = string.indexOf(newSubstring, i + newSubstring.length);

                // add to list if it appears multiple times
                if (count > 1)
                    newSubstringCount[newSubstring] = count;

            }
            substringCount = newSubstringCount;

        }

        return {a: string, b: splitString};
    };

    // create a string of replacement characters
    const characters = [];

    // prefer replacing with characters that will not be escaped by encodeURIComponent
    const unescapedCharacters = `-_.!~*'()`;
    for (let i = 127; --i;) {
        if ((i >= 48 && i <= 57) || // 0-9
            (i >= 65 && i <= 90) || // A-Z
            (i >= 97 && i <= 122) || // a-z
            unescapedCharacters.includes(String.fromCharCode(i)))
            characters.push(String.fromCharCode(i));
    }

    // pick from extended set last
    for (let i = 32; i < 255; ++i) {
        const c = String.fromCharCode(i);
        if (c != '\\' && !characters.includes(c))
            characters.unshift(c);
    }

    // remove delimiter if it is found in the string
    string = string.replace(new RegExp(delimiter, 'g'), '');

    // swap out common json characters
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    string = jsonCrushSwap(string);

    // crush with JS crush
    const crushed = JSCrush(string, characters);

    // insert delimiter between JSCrush parts
    let crushedString = crushed.a;
    if (crushed.b.length)
        crushedString += delimiter + crushed.b;

    // encode URI
    return encodeURIComponent(crushedString);
}

function jsonUncrush(string: string) {
    // string must be a decoded URI component, searchParams.get() does this automatically

    // unsplit the string using the delimiter
    const stringParts = string.split('\u0001');

    // JSUncrush algorithm
    let uncrushedString = stringParts[0];
    if (stringParts.length > 1) {
        const splitString = stringParts[1];
        for (const character of splitString) {
            // split the string using the current splitCharacter
            const splitArray = uncrushedString.split(character);

            // rejoin the string with the last element from the split
            uncrushedString = splitArray.join(splitArray.pop());
        }
    }

    // unswap the json characters in reverse direction
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return jsonCrushSwap(uncrushedString, 0);
}


function jsonCrushSwap(string: string, forward = 1) {
    // swap out characters for lesser used ones that wont get escaped
    const swapGroups = [
        ['"', "'"],
        ["':", "!"],
        [",'", "~"],
        ['}', ")", '\\', '\\'],
        ['{', "(", '\\', '\\'],
    ];
    const Swap = (string: string, g: Array<string>) => {
        const regex = new RegExp(`${(g[2] ? g[2] : '') + g[0]}|${(g[3] ? g[3] : '') + g[1]}`, 'g');
        return string.replace(regex, $1 => ($1 === g[0] ? g[1] : g[0]));
    };
    // need to be able to swap characters in reverse direction for uncrush
    if (forward)
        for (let i = 0; i < swapGroups.length; ++i)
            string = Swap(string, swapGroups[i]);
    else
        for (let i = swapGroups.length; i--;)
            string = Swap(string, swapGroups[i]);
    return string;
}

export {
    jsonCrush,
    jsonUncrush
}