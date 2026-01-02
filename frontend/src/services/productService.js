export const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:8083/api/products');
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
       return await response.json();
    } else {
        // Fallback for non-json responses or empty responses if needed
        return [];
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Return empty array or handle error appropriately in UI
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8083/api/products/${id}`);
    if (!response.ok) {
        if (response.status === 404) {
            return null; 
        }
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.result; // Access the 'result' field from ApiResponse
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw error;
  }
};
