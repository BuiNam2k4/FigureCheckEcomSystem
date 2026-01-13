const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888') + '/api';

export const createListing = async (listingData) => {
  try {
    const response = await fetch(`${API_URL}/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create listing');
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Create listing failed:", error);
    throw error;
  }
};

export const getListingsByUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/listings/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user listings');
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Fetch user listings failed:", error);
    throw error;
  }
};

export const getAllListings = async () => {
    try {
      const response = await fetch(`${API_URL}/listings`);
      if (!response.ok) throw new Error('Failed to fetch listings');
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("Fetch listings failed:", error);
      throw error;
    }
  };

export const getListingsByProduct = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/listings/product/${productId}`);
    if (!response.ok) throw new Error('Failed to fetch product listings');
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Fetch product listings failed:", error);
    return [];
  }
};

export const addToCart = async (userId, cartItemData) => {
  try {
    const response = await fetch(`${API_URL}/cart/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItemData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add to cart');
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Add to cart failed:", error);
    throw error;
  }
};

export const getCart = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/cart/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch cart');
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Fetch cart failed:", error);
    throw error;
  }
};

export const removeFromCart = async (cartItemId) => {
    try {
      const response = await fetch(`${API_URL}/cart/${cartItemId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove from cart');
      }
      return true;
    } catch (error) {
      console.error("Remove from cart failed:", error);
      throw error;
    }
  };

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Create order failed:", error);
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Fetch order failed:", error);
    throw error;
  }
};

export const deleteListing = async (listingId) => {
  try {
    const response = await fetch(`${API_URL}/listings/${listingId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete listing');
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Delete listing failed:", error);
    throw error;
  }
};
