export const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:8888/api/products');
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
    const response = await fetch(`http://localhost:8888/api/products/${id}`);
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
    const response = await fetch('http://localhost:8888/api/products', {
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

export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`http://localhost:8888/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to update product');
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error(`Update product ${id} failed:`, error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:8888/api/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return true;
  } catch (error) {
    console.error(`Delete product ${id} failed:`, error);
    throw error;
  }
};

// --- Manufacturers ---

export const fetchManufacturers = async () => {
    try {
        const response = await fetch('http://localhost:8888/api/manufacturers');
        if (!response.ok) throw new Error('Failed to fetch manufacturers');
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Fetch manufacturers failed:", error);
        return [];
    }
};

export const createManufacturer = async (data) => {
    try {
        const response = await fetch('http://localhost:8888/api/manufacturers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create manufacturer');
        return (await response.json()).result;
    } catch (error) {
        throw error;
    }
};

export const updateManufacturer = async (id, data) => {
    try {
        const response = await fetch(`http://localhost:8888/api/manufacturers/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update manufacturer');
        return (await response.json()).result;
    } catch (error) {
        throw error;
    }
};

export const deleteManufacturer = async (id) => {
    try {
        const response = await fetch(`http://localhost:8888/api/manufacturers/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete manufacturer');
        return true;
    } catch (error) {
        throw error;
    }
};

// --- Series ---

export const fetchSeries = async () => {
    try {
        const response = await fetch('http://localhost:8888/api/series');
        if (!response.ok) throw new Error('Failed to fetch series');
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Fetch series failed:", error);
        return [];
    }
};

export const createSeries = async (data) => {
    try {
        const response = await fetch('http://localhost:8888/api/series', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create series');
        return (await response.json()).result;
    } catch (error) {
        throw error;
    }
};

export const updateSeries = async (id, data) => {
    try {
        const response = await fetch(`http://localhost:8888/api/series/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update series');
        return (await response.json()).result;
    } catch (error) {
        throw error;
    }
};

export const deleteSeries = async (id) => {
    try {
        const response = await fetch(`http://localhost:8888/api/series/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete series');
        return true;
    } catch (error) {
        throw error;
    }
};

// --- Categories ---

export const fetchCategories = async () => {
    try {
        const response = await fetch('http://localhost:8888/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Fetch categories failed:", error);
        return [];
    }
};

export const createCategory = async (data) => {
    try {
        const response = await fetch('http://localhost:8888/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create category');
        return (await response.json()).result;
    } catch (error) {
        throw error;
    }
};

export const updateCategory = async (id, data) => {
    try {
        const response = await fetch(`http://localhost:8888/api/categories/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update category');
        return (await response.json()).result;
    } catch (error) {
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await fetch(`http://localhost:8888/api/categories/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete category');
        return true;
    } catch (error) {
        throw error;
    }
};

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:8888/api/products/upload', {
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
