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

export const createProduct = async (productData) => {
  try {
    const response = await fetch('http://localhost:8083/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Create product failed:", error);
    throw error;
  }
};

export const fetchManufacturers = async () => {
    try {
        const response = await fetch('http://localhost:8083/api/manufacturers');
        if (!response.ok) throw new Error('Failed to fetch manufacturers');
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Fetch manufacturers failed:", error);
        return [];
    }
};

export const fetchSeries = async () => {
    try {
        const response = await fetch('http://localhost:8083/api/series');
        if (!response.ok) throw new Error('Failed to fetch series');
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Fetch series failed:", error);
        return [];
    }
};

export const fetchCategories = async () => {
    try {
        const response = await fetch('http://localhost:8083/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Fetch categories failed:", error);
        return [];
    }
};

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:8083/api/products/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const data = await response.json();
        return data.result.imageUrl; // Expecting { result: { imageUrl: "..." } }
    } catch (error) {
        console.error("Upload image failed:", error);
        throw error;
    }
};
