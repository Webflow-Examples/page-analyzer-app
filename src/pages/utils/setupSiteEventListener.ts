export default async function () {
  let siteId;
  let pageData;
  const siteSelectEl = document.getElementById("site") as HTMLSelectElement;

  const onSiteChange = async (e: Event) => {
    const siteIdValue = (e?.target as HTMLSelectElement).value;
    if (siteIdValue) {
      siteId = siteIdValue;
      let pagesResponse = await fetch(
        `https://${window.location.hostname}/api/pages?siteId=${siteId}`
      );
      pageData = await pagesResponse.json();

      // Astro doesn't support dynamic content after SSR, so injecting markup in
      // the form manually
      const formEl = document.getElementById("page-analysis-form");
      const pagesMarkup = `
				<label for="page" class="sr-only">Select a Page to test</label>
				<select id="page" name="page" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option selected>Select a Webflow Page</option>
					${pageData.pages.map(
            (page) => `<option value=${page.id}>${page.title}</option>`
          )}
				</select>
				<button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
			`;
      formEl.insertAdjacentHTML("beforeend", pagesMarkup);
    }
  };

  siteSelectEl.addEventListener("change", onSiteChange);
}
