declare module '*.svelte' {
	export { SvelteComponent as default } from 'svelte';
}

/**
 * Declares reactive state.
 *
 * Example:
 * ```ts
 * let count = $state(0);
 * ```
 *
 * https://svelte-5-preview.vercel.app/docs/runes#$state
 *
 * @param initial The initial value
 */
declare function $state<T>(initial: T): T;
declare function $state<T>(): T | undefined;

/**
 * Declares derived state, i.e. one that depends on other state variables.
 * The expression inside `$derived(...)` should be free of side-effects.
 *
 * Example:
 * ```ts
 * let double = $derived(count * 2);
 * ```
 *
 * https://svelte-5-preview.vercel.app/docs/runes#$derived
 *
 * @param expression The derived state expression
 */
declare function $derived<T>(expression: T): T;

/**
 * Runs code when a component is mounted to the DOM, and then whenever its dependencies change, i.e. `$state` or `$derived` values.
 * The timing of the execution is after the DOM has been updated.
 *
 * Example:
 * ```ts
 * $effect(() => console.log('The count is now ' + count));
 * ```
 *
 * If you return a function from the effect, it will be called right before the effect is run again, or when the component is unmounted.
 *
 * Does not run during server side rendering.
 *
 * https://svelte-5-preview.vercel.app/docs/runes#$effect
 * @param fn The function to execute
 */
declare function $effect(fn: () => void | (() => void)): void;

declare namespace $effect {
	/**
	 * Runs code right before a component is mounted to the DOM, and then whenever its dependencies change, i.e. `$state` or `$derived` values.
	 * The timing of the execution is right before the DOM is updated.
	 *
	 * Example:
	 * ```ts
	 * $effect.pre(() => console.log('The count is now ' + count));
	 * ```
	 *
	 * If you return a function from the effect, it will be called right before the effect is run again, or when the component is unmounted.
	 *
	 * Does not run during server side rendering.
	 *
	 * https://svelte-5-preview.vercel.app/docs/runes#$effect-pre
	 * @param fn The function to execute
	 */
	export function pre(fn: () => void | (() => void)): void;

	/**
	 * The `$effect.active` rune is an advanced feature that tells you whether or not the code is running inside an effect or inside your template.
	 *
	 * Example:
	 * ```svelte
	 * <script>
	 *   console.log('in component setup:', $effect.active()); // false
	 *
	 *   $effect(() => {
	 *     console.log('in effect:', $effect.active()); // true
	 *   });
	 * </script>
	 *
	 * <p>in template: {$effect.active()}</p> <!-- true -->
	 * ```
	 *
	 * This allows you to (for example) add things like subscriptions without causing memory leaks, by putting them in child effects.
	 *
	 * https://svelte-5-preview.vercel.app/docs/runes#$effect-active
	 */
	export function active(): boolean;
}

/**
 * Declares the props that a component accepts. Example:
 *
 * ```ts
 * let { optionalProp = 42, requiredProp } = $props<{ optionalProp?: number; requiredProps: string}>();
 * ```
 *
 * https://svelte-5-preview.vercel.app/docs/runes#$props
 */
declare function $props<T>(): T;

/**
 * Deeply tracks and `console.log`s any values passed to the rune. Example:
 *
 * ```ts
 * $log(someValue, someOtherValue)
 * ```
 *
 * https://svelte-5-preview.vercel.app/docs/runes#$log
 */
declare function $log(): void;

declare namespace $log {
	/**
	 * Deeply tracks and `console.log`s any values passed to the rune and pauses execution with
	 * a debugger break point.
	 *
	 * ```ts
	 * $log.break(someValue, someOtherValue)
	 * ```
	 *
	 * https://svelte-5-preview.vercel.app/docs/runes#$log-break
	 */
	function break_fn(): void;

	export { break_fn as break };

	/**
	 * Deeply tracks and `console.log`s any values passed to the rune and also traces the call-sites
	 * where state gets mutated. Example:
	 *
	 * ```ts
	 * $log.trace(someValue, someOtherValue)
	 * ```
	 *
	 * https://svelte-5-preview.vercel.app/docs/runes#$log-trace
	 */
	export function trace(): void;

	/**
	 * Deeply tracks and `console.table`s any values passed to the rune. Example:
	 *
	 * ```ts
	 * $log.table(someDataCollection)
	 * ```
	 *
	 * https://svelte-5-preview.vercel.app/docs/runes#$log-table
	 */
	export function table(): void;
}
