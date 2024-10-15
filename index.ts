import { Effect, Console, Match } from "effect";

const match_age = Match.type<{ age: number }>().pipe(
	Match.when({ age: (age) => age >= 5 }, (user) => `Age: ${user.age}`),
	Match.orElse((user) => `${user.age} is too young`)
)

const main = Console.log(match_age({ age: 5 }))
Effect.runSync(main)
