'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface Bookmark {
  id: string;
  productId: string;
  productName: string;
  productNameHi: string;
  category: string;
  categoryHi: string;
  interestRate?: string;
  interestRateHi?: string;
  image: string;
  link: string;
  createdAt: string;
  notes?: string;
  notesHi?: string;
}

interface ProductBookmarkProps {
  locale: 'en' | 'hi';
  productId?: string;
  className?: string;
  onBookmarkChange?: (isBookmarked: boolean) => void;
}

const ProductBookmark: React.FC<ProductBookmarkProps> = ({ 
  locale, 
  productId, 
  className = '', 
  onBookmarkChange 
}) => {
  const { t } = useTranslation(locale);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [bookmarkNotes, setBookmarkNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      trackPageView('Product Bookmark', locale === 'hi' ? 'उत्पाद बुकमार्क' : 'Product Bookmark');
      fetchBookmarks();
      checkIfBookmarked();
    }
  }, [productId, locale]);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks');
      const result = await response.json();
      
      if (result.success) {
        setBookmarks(result.data.bookmarks);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      // Fallback to localStorage
      const savedBookmarks = localStorage.getItem('productBookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    }
  };

  const checkIfBookmarked = () => {
    if (!productId) return;
    
    const bookmarked = bookmarks.some(bookmark => bookmark.productId === productId);
    setIsBookmarked(bookmarked);
  };

  const handleBookmark = async () => {
    if (!productId) return;

    if (isBookmarked) {
      await removeBookmark();
    } else {
      setShowBookmarkModal(true);
    }
  };

  const addBookmark = async () => {
    if (!productId) return;

    try {
      setLoading(true);
      
      // Get product details
      const productResponse = await fetch(`/api/products/${productId}?locale=${locale}`);
      const productResult = await productResponse.json();
      
      if (productResult.success) {
        const product = productResult.data.product;
        
        const newBookmark: Bookmark = {
          id: Date.now().toString(),
          productId: product.id,
          productName: product.name,
          productNameHi: product.nameHi,
          category: product.category,
          categoryHi: product.categoryHi,
          interestRate: product.interestRate,
          interestRateHi: product.interestRateHi,
          image: product.image,
          link: product.link,
          createdAt: new Date().toISOString(),
          notes: bookmarkNotes,
          notesHi: bookmarkNotes
        };

        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBookmark),
        });

        if (response.ok) {
          setBookmarks(prev => [...prev, newBookmark]);
          setIsBookmarked(true);
          setShowBookmarkModal(false);
          setBookmarkNotes('');
          onBookmarkChange?.(true);
        }
      }
    } catch (error) {
      console.error('Error adding bookmark:', error);
      // Fallback to localStorage
      const newBookmark: Bookmark = {
        id: Date.now().toString(),
        productId: productId,
        productName: 'Product Name',
        productNameHi: 'उत्पाद नाम',
        category: 'Category',
        categoryHi: 'श्रेणी',
        image: '/images/products/default.jpg',
        link: `/products/${productId}`,
        createdAt: new Date().toISOString(),
        notes: bookmarkNotes,
        notesHi: bookmarkNotes
      };

      const updatedBookmarks = [...bookmarks, newBookmark];
      setBookmarks(updatedBookmarks);
      localStorage.setItem('productBookmarks', JSON.stringify(updatedBookmarks));
      setIsBookmarked(true);
      setShowBookmarkModal(false);
      setBookmarkNotes('');
      onBookmarkChange?.(true);
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async () => {
    if (!productId) return;

    try {
      setLoading(true);
      
      const bookmarkToRemove = bookmarks.find(b => b.productId === productId);
      if (!bookmarkToRemove) return;

      const response = await fetch(`/api/bookmarks/${bookmarkToRemove.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBookmarks(prev => prev.filter(b => b.productId !== productId));
        setIsBookmarked(false);
        onBookmarkChange?.(false);
      }
    } catch (error) {
      console.error('Error removing bookmark:', error);
      // Fallback to localStorage
      const updatedBookmarks = bookmarks.filter(b => b.productId !== productId);
      setBookmarks(updatedBookmarks);
      localStorage.setItem('productBookmarks', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
      onBookmarkChange?.(false);
    } finally {
      setLoading(false);
    }
  };

  const getBookmarkCount = () => {
    return bookmarks.length;
  };

  const getRecentBookmarks = () => {
    return bookmarks
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  };

  // Bookmark Modal
  const BookmarkModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {locale === 'hi' ? 'उत्पाद बुकमार्क करें' : 'Bookmark Product'}
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'hi' ? 'टिप्पणियां' : 'Notes (Optional)'}
            </label>
            <textarea
              value={bookmarkNotes}
              onChange={(e) => setBookmarkNotes(e.target.value)}
              placeholder={locale === 'hi' ? 'इस उत्पाद के बारे में अपनी टिप्पणियां जोड़ें...' : 'Add your notes about this product...'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bank-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowBookmarkModal(false);
                setBookmarkNotes('');
              }}
              className="btn-outline border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {locale === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              onClick={addBookmark}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <>
                  {locale === 'hi' ? 'बुकमार्क करें' : 'Bookmark'}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // If no productId provided, show bookmark list
  if (!productId) {
    return (
      <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {locale === 'hi' ? 'मेरे बुकमार्क' : 'My Bookmarks'}
          </h3>
          <span className="text-sm text-gray-600">
            {locale === 'hi' 
              ? `${getBookmarkCount()} बुकमार्क`
              : `${getBookmarkCount()} bookmarks`
            }
          </span>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {locale === 'hi' ? 'कोई बुकमार्क नहीं' : 'No Bookmarks Yet'}
            </h3>
            <p className="text-gray-600">
              {locale === 'hi' 
                ? 'उत्पाद पृष्ठों पर बुकमार्क आइकन पर क्लिक करकर बुकमार्क करना शुरू करें'
                : 'Start bookmarking products by clicking the bookmark icon on product pages'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {getRecentBookmarks().map((bookmark) => (
              <div key={bookmark.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <img
                  src={bookmark.image}
                  alt={locale === 'hi' ? bookmark.productNameHi : bookmark.productName}
                  className="w-12 h-12 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {locale === 'hi' ? bookmark.productNameHi : bookmark.productName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === 'hi' ? bookmark.categoryHi : bookmark.category}
                  </p>
                  {bookmark.interestRate && (
                    <p className="text-sm text-bank-blue-600 font-medium">
                      {bookmark.interestRate}
                    </p>
                  )}
                  {bookmark.notes && (
                    <p className="text-sm text-gray-500 mt-1">
                      "{bookmark.notes}"
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(bookmark.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={bookmark.link}
                    className="btn-primary text-sm"
                  >
                    {locale === 'hi' ? 'देखें' : 'View'}
                  </a>
                  <button
                    onClick={() => removeBookmark()}
                    className="btn-outline border-red-600 text-red-600 hover:bg-red-50 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Bookmark button for individual product
  return (
    <>
      <button
        onClick={handleBookmark}
        disabled={loading}
        className={`inline-flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
          isBookmarked
            ? 'bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200'
            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
        } ${className}`}
      >
        {loading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ) : (
          <>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {isBookmarked 
              ? (locale === 'hi' ? 'बुकमार्क किया गया' : 'Bookmarked')
              : (locale === 'hi' ? 'बुकमार्क करें' : 'Bookmark')
            }
          </>
        )}
      </button>

      {showBookmarkModal && <BookmarkModal />}
    </>
  );
};

export default ProductBookmark;
