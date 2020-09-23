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

function randomPos(length) {
  return Math.trunc(Math.random() * length);
}

function getSentences(sentence = "", current) {
  const next =
    randomPos(WORDS.length / 2) + current || randomPos(WORDS.length / 2);
  if (next < WORDS.length - 1) {
    return getSentences(`${sentence} ${WORDS[next]}`, next);
  }
  return sentence;
}

function generate(how) {
  return new Array(how).fill(null).map(function (_, i) {
    return { id: `Element-${i}`, content: getSentences() };
  });
}

export default generate;
