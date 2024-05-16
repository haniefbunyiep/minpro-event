export default function PartnerPage() {
  return (
    <section className="min-h-screen bg-gray-100 px-10 pt-10 text-gray-800">
      <div className="container mx-auto grid gap-6 text-center lg:grid-cols-2 xl:grid-cols-5">
        <div className="w-full rounded-md bg-gray-50 px-6 py-16 sm:px-12 md:px-16 xl:col-span-2">
          <span className="mb-2 block text-sky-600">Heptatix</span>
          <h1 className="text-5xl font-extrabold text-gray-900">
            Partnership with Heptatix
          </h1>
          <p className="my-8">
            <span className="font-medium text-gray-900">Heptatix </span>
            adalah sebuah perusahaan Startup yang menyediakan layanan bagi Event
            Organizer untuk menyelenggarakan Event ataupun Costumer untuk
            melakukan transaksi pembelian tiket Event.
          </p>
          <form noValidate="" action="" className="space-y-3 self-stretch">
            <div>
              <label htmlFor="name" className="sr-only text-sm">
                Your name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="h-[50px] w-full rounded-md border-gray-300 focus:ring focus:ring-sky-600"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="sr-only text-sm">
                Email address
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Email address"
                className="h-[50px] w-full rounded-md border-gray-300 focus:ring focus:ring-sky-600"
              />
            </div>
            <button
              type="button"
              className="w-full rounded bg-sky-600 py-2 font-semibold text-gray-50"
            >
              Join the partnership
            </button>
          </form>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="h-[500px] w-full rounded-md object-cover xl:col-span-3"
        >
          <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
        </svg>
      </div>
    </section>
  );
}
