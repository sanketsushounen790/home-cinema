export const metadata = {
  title: "Disclaimer - Home Cinema",
  description: "Disclaimer and Legal Information for Home Cinema",
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="prose prose-sm sm:prose-base lg:prose-lg mx-auto bg-base-100 p-8 rounded-2xl shadow-lg border border-base-200 max-h-[70vh] overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-primary">Disclaimer</h1>
        
        <p className="mb-4 text-lg">
          This <strong>Home Cinema</strong> project is created purely for <strong>educational and showcase purposes</strong> (Portfolio Project).
        </p>
        <p className="mb-4 text-lg">
          I <strong>do not</strong> host, provide, or distribute any pirated movies or video streaming content. All displayed data (including images, movie information, metadata, etc.) is fetched via free third-party APIs solely for the purpose of illustrating the user interface.
        </p>

        <div className="mt-8 p-5 bg-warning/10 border-l-4 border-warning rounded-r-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center text-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Note on TMDB Data
          </h3>
          <p className="text-base text-base-content mb-2">
            Since the data is sourced from TMDB, some movies may not be fully translated into all languages due to a lack of user contributions. As a result, if you select a language that lacks a translation, the system will automatically fall back to English or the movie's original production language.
          </p>
          <p className="text-base text-base-content m-0">
            Additionally, other metadata may also be incomplete for less popular or obscure movies due to this same reliance on community contributions.
          </p>
        </div>
      </div>
    </div>
  );
}
