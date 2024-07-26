import { v4 as uuidv4 } from "uuid";

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
  addProductsToDatabase: (
    products: SearchResults,
    img_url: string
  ) => Promise<void>,
  resetForm: () => void,
  setIsLoading: (isLoading: boolean) => void
) => {
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

    const { data, imgURL } = await response.json();
    console.log(imgURL);
    // Add unique IDs to each product
    const productsWithIds = data.results.map((product: Product) => ({
      ...product,
      id: uuidv4(),
    }));

    setResults(productsWithIds);

    // Add the results to the database
    const search_id = await addProductsToDatabase(productsWithIds, imgURL);
    resetForm();
    setIsLoading(false);
    return search_id;
  } catch (error) {
    console.error("Search failed:", error);
    setIsLoading(false);
  }
};

export const addProductsToDatabase = async (
  products: SearchResults,
  img_url: string
) => {
  try {
    console.log("Adding products to database:", products);
    const response = await fetch("/api/postProductDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products, img_url }),
    });

    const data = await response.json();
    const search_id = data.searchId;
    if (response.ok) {
      console.log("Products added successfully:", data.message);
      return search_id;
    } else {
      console.error("Error adding products:", data.error);
    }
  } catch (error) {
    console.error("Error adding products:", error);
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
