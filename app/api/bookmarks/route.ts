import { NextRequest, NextResponse } from 'next/server';

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
  userId?: string;
}

// Mock bookmarks storage (in real implementation, this would be in a database)
let bookmarks: Bookmark[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Savings Account',
    productNameHi: 'बचत खाता',
    category: 'Personal Banking',
    categoryHi: 'व्यक्तिग बैंकिंग',
    interestRate: '3.25%',
    interestRateHi: '3.25%',
    image: '/images/products/savings-account.jpg',
    link: '/personal/savings-account',
    createdAt: '2024-01-15T10:30:00Z',
    notes: 'Good for beginners',
    notesHi: 'शुरुआतियों के लिए अच्छा',
    userId: 'user1'
  },
  {
    id: '2',
    productId: '5',
    productName: 'Fixed Deposit',
    productNameHi: 'सावध जमा',
    category: 'Personal Banking',
    categoryHi: 'व्यक्तिग बैंकिंग',
    interestRate: '6.5%',
    interestRateHi: '6.5%',
    image: '/images/products/fixed-deposit.jpg',
    link: '/personal/deposits/fixed-deposit',
    createdAt: '2024-01-20T14:15:00Z',
    notes: 'Safe investment option',
    notesHi: 'सुरक्षित निवेश विकल्प',
    userId: 'user1'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let userBookmarks = bookmarks;
    if (userId) {
      userBookmarks = bookmarks.filter(bookmark => bookmark.userId === userId);
    }

    return NextResponse.json({
      success: true,
      data: {
        bookmarks: userBookmarks,
        summary: {
          totalBookmarks: userBookmarks.length,
          userId: userId || 'anonymous',
          lastUpdated: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Bookmarks API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while fetching bookmarks'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newBookmark: Bookmark = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    bookmarks.push(newBookmark);

    console.log('Bookmark added:', {
      bookmarkId: newBookmark.id,
      productId: newBookmark.productId,
      userId: newBookmark.userId,
      timestamp: newBookmark.createdAt
    });

    return NextResponse.json({
      success: true,
      data: {
        bookmark: newBookmark,
        message: 'Bookmark added successfully'
      }
    });

  } catch (error) {
    console.error('Add bookmark error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while adding bookmark'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookmarkId = searchParams.get('id');

    if (!bookmarkId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bad request',
          message: 'Bookmark ID is required'
        },
        { status: 400 }
      );
    }

    const initialLength = bookmarks.length;
    bookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
    const deleted = bookmarks.length < initialLength;

    if (deleted) {
      console.log('Bookmark deleted:', {
        bookmarkId,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        deleted,
        message: deleted ? 'Bookmark deleted successfully' : 'Bookmark not found'
      }
    });

  } catch (error) {
    console.error('Delete bookmark error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while deleting bookmark'
      },
      { status: 500 }
    );
  }
}
