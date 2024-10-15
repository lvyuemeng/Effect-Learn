import { Console, Effect, Either, Match, pipe, Schedule } from "effect";
import * as NodeFS from "node:fs"

// Example of Effect Apply
//
const log_eff = (msg: string) => Effect.sync(() => { Console.log(msg) })

const parse_eff = (input: string) => Effect.try({ try: () => JSON.parse(input), catch: (err) => new Error(`Something went wrong ${err}`) })

const read_file_eff = (filename: string) => Effect.async<Buffer, Error>((resume) => {
	NodeFS.readFile(filename, (err, data) => {
		if (err) {
			resume(Effect.fail(err))
		}
		else {
			resume(Effect.succeed(data))
		}
	})
})

const divide_eff = (a: number, b: number) => Effect.suspend(() => b === 0 ? Effect.fail(new Error("Divide zero")) : Effect.succeed(a / b))

const seq_1 = Effect.repeat(Console.log("running..."), Schedule.spaced("200 millis"))

// Fork is a base of runPromise / runSync
// Effect.runFork(seq_1)

const fetch_num = Effect.promise(() => Promise.resolve(100))
const op_add = (num: number) => num + 1
const applyDiscount = (
	total: number,
	discountRate: number
): Effect.Effect<number, Error> =>
	discountRate === 0
		? Effect.fail(new Error("Discount rate cannot be zero"))
		: Effect.succeed(total - (total * discountRate) / 100)

const res_1 = pipe(fetch_num, Effect.map(op_add))
const res_2 = fetch_num.pipe(Effect.andThen(op_add), Effect.andThen((num) => applyDiscount(num, 5)))
// Effect.runPromise(res_1).then(console.log)
// Effect.runPromise(res_2).then(console.log)

// Pattern Match

const match_either = Match.type<Either.Either<number, string>>().pipe(
	Match.tag("Right", (_) => _.right),
	Match.tag("Left", (_) => _.left),
	Match.exhaustive
)

console.log(match_either(Either.right(42)))





