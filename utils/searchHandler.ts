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
): Promise<{
  search_id?: string;
  imgURL?: string;
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

    const { data, imgURL } = await response.json();
    console.log(imgURL);
    // Add unique IDs to each product
    const productsWithIds = data.results.map((product: Product) => ({
      ...product,
      id: uuidv4(),
    }));

    setResults(productsWithIds);

    // Add the results to the database
    const search_id =
      (await addProductsToDatabase(productsWithIds, imgURL)) ?? "";

    resetForm();
    setIsLoading(false);

    if (!search_id) {
      return null;
    }

    return { search_id, imgURL };
  } catch (error) {
    console.error("Search failed:", error);
    setIsLoading(false);
    return null;
  }
};

export const handleSearchStreaming = async (
  searchQuery: string,
  setResults: (results: SearchResults) => void,
  addProductsToDatabase: (
    products: SearchResults,
    img_url: string,
    searchId?: string
  ) => Promise<string | void>,
  resetForm: () => void,
  setIsLoading: (isLoading: boolean) => void,
  results?: SearchResults,
  callback?: (searchId: string) => Promise<void>
): Promise<void> => {
  try {
    setIsLoading(true);

    if (!searchQuery) {
      throw new Error(
        "Please upload a file or paste an image URL in the text input!"
      );
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "text/event-stream" },
      body: JSON.stringify({ imgURL: searchQuery }),
    };

    const endpoint = "http://localhost:8000/search-stream";

    const response = await fetch(endpoint, requestOptions);
    const reader = response.body.getReader();
    let lastTime = Date.now();
    let searchId: string | null = null;

    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            resetForm();
            setIsLoading(false);
            break;
          }

          const currentTime = Date.now();
          const timeElapsed = currentTime - lastTime;
          console.log(`Time elapsed since last chunk: ${timeElapsed / 1000}s`);

          const text = new TextDecoder().decode(value);
          const responseJsonStr = text.replace("data: ", "");
          const products = JSON.parse(responseJsonStr);

          console.log("products fetched", { searchQuery, products });
          const productsWithIds = products.map((product: Product) => ({
            ...product,
            id: uuidv4(),
          }));

          setResults([...(results as SearchResults), ...productsWithIds]);

          if (!searchId) {
            searchId =
              (await addProductsToDatabase(productsWithIds, searchQuery)) ?? "";
            if (callback) {
              await callback(searchId);
            }
          } else {
            await addProductsToDatabase(productsWithIds, searchQuery, searchId);
          }

          controller.enqueue(value);
          lastTime = currentTime;
        }
        controller.close();
        reader.releaseLock();
      },
    });

    await new Response(stream).text();
  } catch (error) {
    console.error("Search failed:", error);
    setIsLoading(false);
  }
};

export const addProductsToDatabase = async (
  products: SearchResults,
  img_url: string,
  searchId?: string
): Promise<string | void> => {
  try {
    let requestBody: any = { products, img_url };

    if (searchId) {
      requestBody.searchId = searchId;
    }

    console.log("Adding products to database:", products);
    const response = await fetch("/api/postProductDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Products added successfully:", data.message);
      return data.searchId;
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
