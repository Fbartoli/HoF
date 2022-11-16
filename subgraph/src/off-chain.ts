interface TokenType {
  id: number;
  price: number;
  uri: string;
  imageUri: string;
}

export const BASE_URI: string =
  "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/";

export const BASE_IMAGE_URI: string =
  "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/";

export const TOKEN_PRICES: i32[] = [200, 150, 125, 100, 75, 50, 25, 10, 5, 1];
export const TOKEN_URIS: string[] = [
  "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5490.json",
  "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5491.json",
  "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5492.json",
  "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5493.json",
  "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5494.json",
  "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5495.json",
  "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5496.json",
  "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5497.json",
  "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5498.json",
  "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5499.json",
];
export const TOKEN_IMAGE_URIS: string[] = [
  "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/1.png",
  "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/2.png",
  "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/3.png",
  "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/4.png",
  "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/5.png",
  "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/6.png",
  "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/7.png",
  "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/8.png",
  "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/9.png",
  "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/10.png",
];

// export const TOKENS: TokenType[] = [
//   {
//     id: 1,
//     price: 200,
//     uri: "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5490.json",
//     imageUri: "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/1.png",
//   },
//   {
//     id: 2,
//     price: 150,
//     uri: "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5491.json",
//     imageUri: "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/2.png",
//   },
//   {
//     id: 3,
//     price: 250,
//     uri: "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5492.json",
//     imageUri: "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/3.png",
//   },
//   {
//     id: 4,
//     price: 20,
//     uri: "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5493.json",
//     imageUri: "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/4.png",
//   },
//   {
//     id: 5,
//     price: 50,
//     uri: "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5494.json",
//     imageUri: "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/5.png",
//   },
//   {
//     id: 6,
//     price: 100,
//     uri: "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5495.json",
//     imageUri: "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/6.png",
//   },
//   {
//     id: 7,
//     price: 200,
//     uri: "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5496.json",
//     imageUri: "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/7.png",
//   },
//   {
//     id: 8,
//     price: 100,
//     uri: "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5497.json",
//     imageUri: "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/8.png",
//   },
//   {
//     id: 9,
//     price: 100,
//     uri: "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5498.json",
//     imageUri: "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/9.png",
//   },
//   {
//     id: 10,
//     price: 100,
//     uri: "ipfs://QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/5499.json",
//     imageUri: "ipfs://QmUVjj5XqJSsfj4ajwv1HUzSFQJCLp6BFmCC45VhwhduYr/10.png",
//   },
// ];
