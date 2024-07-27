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
  ) => Promise<void>,
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

    const netStartTime = Date.now();

    console.log("Sending POST request to the server...");
    // Use fetch to send the POST request
    const response = fetch(endpoint, requestOptions)
      .then((response: any) => {
        // The response is an event stream, so we process it accordingly
        const reader = response.body.getReader();
        let lastTime = Date.now();
        let searchId: string | null = null;

        return new ReadableStream({
          async start(controller) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                resetForm();
                setIsLoading(false);
                break;
              }
              // Assuming the server sends UTF-8 encoded text
              const currentTime = Date.now();
              const timeElapsed = currentTime - lastTime;
              console.log(
                `Time elapsed since last chunk: ${timeElapsed / 1000}s`
              );
              const text = new TextDecoder().decode(value);
              console.log(text); // Log each chunk of data
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
                  (await addProductsToDatabase(productsWithIds, searchQuery)) ??
                  "";
                if (callback) {
                  callback(searchId);
                }
              } else {
                addProductsToDatabase(productsWithIds, searchQuery, searchId);
              }

              controller.enqueue(value);
            }
            controller.close();
            reader.releaseLock();
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setIsLoading(false);
      });
  } catch (error) {
    console.error("Search failed:", error);
    setIsLoading(false);
  }
};

export const addProductsToDatabase = async (
  products: SearchResults,
  img_url: string,
  searchId?: string
) => {
  try {
    let requestBody: any = { products, img_url };

    if (searchId) {
      requestBody = { ...requestBody, searchId };
    }

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
