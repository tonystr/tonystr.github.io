
# /Reg(ul\[ae\]r)?\[\\s_-\]\*Ex(pres{2}ions?|p)?/i

The mess of a title you see above isn't as messy as it might first seem. Despite it's seemingly irregular patterns that clutter what might otherwise look like a word, that string of symbols is called a *Regular Expression*. (Almost) Each character represents a *token*, which is used to *parse* text. Let's start with a much simpler regex, `/hello/`. If you were to test this regex against this string `"hello world"`, you would *match* `"hello"`.

```js
const string = 'Three hundred flies flied over the fried rice.'

const match = string.match(/flies/);    // Search for "flies" with regex
const index = string.indexOf('flies');  // Search for "flies" with string.indexOf()

if (match !== null) console.log('String contains "flies"!');
if (index !== -1)   console.log('String contains "flies"!');
```

In the above example, regex is used to check if a string contains the word "flies". Since the string does contain that word, it will "match" the word, and return something that is not `null`. If it fails to match (the string doesn't contain "flies"), it will return `null`. 
