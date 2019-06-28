
# /Reg(ul\[ae\]r)?\[\\s_-\]\*Ex(pres{2}ions?|p)?/i

The mess of a title you see above isn't as messy as it might first seem. Despite it's seemingly irregular patterns that clutter what might otherwise look like a word, that string of symbols is called a *Regular Expression*. Let's start by looking at a much simpler regex, `/hello/`. If you were to test this regex against this string `"hello world"`, you would *match* `"hello"`.

```js
// Regex example in JavaScript

const string = 'Three hundred flies flew over the fried rice.';

const match = string.match(/flies/);    // Search for "flies" with regex
const index = string.indexOf('flies');  // Search for "flies" with <String>.indexOf()

if (match !== null) console.log('String contains "flies"!');
if (index !== -1  ) console.log('String contains "flies"!');
```

In the above example, regex is used to check if a string contains the word "flies". Since the string does contain that word, it will "match" the word, and return something that is not `null`. If it fails to match (the string doesn't contain "flies"), it will return `null`. Below the line that tries to match a regex, is a line that does the same with ``<String>.indexOf()``. That function returns the position (index) of the first *occurrence* of a substring in a different string. If it doesn't find any occurrence of that substring, it will return `-1` instead. This function is faster than ``<String>.match()``, because the match function is capable of a lot **more**.

## Match output

Different regex implementations may have different forms of output. Some software that lets you search with regex, will usually just *highlight* the matching sequences, and/or let you jump to them. In JavaScript, the ``<String>.match()`` function returns an array, but it has some extra properties added. The ``0`` index of the array holds the matched substring, which in the case of the example above is just `'flies'`. The array also has a ``<Match>.index`` variable which holds the position of the match, same way ``<String>.indexOf()`` works. Lastly, it has a ``<Match>.input`` variable which holds the input string. In the case of the example above, that would be `'Three hundred flies flew over the fried rice.'`. With the way we've used the match function so far, it will only ever have one index, making it a pretty weird array, however we'll see why it is an array later.

## Alternative matches

Say you're searching through the entirety of the e-book, [The Witcher: Sword of Destiny](https://www.amazon.com/Sword-Destiny-Witcher-Andrzej-Sapkowski/dp/0316389706), and you want to figure out *exactly* how many times the word "diverge" is mentioned. Just searching for the word "diverge" won't do. What about when he writes "diverging" or "diverged"? You'd have to search multiple times with different strings. Here is where /regex/ and normal "strings" differ. Strings consist of characters ("a", "b", "x", "\_", "9", ".", etc.), but regular expressions consist of *tokens*. Many of these tokens simply represent a character, /a/ = "a", /b/ = "b", /x/ = "x", /\_/ = "\_", /9/ = "9", however some tokens represent different *patterns*. `/./` for example, represents "any character". If you were to match something against `/./`, any character of any string would match it. The only case where `string.match(/./)` returns null is if `string` is empty (`""`). This is why it's called *matching* instead of something like *searching* - you're trying to match *patterns*. If you want to match a character which already has a use, like `/./`, you can *escape* it with a backslash (`\`). `/\./` matches ``"."``.

```js
const string = 'The diverging path diverged between the ' +
               'divergent forest and the divine swamp.';

console.log(string.match(/diverge|diverging|divergent|divine|divorce/));
// > [ 'diverging' ]
```

Using the pipe (``|``) symbol token, you can search for an occurrence of something *or* something else *or* something else and so on. All in all, this regex matches ``diverging``, ``diverged``, ``divergent`` and ``divine``. It does not match ``divorce``, since that isn't in the input string. One problem with this is that even though it is able to match multiple words, and even through the match function returns an array, it will only ever match the first ``diverging``, and then stop *parsing* the string. Once it has matched one thing, it's satisfied. To match all occurrences in the string, you could use the ``g`` flag (short for "global") on the regex.

```js
const string = 'The diverging path diverged between the ' +
               'divergent forest and the divine swamp.';

console.log(string.match(/diverge|diverging|divergent|divine|divorce/g));
// > [ 'diverging', 'diverged', 'divergent', 'divine' ]
```

This makes the regex search the whole string, and not stop after it has found a match. It also changes the out to be an array of each matched word, but it looses the variables ``<Match>.input`` and ``<Match>.index``.

## Grouping characters

The regex we have above is really just a list of words it tries to match. We can make the list shorter, and the regex faster by using *capturing groups*. There are also *non-capturing groups* which are even faster, but we'll look at later. A capturing group is defined simply by wrapping some characters in ``(parentheses)``.

```js
const regex = /div(erge|erging|ergent|ine|orce)/g
```

Here we removed 'div' from each word, and out it outside a capturing group. The "or" pipes are only scoped to their capturing group. This regex matches the same as the previous regex, but it's faster and more compact. It can be made even faster and more compact by using more character groups. You can also use the non-capturing character group by placing ``?:`` after the opening parenthesis.

```js
const regex = /div(?:erg(?:ent|e|ing)|ine|orce)/g
```

Here we did the same as before, but with ``erg`` from "ergent", "erging" and "erge", and turned the capturing groups into non-capturing groups. Note that regex want's to be done matching as soon as possible, which means if it tries matching the word "divergent" but your regex says ``/diverge|divergent/``, it'll only match ``diverge`` and call it a day. To avoid this, and assure you match everything you need, swap the orders so that the longer versions of similar patterns come first. `/divergent|diverge/`.


Finally, what does the capturing group really do? It allows you to see what substring was matched with your regex (as long as you don't use the ``g`` flag). Each capturing group will output it's value into the array. The first matched character group will occupy the ``1`` index, the 2nd the ``2`` index, and so on. The non-capturing groups do not output anything, and instead only serve to scope parts of a regex. The capturing groups are numbered from left to right. To figure out which number a capturing group has, you can simply count all opening parentheses, except the non-capturing groups, from the start to end.

```js
const string = 'The diverging path diverged between the ' +
               'divergent forest and the divine swamp.';

// Will stop at first match, "diverging"
console.log(string.match(/(di)v(erg(ent|e|ing)|ine|orce)/));
// > [ 'diverging', 'di', 'erging', 'ing' ]
```

## Repetition

No no, we're not repeating what I've explained above, repetition is a near fundamental useful concept within regex. You have the ability to repeat characters, tokens, or even whole patterns (enclosed in capturing groups) with regex.

```js
const string = 'Hello....... World....';

console.log(string.match(/\.+/g));
console.log(string.match(/\.*/g));
console.log(string.match(/\.{2,4}/g));
```
