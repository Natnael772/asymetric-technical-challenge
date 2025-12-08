export default function NewsletterSection() {
  return (
    <section className="border-t border-zinc-200 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
            Stay in the loop
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Get notified when we publish new articles. No spam, unsubscribe
            anytime.
          </p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-zinc-200 bg-white px-5 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 sm:w-72"
            />
            <button
              type="submit"
              className="rounded-xl bg-zinc-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
