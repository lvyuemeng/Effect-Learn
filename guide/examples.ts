import { Console, Effect } from "effect";

const fibnacci = (num: number): Effect.Effect<number, string> => Effect.suspend(
	() => {
		if (num < 0) {
			return Effect.fail("num < 0")
		}

		if (num <= 1) {
			return Effect.succeed(1)
		}

		return Effect.zipWith(Effect.suspend(() => fibnacci(num - 1)), Effect.suspend(() => fibnacci(num - 2)), (a, b) => {
			Effect.tap(console.log(`${a + b}`))
			return a + b
		})
	}
)

const fib_memo = (num: number): Effect.Effect<number, string> => {
	if (num < 0) {
		return Effect.fail("num < 0")
	}

	const memo = new Map()

	const fib = (n: number): number => {
		if (n in memo) return memo.get(n)!
		if (n <= 1) return 1;

		const res = fib(n - 1) + fib(n - 2)
		memo.set(n, res)
		return res
	}

	return Effect.succeed(fib(num))
}

// console.log(Effect.runSync(fibnacci(21)))
// console.log(Effect.runSync(fib_memo(21)))



