# Ask Jesse Chatbot
An AI chatbot powered by OpenAI's GPT-3 natural language model. Logo inspired by early 2000's internet search legend Ask Jeeves.

**Link to project:** https://askjesse.vercel.app
![ask-jesse](https://user-images.githubusercontent.com/106822556/227814166-506c98fb-d1bd-492d-91fb-0f5f44c21037.gif)

## How It's Made
Tech used: [Node](https://nodejs.org/), [React](https://reactjs.org/), [Next.js](https://nextjs.org/)

Starting with the [openai-quickstart-node](https://github.com/openai/openai-quickstart-node) repo, I followed the [docs](https://platform.openai.com/docs/quickstart) for getting the app running properly. Once I felt comfortable understanding what was happening in the codebase, I began tweaking the parameters on the API request to see how it affects the output. Since the original code was for a superhero pet name generator, the API was being queried to specifically return exactly three superhero pet names. I swapped that out to instead return the response to whatever the user inputs. Then I set `max_tokens: 3000` to allow the API to respond with enough characters to show complete responses - otherwise, most responses would get cut off mid sentence due to the token limit.

## Optimizations
I kept the frontend super simple on purpose, but I would like to experiment with it more to make sure it's optimized for all devices. I would also like to try implementing some other cababilities that come with the API such as image generation and code completion.

## Lessons Learned
The most important takeaway I got from this project is to ***always read the docs!*** I spent way too much time googling API requests and browsing stack overflow threads when all of the information I needed was laid out perfectly in the docs.
