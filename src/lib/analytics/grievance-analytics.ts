interface GrievanceMetrics {
  totalGrievances: number;
  grievancesByStatus: Record<string, number>;
  grievancesByType: Record<string, number>;
  grievancesByCategory: Record<string, number>;
  grievancesByPriority: Record<string, number>;
  grievancesByMonth: Record<string, number>;
  averageResolutionTime: number;
  escalationRate: number;
  satisfactionScore: number;
  trends: {
    daily: Array<{ date: string; count: number }>;
    weekly: Array<{ week: string; count: number }>;
    monthly: Array<{ month: string; count: number }>;
  };
}

interface GrievanceData {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  accountNumber?: string;
  complaintType: string;
  complaintCategory: string;
  priority: 'low' | 'medium' | 'high';
  status: 'submitted' | 'under-review' | 'in-progress' | 'resolved' | 'escalated' | 'closed';
  createdAt: string;
  updatedAt: string;
  escalationLevel: number;
  resolutionDetails?: string;
  resolutionDate?: string;
  resolvedBy?: string;
  locale: 'en' | 'hi';
}

// Mock grievance storage (in real implementation, this would come from database)
const grievanceStore: GrievanceData[] = [
  {
    id: '1',
    referenceNumber: 'GRV1648123456789',
    fullName: 'John Doe',
    email: 'john@example.com',
    mobileNumber: '9876543210',
    accountNumber: '1234567890',
    complaintType: 'service',
    complaintCategory: 'banking-services',
    priority: 'medium',
    status: 'resolved',
    createdAt: '2024-03-20T10:30:00Z',
    updatedAt: '2024-03-21T15:30:00Z',
    escalationLevel: 0,
    resolutionDetails: 'Online banking issue resolved successfully',
    resolutionDate: '2024-03-21T15:30:00Z',
    resolvedBy: 'Support Agent',
    locale: 'en'
  },
  {
    id: '2',
    referenceNumber: 'GRV1648123456790',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    mobileNumber: '9876543211',
    accountNumber: '0987654321',
    complaintType: 'transaction',
    complaintCategory: 'loan-services',
    priority: 'high',
    status: 'in-progress',
    createdAt: '2024-03-19T09:15:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
    escalationLevel: 1,
    locale: 'en'
  },
  {
    id: '3',
    referenceNumber: 'GRV1648123456791',
    fullName: 'Raj Kumar',
    email: 'raj@example.com',
    mobileNumber: '9876543212',
    accountNumber: '1122334455',
    complaintType: 'atm',
    complaintCategory: 'card-services',
    priority: 'low',
    status: 'under-review',
    createdAt: '2024-03-18T16:20:00Z',
    updatedAt: '2024-03-19T11:45:00Z',
    escalationLevel: 0,
    locale: 'hi'
  }
];

