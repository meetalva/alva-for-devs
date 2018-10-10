> Demo repository for the "Alva for devs" talk at SinnerSchrader engineering offsite 2018

# Alva for devs

* Simple stateless component: ([Code](./src/reverser.tsx) | [Demo](./demos/01-reverser.alva))
* Stateless component with interaction: ([Code](./src/field.tsx) | [Demo](./demos/02-mousemove.alva))
* Stateful component plugging into Meetup API: ([Code](./src/meetup.tsx) | [Demo](./demos/03-meetup.alva))

## Getting started

```
git clone https://github.com/sinnerschrader/alva-for-devs.git
cd alva-for-devs
yarn 
echo "export const key = '<your-meetup-api-key>' > src/key.ts"
yarn build -w
```

## License

MIT