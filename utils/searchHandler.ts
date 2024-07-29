interface Product {
  id?: string;
  delivery?: string;
  image: string;
  title: string;
  rating?: string | number; // Rating as a string in the format "x/y"
  price: string; // Price as a string with currency symbol
  logo: string; // Base64 encoded logo
  link: string;
  source?: string; // Site name
}
type SearchResults = Product[];

export const handleSearch = async (
  searchQuery: string,
  setResults: (results: SearchResults) => void,
  resetForm: () => void,
  setIsLoading: (isLoading: boolean) => void
): Promise<{
  search_id?: string;
  imgURL?: string;
  results: SearchResults;
} | null> => {
  try {
    setIsLoading(true);

    if (!searchQuery) {
      throw new Error(
        "Please upload a file or paste an image URL in the text input!"
      );
    }

    const response = await fetch("/api/getSearchResult", {
      method: "POST",
      body: JSON.stringify({ searchFound: searchQuery }),
    });

    if (!response.ok) throw new Error("Status code: " + response.status);

    const { results, imgURL, search_id } = await response.json();
    console.log(imgURL);

    setResults(results);

    resetForm();
    setIsLoading(false);

    if (!search_id) {
      return null;
    }

    return { search_id, imgURL, results };
  } catch (error) {
    console.error("Search failed:", error);
    setIsLoading(false);
    return null;
  }
};

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
