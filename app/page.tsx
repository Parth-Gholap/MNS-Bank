export default function RootPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-bank-blue-600 to-bank-blue-800 text-white">
        <div className="container-bank px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mahanagar Nagrik Sahakari Bank
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-bank-blue-100">
              Your Trusted Financial Partner Since 1996
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-white text-bank-blue-600">
                Open Account
              </button>
              <button className="btn-outline border-white text-white hover:bg-white hover:text-bank-blue-600">
                Apply for Loan
              </button>
              <button className="btn-gold">
                Net Banking
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-16 bg-gray-50">
        <div className="container-bank">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-bank-gray-900 mb-4">
              Our Banking Services
            </h2>
            <p className="text-lg text-bank-gray-600 max-w-3xl mx-auto">
              Comprehensive banking solutions tailored to meet your financial needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card card-hover text-center">
              <div className="w-12 h-12 bg-bank-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-bank-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-1m6 0l-4 4m0 0l-4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-bank-gray-900 mb-2">
                Personal Banking
              </h3>
              <p className="text-bank-gray-600">
                Savings accounts, loans, and digital services
              </p>
            </div>

            <div className="card card-hover text-center">
              <div className="w-12 h-12 bg-bank-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-bank-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 0v3m0 0v-3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-bank-gray-900 mb-2">
                Business Banking
              </h3>
              <p className="text-bank-gray-600">
                Current accounts, business loans, and more
              </p>
            </div>

            <div className="card card-hover text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10 0V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-bank-gray-900 mb-2">
                Digital Services
              </h3>
              <p className="text-bank-gray-600">
                Mobile banking, UPI, and online services
              </p>
            </div>

            <div className="card card-hover text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-2 3-2-3-2m0 8c1.657 0 3-.895 3-2s-1.343-2-3-2-3 .895-3 2-2 3m0 8a1 1 0 01-1-1H7a1 1 0 00-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1h3a1 1 0 001 1h8a1 1 0 001-1V8a1 1 0 00-1-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-bank-gray-900 mb-2">
                24/7 Support
              </h3>
              <p className="text-bank-gray-600">
                Customer service available round the clock
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-bank">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-bank-gray-900 mb-6">
                Why Choose MNS Bank?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-bank-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-bank-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010-1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414-1.414l-8-8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-bank-gray-900 mb-1">Trusted & Secure</h3>
                    <p className="text-bank-gray-600">25+ years of banking excellence with RBI compliance</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-bank-gold-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-bank-gold-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 7a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1h-2a1 1 0 01-1-1V7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-bank-gray-900 mb-1">Digital First</h3>
                    <p className="text-bank-gray-600">Modern banking solutions for your convenience</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 016 0zm-3-8a3 3 0 11-6 0 3 3 0 016 0zm-1 9a1 1 0 011-1h8a1 1 0 110 2v3a1 1 0 11-2 0v-3a1 1 0 00-1-1H6a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-bank-gray-900 mb-1">Customer Centric</h3>
                    <p className="text-bank-gray-600">Personalized service for every customer</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-bank-blue-50 to-bank-gold-50 rounded-2xl p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-bank-gray-900 mb-4">
                    Start Your Banking Journey
                  </h3>
                  <p className="text-bank-gray-600 mb-6">
                    Join thousands of satisfied customers
                  </p>
                  <div className="space-y-3">
                    <button className="w-full btn-primary">
                      Open Savings Account
                    </button>
                    <button className="w-full btn-secondary">
                      Check Interest Rates
                    </button>
                    <div className="text-center">
                      <a href="/en" className="text-bank-blue-600 hover:text-bank-blue-700 font-medium">
                        Explore All Services →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Selection */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="container-bank">
          <div className="text-center">
            <p className="text-sm text-bank-gray-600 mb-4">
              Choose your preferred language
            </p>
            <div className="inline-flex rounded-lg bg-white shadow-sm p-1">
              <a 
                href="/en" 
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 bg-bank-blue-600 text-white"
              >
                English
              </a>
              <a 
                href="/hi" 
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-bank-gray-700 hover:text-bank-blue-600"
              >
                हिन्दी
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