// Analytics calculation functions
export const calculateGrievanceMetrics = (locale: string = 'en'): GrievanceMetrics => {
  const totalGrievances = grievanceStore.length;
  
  // Count by status
  const grievancesByStatus = grievanceStore.reduce((acc, grievance) => {
    acc[grievance.status] = (acc[grievance.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count by type
  const grievancesByType = grievanceStore.reduce((acc, grievance) => {
    acc[grievance.complaintType] = (acc[grievance.complaintType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count by category
  const grievancesByCategory = grievanceStore.reduce((acc, grievance) => {
    acc[grievance.complaintCategory] = (acc[grievance.complaintCategory] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count by priority
  const grievancesByPriority = grievanceStore.reduce((acc, grievance) => {
    acc[grievance.priority] = (acc[grievance.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count by month
  const grievancesByMonth = grievanceStore.reduce((acc, grievance) => {
    const month = new Date(grievance.createdAt).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate average resolution time
  const resolvedGrievances = grievanceStore.filter(g => 
    g.status === 'resolved' && g.resolutionDate && g.createdAt
  );
  
  const averageResolutionTime = resolvedGrievances.length > 0 
    ? resolvedGrievances.reduce((sum, g) => {
        const created = new Date(g.createdAt).getTime();
        const resolved = g.resolutionDate ? new Date(g.resolutionDate).getTime() : 0;
        return sum + (resolved - created) / (1000 * 60 * 60 * 24); // Convert to days
      }, 0) / resolvedGrievances.length
    : 0;

  // Calculate escalation rate
  const escalatedGrievances = grievanceStore.filter(g => g.escalationLevel > 0);
  const escalationRate = totalGrievances > 0 
    ? (escalatedGrievances.length / totalGrievances) * 100 
    : 0;

  // Calculate satisfaction score (mock data)
  const satisfactionScore = 4.2; // Out of 5.0

  // Generate trends
  const trends = generateTrends(grievanceStore);

  return {
    totalGrievances,
    grievancesByStatus,
    grievancesByType,
    grievancesByCategory,
    grievancesByPriority,
    grievancesByMonth,
    averageResolutionTime,
    escalationRate,
    satisfactionScore,
    trends
  };
};

// Generate trend data
const generateTrends = (grievances: GrievanceData[]) => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  // Daily trends (last 7 days)
  const dailyTrends = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    const count = grievances.filter(g => 
      g.createdAt.startsWith(dateStr)
    ).length;
    
    dailyTrends.push({ date: dateStr, count });
  }

  // Weekly trends (last 4 weeks)
  const weeklyTrends = [];
  for (let i = 3; i >= 0; i--) {
    const weekStart = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
    const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    const weekStr = `Week ${4 - i}`;
    
    const count = grievances.filter(g => {
      const created = new Date(g.createdAt);
      return created >= weekStart && created <= weekEnd;
    }).length;
    
    weeklyTrends.push({ week: weekStr, count });
  }

  // Monthly trends (last 6 months)
  const monthlyTrends = [];
  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthStr = monthStart.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    
    const count = grievances.filter(g => {
      const created = new Date(g.createdAt);
      return created.getMonth() === monthStart.getMonth() && created.getFullYear() === monthStart.getFullYear();
    }).length;
    
    monthlyTrends.push({ month: monthStr, count });
  }

  return {
    daily: dailyTrends,
    weekly: weeklyTrends,
    monthly: monthlyTrends
  };
};

// Get detailed grievance report
export const getDetailedGrievanceReport = (filters?: {
  status?: string;
  type?: string;
  category?: string;
  priority?: string;
  dateFrom?: string;
  dateTo?: string;
  locale?: string;
}) => {
  let filteredGrievances = [...grievanceStore];

  // Apply filters
  if (filters) {
    if (filters.status) {
      filteredGrievances = filteredGrievances.filter(g => g.status === filters.status);
    }
    if (filters.type) {
      filteredGrievances = filteredGrievances.filter(g => g.complaintType === filters.type);
    }
    if (filters.category) {
      filteredGrievances = filteredGrievances.filter(g => g.complaintCategory === filters.category);
    }
    if (filters.priority) {
      filteredGrievances = filteredGrievances.filter(g => g.priority === filters.priority);
    }
    if (filters.locale) {
      filteredGrievances = filteredGrievances.filter(g => g.locale === filters.locale);
    }
    if (filters.dateFrom) {
      filteredGrievances = filteredGrievances.filter(g => g.createdAt >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      filteredGrievances = filteredGrievances.filter(g => g.createdAt <= filters.dateTo!);
    }
  }

  return filteredGrievances;
};

// Get performance metrics
export const getPerformanceMetrics = () => {
  const metrics = calculateGrievanceMetrics();
  
  return {
    // Resolution time performance
    resolutionTimePerformance: {
      average: metrics.averageResolutionTime,
      target: 3.0, // 3 days target
      performance: metrics.averageResolutionTime <= 3.0 ? 'Good' : 'Needs Improvement'
    },
    
    // Escalation performance
    escalationPerformance: {
      rate: metrics.escalationRate,
      target: 15.0, // Max 15% escalation rate
      performance: metrics.escalationRate <= 15.0 ? 'Good' : 'Needs Improvement'
    },
    
    // Volume handling
    volumeMetrics: {
      daily: metrics.totalGrievances / 30, // Average per day
      weekly: metrics.totalGrievances / 4.3, // Average per week
      monthly: metrics.totalGrievances / 12 // Average per month
    },
    
    // Priority distribution
    priorityDistribution: {
      high: (metrics.grievancesByPriority.high || 0) / metrics.totalGrievances * 100,
      medium: (metrics.grievancesByPriority.medium || 0) / metrics.totalGrievances * 100,
      low: (metrics.grievancesByPriority.low || 0) / metrics.totalGrievances * 100
    },
    
    // Status distribution
    statusDistribution: metrics.grievancesByStatus
  };
};

// Generate compliance report
export const generateComplianceReport = () => {
  const metrics = calculateGrievanceMetrics();
  const now = new Date();
  
  return {
    reportDate: now.toISOString(),
    
    // RBI compliance metrics
    rbiCompliance: {
      totalGrievances: metrics.totalGrievances,
      escalatedToRBI: grievanceStore.filter(g => g.escalationLevel >= 3).length,
      averageResolutionTime: metrics.averageResolutionTime,
      slaCompliance: metrics.averageResolutionTime <= 30, // 30 days RBI guideline
      escalationRateCompliance: metrics.escalationRate <= 20 // Reasonable escalation rate
    },
    
    // Internal SLA metrics
    internalSLA: {
      level0ResponseTime: 24, // hours
      level1ResponseTime: 48, // hours
      level2ResponseTime: 72, // hours
      complianceRate: calculateSLAComplianceRate()
    },
    
    // Quality metrics
    qualityMetrics: {
      satisfactionScore: metrics.satisfactionScore,
      reOpenedGrievances: grievanceStore.filter(g => 
        g.status === 'resolved' && 
        grievanceStore.some(other =>
          other.referenceNumber === g.referenceNumber && 
          other.createdAt > (g.resolutionDate || 0)
        )
      ).length,
      duplicateGrievances: calculateDuplicateRate()
    }
  };
};

// Helper functions
const calculateSLAComplianceRate = () => {
  const resolvedWithinSLA = grievanceStore.filter(g => {
    if (g.status !== 'resolved' || !g.resolutionDate || !g.createdAt) return false;
    
    const created = new Date(g.createdAt).getTime();
    const resolved = new Date(g.resolutionDate).getTime();
    const resolutionHours = (resolved - created) / (1000 * 60 * 60);
    
    // Check if resolved within SLA based on escalation level
    const slaHours = g.escalationLevel === 0 ? 24 : g.escalationLevel === 1 ? 48 : 72;
    
    return resolutionHours <= slaHours;
  }).length;
  
  const totalResolved = grievanceStore.filter(g => g.status === 'resolved').length;
  
  return totalResolved > 0 ? (resolvedWithinSLA / totalResolved) * 100 : 0;
};

const calculateDuplicateRate = () => {
  const referenceNumbers = grievanceStore.map(g => g.referenceNumber);
  const uniqueReferences = Array.from(new Set(referenceNumbers));
  
  return ((referenceNumbers.length - uniqueReferences.length) / referenceNumbers.length) * 100;
};

// Export grievance data for external systems
export const exportGrievanceData = (format: 'json' | 'csv' | 'excel' = 'json') => {
  const data = grievanceStore.map(g => ({
    referenceNumber: g.referenceNumber,
    fullName: g.fullName,
    email: g.email,
    mobileNumber: g.mobileNumber,
    complaintType: g.complaintType,
    complaintCategory: g.complaintCategory,
    priority: g.priority,
    status: g.status,
    createdAt: g.createdAt,
    updatedAt: g.updatedAt,
    escalationLevel: g.escalationLevel,
    resolutionDetails: g.resolutionDetails,
    resolutionDate: g.resolutionDate,
    resolvedBy: g.resolvedBy,
    locale: g.locale
  }));

  switch (format) {
    case 'json':
      return JSON.stringify(data, null, 2);
    
    case 'csv':
      const headers = Object.keys(data[0]).join(',');
      const csvContent = [
        headers,
        ...data.map(row => Object.values(row).join(','))
      ].join('\n');
      return csvContent;
    
    case 'excel':
      // In a real implementation, you would use a library like xlsx
      return 'Excel export would be implemented here';
      
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
};

// Real-time monitoring
export const startRealTimeMonitoring = () => {
  console.log('Starting real-time grievance monitoring...');
  
  // Simulate real-time updates
  setInterval(() => {
    const metrics = calculateGrievanceMetrics();
    
    // Check for alerts
    if (metrics.escalationRate > 20) {
      console.warn('High escalation rate alert:', metrics.escalationRate + '%');
    }
    
    if (metrics.averageResolutionTime > 5) {
      console.warn('High resolution time alert:', metrics.averageResolutionTime + ' days');
    }
    
    // Log current metrics
    console.log('Current metrics:', {
      total: metrics.totalGrievances,
      pending: metrics.grievancesByStatus['submitted'] + metrics.grievancesByStatus['under-review'] + metrics.grievancesByStatus['in-progress'],
      resolved: metrics.grievancesByStatus['resolved'],
      escalationRate: metrics.escalationRate + '%'
    });
  }, 60000); // Check every minute
};

// Analytics API endpoints data
export const getAnalyticsData = (endpoint: string, params?: any) => {
  switch (endpoint) {
    case 'dashboard':
      return calculateGrievanceMetrics();
      
    case 'performance':
      return getPerformanceMetrics();
      
    case 'compliance':
      return generateComplianceReport();
      
    case 'trends':
      return calculateGrievanceMetrics().trends;
      
    case 'export':
      return exportGrievanceData(params?.format || 'json');
      
    default:
      throw new Error(`Unknown analytics endpoint: ${endpoint}`);
  }
};
