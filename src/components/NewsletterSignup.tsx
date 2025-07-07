// src/components/NewsletterSignup.tsx

export default function NewsletterSignup() {
  return (
    <section className="py-20 bg-gray-100 px-5 text-center">
      <h2 className="text-4xl font-semibold mb-4">Stay in the Loop</h2>
      <p className="mb-8 text-lg text-gray-700">
        Join our newsletter for exclusive deals and the latest trends!
      </p>
      <form
        className="flex justify-center max-w-xl mx-auto"
        onSubmit={e => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Enter your email address"
          aria-label="Email"
          className="flex-1 px-4 py-3 rounded-l-md border border-gray-300"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white font-medium rounded-r-md hover:bg-gray-900 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
