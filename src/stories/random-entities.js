const WORDS = [
  "sed",
  "ut",
  "perspiciatis",
  "unde",
  "omnis",
  "iste",
  "natus",
  "error",
  "sit",
  "voluptatem",
  "accusantium",
  "doloremque",
  "laudantium",
  "totam",
  "rem",
  "aperiam",
  "eaque",
  "ipsa",
  "quae",
  "ab",
  "illo",
  "inventore",
  "veritatis",
  "et",
  "quasi",
  "architecto",
  "beatae",
  "vitae",
  "dicta",
  "sunt",
  "explicabo",
];

export function getRandomWord() {
  return WORDS[randomInt(WORDS.length)];
}

export function randomInt(length) {
  return Math.trunc(Math.random() * length);
}

export function getSentence(sentence = "", current) {
  const next =
    randomInt(WORDS.length / 2) + current || randomInt(WORDS.length / 2);
  if (next < WORDS.length - 1) {
    return getSentence(`${sentence} ${WORDS[next]}`, next);
  }
  return sentence;
}

function generate(how) {
  return new Array(how).fill(null).map(function (_, i) {
    return { id: `Element-${i}`, content: getSentence() };
  });
}

export default generate;
